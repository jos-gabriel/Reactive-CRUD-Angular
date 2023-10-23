import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriaService } from './categoria.service';
import { DepartamentoService } from './departamento.service';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  constructor(
    private categoriaService: CategoriaService,
    private departamentoService: DepartamentoService,
    private productoService: ProductoService
  ) {}

  exportToExcel(): void {
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    const fileName = `products_export_${formattedDate}.xlsx`;

    forkJoin({
      productos: this.productoService.getProductosOrdered(),
      categorias: this.categoriaService.getCategoriasOrdered(),
      departamentos: this.departamentoService.getDepartamentosOrdered()
    })
      .pipe(
        switchMap(({ productos, categorias, departamentos }) => {
          const data: any[] = [];

          data.push(['Id', 'Nombre', 'Modelo', 'Precio', 'Categoría', 'Departamento']);

          productos.forEach(producto => {
            const categoria = categorias.find(c => c.id === producto.categoriaId);
            const departamento = departamentos.find(d => d.id === categoria.departamentoId);

            data.push([
              producto.id,
              producto.nombre,
              producto.modelo,
              producto.precio.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
              categoria.nombre,
              departamento.nombre
            ]);
          });

          const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Productos');

          XLSX.writeFile(wb, fileName);

          return [];
        })
      )
      .subscribe(() => {
    });
  }
}
