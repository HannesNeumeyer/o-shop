import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  items$ = [];

  constructor(private scService: ShoppingCartService) { }

  async ngOnInit() {
    (await this.scService.getItems()).subscribe(p => this.items$ = p)
  }

  get totalPrice(){
    let sum = 0;
    
    this.items$.forEach(p => {
      sum += p.quantity * p.product.price
    })
    return sum;
  }
}
