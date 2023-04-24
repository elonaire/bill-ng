import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillboardTypesComponent } from './billboard-types/billboard-types.component';
import { BillboardsComponent } from './billboards/billboards.component';

const routes: Routes = [
  {
    path: '',
    component: BillboardsComponent
  },
  {
    path: 'types',
    component: BillboardTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillboardsRoutingModule { }
