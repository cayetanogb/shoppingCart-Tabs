import { Component, OnInit } from '@angular/core';
import { Pedido } from '../model/pedido';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getPedidos().subscribe( (res: any) => {
      console.log(res);
      this.pedidos = res;
    });
  }

}
