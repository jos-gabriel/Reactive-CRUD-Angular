import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../domain/producto';
import { ProductoService } from '../services/producto.service';
import { DetalleProductoService } from '../services/detalle-producto.service';
import { Message } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'jghp-app-editar',
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit {
  spinnerVisible: boolean;
  productoEditado: Producto;
  groupedDepartamentos: { label: string, value: number, items: { label: string, value: number }[] }[] = [];
  messages: Message[] | undefined;
  modo: 'editar';
  titulo = 'Editar Producto';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private detalleProductoService: DetalleProductoService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {

    this.spinnerService.show();
    this.spinnerService.getSpinnerVisibility().subscribe((visible) => {
      this.spinnerVisible = visible;
    });
    const productoId = +this.route.snapshot.paramMap.get('id');
    this.detalleProductoService.detallesDeProducto(productoId).subscribe((detalles) => {
      this.productoEditado = detalles.producto;

      this.detalleProductoService.departamentosConCategoria().subscribe((data) => {
        this.groupedDepartamentos = data;
        this.spinnerService.hide();
      });

    });
  }

  regresar(){
    this.router.navigate(['/admin']);
  }

  guardarProductoEditado(producto: Producto) {
    this.productoService.updateProducto(producto).subscribe(
      () => {
        this.showSuccessMessage('Producto editado');

        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000);
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }
  showSuccessMessage(message: string) {
    this.messages = [{ severity: 'success', summary: 'Éxito', detail: message }];
  }
}
