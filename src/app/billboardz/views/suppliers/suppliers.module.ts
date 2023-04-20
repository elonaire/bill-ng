import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { CrudModule } from '../../components/crud/crud.module';
import { SuppliersComponent } from './suppliers/suppliers.component';


@NgModule({
  declarations: [
    SuppliersComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    CrudModule
  ]
})
export class SuppliersModule { }
