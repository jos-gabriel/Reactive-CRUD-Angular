import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../domain/producto';
import { Categoria } from '../domain/categoria';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { DetalleProductoService } from '../services/detalle-producto.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'jghp-app-editar',
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit {
  productoEditado: Producto;
  categorias: Categoria[];
  messages: Message[] | undefined;
  modo: 'editar';
  titulo = 'Editar Producto';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private detalleProductoService: DetalleProductoService,
    private router: Router,
  ) {}

  ngOnInit() {
    const productoId = +this.route.snapshot.paramMap.get('id');
    this.detalleProductoService.obtenerDetallesDeProducto(productoId).subscribe((detalles) => {
      this.productoEditado = detalles.producto;
      this.categoriaService.getCategorias().subscribe((categorias) => {
        this.categorias = categorias;
      });
    });
  }

  regresar(){
    this.router.navigate(['/admin']);
  }

  guardarProductoEditado(producto: Producto) {
    this.productoService.updateProducto(producto).subscribe(
      () => {
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

}
