import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { CrudModule } from '../../components/crud/crud.module';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { SupplierContactsComponent } from './supplier-contacts/supplier-contacts.component';


@NgModule({
  declarations: [
    SuppliersComponent,
    SupplierDetailsComponent,
    SupplierContactsComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    CrudModule,
    TabMenuModule,
  ]
})
export class SuppliersModule { }
