import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  cart = [];
  productos: Product;
  cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService, private modalCart: ModalController) {}

  ngOnInit() {
    this.cartService.getProducts().subscribe( res => {
      this.productos = res;
    });

    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.animateCSS('tada');
    this.cartService.addProduct(product);
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCart.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });

    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceOutLeft');
    })
    modal.present();
  }

  animateCSS(animationName, KeepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!KeepAnimated) {
        node.classList.remove('animated', animationName);
      }

      node.removeEventeListener('animationend', handleAnimationEnd)
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }

  fav(p) {
    this.cartService.putFav(p);
  }

}
