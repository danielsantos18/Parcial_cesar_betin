// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from 'modelo/Producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cart = new BehaviorSubject<Producto[]>([]);
  cart$ = this.cart.asObservable();

  añadirCarrito(producto: Producto) {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, producto]);
  }

  removerCarrito(productoId: number) {
    const updatedCart = this.cart.value.filter(p => p.id !== productoId);
    this.cart.next(updatedCart);
  }

  limpiarCarrito() {
    this.cart.next([]);
  }
}
