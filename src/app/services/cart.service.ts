import { Injectable } from '@angular/core';
import { Cart, ProductInCart } from '../app.interfaces';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private userId: number = 0;
  private carts: Cart[] = [];
  private currentCart?: Cart;

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {
    this.userId = this.userService.getCurrentUser().id;
    this.carts = JSON.parse(localStorage.getItem('carts') || '[]');
  }

  public getCurrentCart(): Cart | undefined {
    this.currentCart = this.carts.find(cart => cart.userId === this.userId);
    return this.currentCart;
  }

  public addProduct(productId: number, wantedQuantity: number): void {
    // Tạo biến productInCart và mảng productList
    let productInCart: ProductInCart = {
      productId: productId,
      wantedQuantity: wantedQuantity
    }
    let productList: ProductInCart[] = [productInCart];

    // Tạo biến cart
    let cart: Cart = {
      userId: this.userId,
      productList: productList
    }

    // Nếu carts trong localStorage chưa có -> Tạo key carts
    if (this.carts.length === 0) {
      this.carts = [cart]
      localStorage.setItem('carts', JSON.stringify(this.carts));
    } else {
      // Lấy ra cart của userId hiện tại
      let currentCart: Cart | undefined = this.getCurrentCart();

      // Nếu tồn tại cart của userId hiện tại
      if (currentCart) {
        // Lấy ra productInCart của productId hiện tại
        let currentProductInCart: ProductInCart | undefined =
          currentCart?.productList.find(productInCart => productInCart.productId === productId);

        // Nếu tồn tại productInCart của productId hiện tại
        if (currentProductInCart) {
          currentProductInCart.wantedQuantity += wantedQuantity;
        } else {
          currentCart?.productList.push(productInCart);
        }
        localStorage.setItem('carts', JSON.stringify(this.carts));
      } else {
        this.carts.push(cart);
        localStorage.setItem('carts', JSON.stringify(this.carts));
      }
    }
  }

  public changeQuantityProduct(productId: number, wantedQuantity: number): void {
    let currentCart = this.getCurrentCart();
    let currentProductInCart: ProductInCart | undefined =
      currentCart?.productList.find(productInCart => productInCart.productId === productId);
    if (currentProductInCart) {
      currentProductInCart.wantedQuantity = wantedQuantity
    }
    localStorage.setItem('carts', JSON.stringify(this.carts))
  }

  public removeProduct(productId: number): void {
    if (!confirm('Bạn có muốn xóa?')) {
      return;
    }
    this.currentCart?.productList.forEach((productInCart, index) => {
      if (productInCart.productId === productId) this.currentCart?.productList.splice(index, 1);
    });
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  public getTotalPrice(): number {
    let currentCart = this.getCurrentCart();
    let totalPrice: number = 0;
    if (currentCart) {
      currentCart?.productList.forEach(productInCart => {
        let product = this.productService.getItemById(productInCart.productId);
        totalPrice += product.price * productInCart.wantedQuantity;
      });
    }
    return totalPrice;
  }
}
