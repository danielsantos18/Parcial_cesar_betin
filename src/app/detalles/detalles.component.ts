// src/app/pages/product-detail/product-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';
import { CarritoService } from '../servicios/carrito.service';
import { ToastController } from '@ionic/angular';
import { Producto } from 'modelo/Producto';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})

export class DetallesComponent implements OnInit {
  producto: Producto = { id: 0, title: '', category: '', description: '', image: '', price: 0 };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : NaN;
    if (isNaN(id)) {
      console.error('Invalid product ID');
      return;
    }
    this.productoService.obtenerProductoId(id).subscribe(
      producto => this.producto = producto,
      error => {
        console.error('Error fetching product', error);
      }
    );
  }

  agregarCarrito() {
    if (this.producto) {
      this.carritoService.añadirCarrito(this.producto);
      this.Mensaje('Product added to cart');
    } else {
      console.error('No product available to add to cart');
    }
  }

  async Mensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  irCarrito() {
    this.router.navigate(['/carrito']);
  }
}
