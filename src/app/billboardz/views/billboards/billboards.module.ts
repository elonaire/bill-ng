import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillboardsRoutingModule } from './billboards-routing.module';
import { BillboardsComponent } from './billboards/billboards.component';
import { BillboardTypesComponent } from './billboard-types/billboard-types.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabMenuModule } from 'primeng/tabmenu';
import { CrudModule } from '../../components/crud/crud.module';
import { GMapModule } from 'primeng/gmap';
import { GoogleMapsModule } from '@angular/google-maps';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    BillboardsComponent,
    BillboardTypesComponent
  ],
  imports: [
    CommonModule,
    BillboardsRoutingModule,
    CrudModule,
    TabMenuModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    GMapModule,
    GoogleMapsModule,
    DropdownModule,
    FileUploadModule
  ]
})
export class BillboardsModule { }
