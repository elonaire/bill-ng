import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierContactsComponent } from './supplier-contacts/supplier-contacts.component';
import { SupplierCitiesComponent } from './supplier-cities/supplier-cities.component';

const routes: Routes = [
    {
        path: '',
        component: SuppliersComponent,
    },
    {
      path: 'supplier/:id',
      component: SupplierDetailsComponent,
      children: [
        {
          path: '',
          redirectTo: 'contacts',
          pathMatch: 'full'
        },
        {
          path: 'contacts',
          component: SupplierContactsComponent
        },
        {
          path: 'cities',
          component: SupplierCitiesComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
