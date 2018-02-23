import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ShoppingCartComponent,
    LoginComponent,
    MyOrdersComponent,
    CheckOutComponent,
    AdminOrdersComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
        {path:'', component: ProductsComponent},
        {path:'shopping-cart', component: ShoppingCartComponent},
        {path:'login', component: LoginComponent},
      
        {path:'check-out', component: CheckOutComponent},
        {path:'my-orders', component: MyOrdersComponent},
      
        {path:'admin/products', component: AdminProductsComponent},
        {path:'admin/orders', component: AdminOrdersComponent}
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
