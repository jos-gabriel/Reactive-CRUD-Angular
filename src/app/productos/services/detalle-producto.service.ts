import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { CategoriaService } from './categoria.service';
import { DepartamentoService } from './departamento.service';
import { ProductoService } from './producto.service';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';
import { Producto } from '../domain/producto';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {
  constructor(
    private categoriaService: CategoriaService,
    private departamentoService: DepartamentoService,
    private productoService: ProductoService
  ) {}

  obtenerDetallesDeProducto(productoId: number): Observable<any> {
    return this.productoService.getProducto(productoId).pipe(
      mergeMap((producto: Producto) => {
        return this.categoriaService.getCategoriaById(producto.categoriaId).pipe(
          mergeMap((categoria: Categoria) => {
            return this.departamentoService.getDepartamento(categoria.departamentoId).pipe(
              map((departamento: Departamento) => {
                return { producto, categoria, departamento };
              })
            );
          })
        );
      })
    );
  }
}
