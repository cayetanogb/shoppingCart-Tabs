import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pedido } from '../model/pedido';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private urlProd: string = 'http://localhost:3000/products';
  private urlPed: string = 'http://localhost:3000/pedidos';

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(this.urlProd);
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;

    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        console.log(p.amount);
        added = true;
        break;
      }
    }

    if (!added) {
      this.cart.push(product);
      console.log('añdir prod');
    }

    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;

        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }

    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  reset() {
    this.cart = [];
    this.cartItemCount.next(0);
  }

  postPedido(productos: Product[]) {
    console.log(productos);
    let precioTotal = 0;
    let codPedido = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 6; i++) {
      codPedido += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    for (let i = 0; i < productos.length; i++) {
      precioTotal += (productos[i].price * productos[i].amount);
    }

    console.log(precioTotal);

    const newPedido = {
      id: codPedido,
      total: precioTotal,
      productos: productos
    };

    console.log(newPedido);

    return this.http.post<Pedido>(this.urlPed, newPedido);
  }

  getPedidos(): Observable<Pedido> {
    return this.http.get<Pedido>(this.urlPed);
  }

  putFav(product) {
    product.fav = !product.fav;

    return this.http.put<Pedido>(this.urlPed, product);
  }
}
