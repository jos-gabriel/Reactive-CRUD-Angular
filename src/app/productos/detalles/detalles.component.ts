import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleProductoService } from '../services/detalle-producto.service';
import { Router } from '@angular/router';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';
import { Producto } from '../domain/producto';
import { SpinnerService } from '../services/spinner.service';


@Component({
  selector: 'jghp-app-detalles',
  templateUrl: './detalles.component.html'
})
export class DetallesComponent implements OnInit {
  spinnerVisible: boolean;
  producto: Producto;
  categoria: Categoria;
  departamento: Departamento;
  precioConDescuento: number;

  constructor(
    private route: ActivatedRoute,
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
    this.detalleProductoService.detallesDeProducto(productoId).subscribe((detalles) => {
      this.producto = detalles.producto;
      this.categoria = detalles.categoria;
      this.departamento = detalles.departamento;
      this.spinnerService.hide();
      this.calcularPrecioConDescuento();

    });
  }

  calcularPrecioConDescuento() {
    if (this.producto.descuento > 0) {
      this.precioConDescuento = this.producto.precio - this.producto.descuento;
    }
  }

  regresar() {
    this.router.navigate(['/admin']);
  }
}
