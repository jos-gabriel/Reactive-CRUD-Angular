import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AgregarComponent } from './agregar/agregar.component';
import { DetallesComponent } from './detalles/detalles.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const productosRouting: Routes = [
  { path: '', component: AdminComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'eliminar/:id', component: EliminarComponent },
];


@NgModule({
  declarations: [
    AdminComponent,
    AgregarComponent,
    DetallesComponent,
    EditarComponent,
    EliminarComponent,    
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(productosRouting),
    FormsModule,
    ReactiveFormsModule    
  ]
})
export class ProductosModule { }
