import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create()
    localStorage.setItem('cartId', result.key)
    return result.key; 
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItem(product, change){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key)
    item$.take(1).subscribe(item => {
      if(item.$exists()) item$.update({quantity: item.quantity + change})
      else item$.set({product: product, quantity: 1})
    })
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
  }

  async addToCart(product: Product){
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1)
  }
}
