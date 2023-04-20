import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () =>
//       import('./billboardz/layout/app.layout.module').then(
//         (m) => m.AppLayoutModule
//       ),
//   },
  { path: '', loadChildren: () => import('./billboardz/billboardz.module').then((m) => m.BillboardzModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
