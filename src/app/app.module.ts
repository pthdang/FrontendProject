import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CategoryService } from './services/category.service';
import { CategoryComponent } from './components/category/category.component';
import { ProductService } from './services/product.service';
import { ProductComponent } from './components/product/product.component';
import { JwPaginationModule } from './directives/jw-pagination.module';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { FilterPipe } from './pipes/filter.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { SearchComponent } from './components/search/search.component';
import { DiscountService } from './services/discount.service';
import { ScriptService } from './services/script.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { CommentComponent } from './components/comment/comment.component';
import { CommentService } from './services/comment.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    CategoryComponent,
    ProductComponent,
    CartComponent,
    OrderComponent,
    UserComponent,
    FilterPipe,
    HighlightDirective,
    SearchComponent,
    ToastComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwPaginationModule,
    FormsModule
  ],
  providers: [
    CategoryService,
    ProductService,
    UserService,
    CartService,
    FilterPipe,
    DiscountService,
    ScriptService,
    ToastService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
