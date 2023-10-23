import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../domain/producto';
import { DetalleProductoService } from '../services/detalle-producto.service';
import { ProductoService } from '../services/producto.service';
import { Message } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'jghp-app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit{
  spinnerVisible: boolean;
  messages: Message[] | undefined;
  modo: 'editar';
  titulo = 'Editar Producto';
  groupedDepartamentos: { label: string, value: number, items: { label: string, value: number }[] }[] = [];

  constructor(
    private productoService: ProductoService,
    private detalleProductoService: DetalleProductoService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {

    this.spinnerService.show();
    this.detalleProductoService.departamentosConCategoria().subscribe((data) => {
      this.groupedDepartamentos = data;
      this.spinnerService.hide();
    });

  }

  ngOnInit() {
    this.spinnerService.getSpinnerVisibility().subscribe((visible) => {
      this.spinnerVisible = visible;
    });
  }

  regresar(){
    this.router.navigate(['/admin']);
  }

  guardarProductoNuevo(producto: Producto) {

    this.productoService.createProducto(producto).subscribe(
      () => {
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Producto agregado' }];
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000);

      },
      (error) => {
        console.error('Error al agregar el producto:', error);
      }
    );
  }

}
