import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts = [];
  subscription: Subscription;
  categories$;
  category;
  cart$;

  constructor(private scService: ShoppingCartService, private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  async ngOnInit() {
    (await this.scService.getCart()).subscribe(cart => this.cart$ = cart);

    this.subscription = this.productService.getAll().subscribe(p => {
      this.filteredProducts = this.products = p;
      
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
    })
    this.categories$ = this.categoryService.getAll();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private applyFilter(){
    this.filteredProducts = (this.category) 
    ? this.products.filter(p => p.categories === this.category)
    : this.products;
    console.log(this.category)
  }

  addToCart(product){
    this.scService.updateItem(product);
  }

  getQuantity(product){
    if(!this.cart$) return 0;

    let item = this.cart$.items[product.$key];
    return item ? item.quantity : 0;
  }
}
