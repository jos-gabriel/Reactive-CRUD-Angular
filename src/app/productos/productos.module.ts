import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AgregarComponent } from './agregar/agregar.component';
import { DetallesComponent } from './detalles/detalles.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const productosRouting: Routes = [
  { path: '', component: AdminComponent, data: { breadcrumb: 'Administración' } },
  { path: 'admin', component: AdminComponent, data: { breadcrumb: 'Administración' } },
  { path: 'agregar', component: AgregarComponent, data: { breadcrumb: 'Agregar Producto' } },
  { path: 'detalles/:id', component: DetallesComponent, data: { breadcrumb: 'Detalles de Producto' } },
  { path: 'editar/:id', component: EditarComponent, data: { breadcrumb: 'Editar Producto' } },
  { path: 'eliminar/:id', component: EliminarComponent, data: { breadcrumb: 'Eliminar Producto' } },
];


@NgModule({
  declarations: [
    AdminComponent,
    AgregarComponent,
    DetallesComponent,
    EditarComponent,
    EliminarComponent,
    FormularioProductoComponent,
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productosRouting),
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    MessagesModule,
    ProgressSpinnerModule,
  ]
})
export class ProductosModule { }
