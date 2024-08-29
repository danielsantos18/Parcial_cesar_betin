import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from 'modelo/Producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos() {
    console.log('Cargando productos...');
    this.productoService.obtenerProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        console.log('Productos:', productos);
      },
      error => console.error('Error fetching products', error)
    );
  }

  cargarCategorias() {
    console.log('Loading categories...');
    this.productoService.obtenerCategorias().subscribe(
      (categorias: string[]) => {
        this.categorias = categorias;
        console.log('Categorias:', categorias);
      },
      error => console.error('Error fetching categories', error)
    );
  }

  filtrarCategoria(categoria: string) {
    console.log('Filtering by category:', categoria);
    this.categoriaSeleccionada = categoria;
    this.productoService.obtenerCategoriaProdu(categoria).subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        console.log('Filtered products:', productos);
      },
      error => console.error('Error fetching products by category', error)
    );
  }

  irDetalles(productoId: number) {
    console.log('espere:', productoId);
    this.router.navigate(['/detalles', productoId]);
  }
}
