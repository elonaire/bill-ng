import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./views/suppliers/suppliers.module').then((m) => m.SuppliersModule) },
        { path: 'billboards', loadChildren: () => import('./views/billboards/billboards.module').then((m) => m.BillboardsModule) },
        { path: 'cities', loadChildren: () => import('./views/cities/cities.module').then((m) => m.CitiesModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillboardzRoutingModule {}
