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
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthAdminGuard } from './auth-admin-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { CategoryService } from './category.service';


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
    AdminProductsComponent,
    AdminProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
        {path:'', component: ProductsComponent},
        {path:'shopping-cart', component: ShoppingCartComponent},
        {path:'login', component: LoginComponent},
      
        {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
        {path:'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      
        {path:'admin/products/new', component: AdminProductFormComponent, canActivate: [AuthGuard, AuthAdminGuard]},
        {path:'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AuthAdminGuard]},
        {path:'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AuthAdminGuard]}
      ])
  ],
  providers: [
    AuthService,
    UserService,
    AuthAdminGuard,
    AuthGuard,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
