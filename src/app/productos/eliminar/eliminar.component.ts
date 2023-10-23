import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../domain/producto';
import { ProductoService } from '../services/producto.service';
import { DetalleProductoService } from '../services/detalle-producto.service';
import { Message } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'jghp-app-eliminar',
  templateUrl: './eliminar.component.html',
})
export class EliminarComponent implements OnInit {
  groupedDepartamentos: { label: string, value: number, items: { label: string, value: number }[] }[] = [];
  spinnerVisible: boolean;
  productoAEliminar: Producto;
  messages: Message[] | undefined;
  titulo = 'Eliminar Producto';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private detalleProductoService: DetalleProductoService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.spinnerService.getSpinnerVisibility().subscribe((visible) => {
      this.spinnerVisible = visible;
    });
    const productoId = +this.route.snapshot.paramMap.get('id');
    this.productoService.getProductoById(productoId).subscribe((producto) => {
      this.productoAEliminar = producto;

      this.detalleProductoService.departamentosConCategoria().subscribe((data) => {
        this.groupedDepartamentos = data;
        this.spinnerService.hide();
      });
    });
  }

  regresar(){
    this.router.navigate(['/admin']);
  }

  eliminarProducto(productoId: number ) {
    this.productoService.deleteProducto(productoId).subscribe(
      () => {
        this.messages = [{ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado' }];
        setTimeout(() => {
        }, 2000);

      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}
