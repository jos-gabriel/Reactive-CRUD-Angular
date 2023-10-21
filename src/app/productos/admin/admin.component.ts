import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../domain/producto';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'jghp-app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productos: Producto[] = [];
  items: MenuItem[] | undefined;

  selectedProductId: number | null = null;

  constructor(private productService: ProductoService, private router: Router) {}

  ngOnInit() {
    this.productService.getProductosOrdered().subscribe((data: Producto[]) => {
      this.productos = data;
    });

    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.editarProducto(this.selectedProductId)

      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.eliminarProducto(this.selectedProductId)

      },
    ];
  }

  editarProducto(id: number) {
    this.router.navigate(['/editar',id]);
  }

  eliminarProducto(id: number) {
    this.router.navigate(['/eliminar',id]);
  }

  exportDataToExcel() {

  }

  getSeverity(descuento: number) {
    if (descuento >= 0.5 ) {
      return 'danger';
    } else {
      return 'success';
    }
  }

  setSelectedProductId(productId: number, contextMenu: any, clickEvent: Event) {
    this.selectedProductId = productId;
    contextMenu.toggle(clickEvent);
  }

}
