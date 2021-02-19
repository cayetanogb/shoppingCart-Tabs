import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: Product[] = [];

  constructor(private cartService: CartService, private modalCart: ModalController, private route: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCart.dismiss();
  }

  checkout() {
    if (this.cart.length > 0) {
      this.modalCart.dismiss();
      this.cartService.postPedido(this.cart).subscribe();
      this.cartService.reset();
      this.route.navigate(['tabs/tab1']);
    }
  }
}
