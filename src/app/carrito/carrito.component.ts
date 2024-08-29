import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito.service';
import { Producto } from 'modelo/Producto';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private toastController: ToastController) { }

  ngOnInit() {
    this.carritoService.cart$.subscribe(carrito => {
      this.carrito = carrito;
      this.calcularTotal();
    });
  }

  calcularTotal() {
    this.total = this.carrito.reduce((sum, producto) => sum + producto.price, 0);
  }

  removerCarrito(productoId: number) {
    this.carritoService.removerCarrito(productoId);
    this.showToast('Product removed from cart');
  }

  async showToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  pagar() {
    this.carritoService.limpiarCarrito();
    this.showToast('Payment simulated and cart cleared');
  }
}
