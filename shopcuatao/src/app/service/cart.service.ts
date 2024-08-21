import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<number, number> = new Map();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(productId: number, quantity: number = 1): void {
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.saveCartToLocalStorage();
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
  }

  private loadCartFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart = new Map(JSON.parse(storedCart));
      }
    }
  }
}
