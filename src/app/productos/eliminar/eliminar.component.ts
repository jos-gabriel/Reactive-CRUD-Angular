import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../domain/producto';
import { Categoria } from '../domain/categoria';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'jghp-app-eliminar',
  templateUrl: './eliminar.component.html',
})
export class EliminarComponent implements OnInit {
  productoAEliminar: Producto;
  categorias: Categoria[];
  messages: Message[] | undefined;
  titulo = 'Eliminar Producto';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
  ) {}

  ngOnInit() {
    const productoId = +this.route.snapshot.paramMap.get('id');
    this.productoService.getProducto(productoId).subscribe((producto) => {
      this.productoAEliminar = producto;

      this.categoriaService.getCategorias().subscribe((categorias) => {
        this.categorias = categorias;
      });
    });
  }

  regresar(){
    this.router.navigate(['/admin']);
  }

  eliminarProducto(productoId: number ) {
    this.productoService.deleteProducto(productoId).subscribe(
      () => {
        this.messages = [{ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado con éxito' }];
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}
