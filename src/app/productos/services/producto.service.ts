import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../domain/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) {}

  getProductosOrdered(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map((productos: Producto[]) => {
        return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      })
    );
  }

  getProductoById(id: number): Observable<Producto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
