import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'productos',
    loadChildren: () =>
      import('./productos/productos.module').then((mod) => mod.ProductosModule),
    data: { preload: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
