import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];

  constructor() { }

  addToCart(product: any) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.items = [];
  }
}
