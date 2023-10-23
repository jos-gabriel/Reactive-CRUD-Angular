import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, mergeMap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  private categorias: Categoria[] = [];
  private departamentos: Departamento[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private departamentoService: DepartamentoService,
    private productoService: ProductoService
  ) {}

  departamentosConCategoria(): Observable<{ label: string, value: number, items: { label: string, value: number }[] }[]> {
    return forkJoin([
      this.categoriaService.getCategoriasOrdered(),
      this.departamentoService.getDepartamentosOrdered()
    ]).pipe(
      switchMap(([categorias, departamentos]) => {
        this.categorias = categorias;
        this.departamentos = departamentos;
        return this.generarDepartamentosConCategorias();
      })
    );
  }

  private generarDepartamentosConCategorias(): Observable<{ label: string, value: number, items: { label: string, value: number }[] }[]> {
    const groupedDepartamentos = this.departamentos.map((departamento) => {
      const categoriasEnDepartamento = this.categorias.filter((categoria) => categoria.departamentoId === departamento.id);
      const categoriaItems = categoriasEnDepartamento.map((categoria) => ({
        label: categoria.nombre,
        value: categoria.id,
      }));
      return {
        label: departamento.nombre,
        value: departamento.id,
        items: categoriaItems
      };
    });
    return of(groupedDepartamentos);
  }

  detallesDeProducto(productoId: number): Observable<any> {
    return this.productoService.getProductoById(productoId).pipe(
      mergeMap((producto: Producto) => {
        return this.categoriaService.getCategoriaById(producto.categoriaId).pipe(
          mergeMap((categoria: Categoria) => {
            return this.departamentoService.getDepartamentoById(categoria.departamentoId).pipe(
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
