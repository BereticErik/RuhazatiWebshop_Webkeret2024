import { Component, OnInit } from '@angular/core';
import { CartService } from "../../shared/services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems(){
    this.items = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  clearCart(){
    this.cartService.clearCart();
    this.loadCartItems();
  }
}
