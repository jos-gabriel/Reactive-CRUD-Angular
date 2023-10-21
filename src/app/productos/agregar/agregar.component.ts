import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../domain/producto';
import { Categoria } from '../domain/categoria';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { Message } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'jghp-app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit{
  spinnerVisible: boolean;

  productoEditado: Producto;
  categorias: Categoria[];
  messages: Message[] | undefined;
  modo: 'editar';
  titulo = 'Editar Producto';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    this.spinnerService.getSpinnerVisibility().subscribe((visible) => {
      this.spinnerVisible = visible;
    });
    this.categoriaService.getCategoriasOrdered().subscribe((categorias) => {
      this.categorias = categorias;
    });

  }

  regresar(){
    this.router.navigate(['/admin']);
  }

  guardarProductoNuevo(producto: Producto) {

    this.productoService.createProducto(producto).subscribe(
      () => {
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
      }
    );
  }

}
