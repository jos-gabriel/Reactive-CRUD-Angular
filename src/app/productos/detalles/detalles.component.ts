import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleProductoService } from '../services/detalle-producto.service';
import { Router } from '@angular/router';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';
import { Producto } from '../domain/producto';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html'
})
export class DetallesComponent implements OnInit {
  producto: Producto;
  categoria: Categoria;
  departamento: Departamento;
  precioConDescuento: number;

  constructor(
    private route: ActivatedRoute,
    private detalleProductoService: DetalleProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    const productoId = +this.route.snapshot.paramMap.get('id');
    this.detalleProductoService.obtenerDetallesDeProducto(productoId).subscribe((detalles) => {
      this.producto = detalles.producto;
      this.categoria = detalles.categoria;
      this.departamento = detalles.departamento;
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
