import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  category$;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.category$ = this.categoryService.getAll();
  }

}
