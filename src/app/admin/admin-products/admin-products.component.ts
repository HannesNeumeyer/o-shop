import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts = [];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(p => this.filteredProducts = this.products = p);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string){
    this.filteredProducts = (query)
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products
  }

}
