import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { CrudModule } from '../../components/crud/crud.module';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { SupplierContactsComponent } from './supplier-contacts/supplier-contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SupplierCitiesComponent } from './supplier-cities/supplier-cities.component';


@NgModule({
  declarations: [
    SuppliersComponent,
    SupplierDetailsComponent,
    SupplierContactsComponent,
    SupplierCitiesComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    CrudModule,
    TabMenuModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
  ]
})
export class SuppliersModule { }
