import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoPage } from './carrito.page';
import { CarritoComponent } from './carrito.component';

const routes: Routes = [
  {
    path: '',
    component: CarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritoPageRoutingModule {}
