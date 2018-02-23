import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  category$;

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.category$ = this.categoryService.getAll();
  }

  save(product){
    this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }
}
