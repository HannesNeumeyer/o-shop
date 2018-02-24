import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  items$ = [];

  constructor(private scService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.scService.getCart();
    (await this.scService.getItems()).subscribe(p => this.items$ = p)
  }

  clearCart(){
    this.scService.clearCart();
  }

  get totalPrice(){
    let sum = 0;
    
    this.items$.forEach(p => {
      sum += p.quantity * p.product.price
    })
    return sum;
  }
}
