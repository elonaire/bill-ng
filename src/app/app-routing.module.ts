import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./billboardz/components/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  { path: 'admin', loadChildren: () => import('./billboardz/billboardz.module').then((m) => m.BillboardzModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
