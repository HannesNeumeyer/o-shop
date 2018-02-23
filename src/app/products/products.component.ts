import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts = [];
  subscription: Subscription;
  categories$;
  category;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
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

}
