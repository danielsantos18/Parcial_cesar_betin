import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Producto } from 'modelo/Producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  private api = `${environment.api}/products`;

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.api).pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(error);
      })
    );
  }

  obtenerProductoId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.api}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  obtenerCategorias(): Observable<string[]> {
    return this.obtenerProductos().pipe(
      map(productos => {
        const categories = new Set(productos.map(producto => producto.category));
        return Array.from(categories);
      }),
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return throwError(error);
      })
    );
  }

  obtenerCategoriaProdu(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.api}/category/${categoria}`).pipe(
      catchError(error => {
        console.error(`Error al obtener productos para la categoría ${categoria}:`, error);
        return throwError(error);
      })
    );
  }
}
