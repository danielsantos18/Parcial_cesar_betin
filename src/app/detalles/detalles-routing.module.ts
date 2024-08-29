import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPage } from './detalles.page';
import { DetallesComponent } from './detalles.component';

const routes: Routes = [
  {
    path: '',
    component: DetallesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPageRoutingModule {}
