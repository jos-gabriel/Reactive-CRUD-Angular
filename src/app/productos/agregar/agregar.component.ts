import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../domain/producto';
import { Categoria } from '../domain/categoria';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit{

  productoEditado: Producto;
  categorias: Categoria[];
  messages: Message[] | undefined;
  modo: 'editar';
  titulo = 'Editar Producto';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.categoriaService.getCategorias().subscribe((categorias) => {
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
