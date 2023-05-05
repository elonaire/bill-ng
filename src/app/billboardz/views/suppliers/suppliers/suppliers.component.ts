import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AppState,
  BillboardzSuppliersState,
  GenericTableConfigs,
  GraphQLOpType,
  Supplier,
  TableColumn,
} from 'src/app/@types/billboardz.d';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';
import { createSupplier, deleteSupplier, loadSuppliers, updateSupplier } from 'src/app/store/actions/suppliers.actions';

export enum MutationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum StoreSelectors {
  SUPPLIERS = 'selectSuppliers',
  BILLBOARDS = 'selectBillboards',
  SUPPLIER_CONTACTS = 'selectSupplierContacts',
  BILLBOARD_TYPES = 'selectBillboardTypes',
  CITIES = 'selectCities',
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {
    this.tableConfigs = {
      tableName: 'Suppliers',
      columns: this.supplierTableColumns,
      showDelete: true,
      showExport: true,
      showImport: true,
      wrapInCard: true,
      requestParams: {
        storeSelector: StoreSelectors.SUPPLIERS,
      },
      // graphQLOpType: GraphQLOpType.QUERY,
    };
  }

  supplierTableColumns: TableColumn[] = [
    { name: 'Name', prop: 'name', isSortable: true },
    { name: 'Email', prop: 'email', isSortable: true },
    { name: 'Address', prop: 'address', isSortable: true },
    { name: 'VAT Number', prop: 'vatNumber', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;
  addSupplierForm!: FormGroup;
  updateSupplierForm!: FormGroup;
  createOrUpdateForm!: FormGroup;

  ngOnInit(): void {
    this.store.dispatch(loadSuppliers());
    this.addSupplierForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      vatNumber: ['', Validators.required],
    });

    this.updateSupplierForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      vatNumber: ['', Validators.required],
    });

    this.createOrUpdateForm = this.addSupplierForm;
  }

  handleChangeEvent(event: any) {
    console.log('called', event);
    this.forcedChangeVal = new Date().getTime();
  }

  saveSupplier(opType: MutationType) {
    if (opType === MutationType.CREATE) {
      this.store.dispatch(
        createSupplier({ supplier: this.createOrUpdateForm.value })
      );
      this.addSupplierForm.reset();
    } else {
      this.store.dispatch(
        updateSupplier({ supplier: this.createOrUpdateForm.value })
      );
    }
  }

  handleFormTemplateEvent(event: FormMutationInfo) {
    console.log('handleFormTemplateEvent', event);

    // this.selectedMutationType = event;
    if (event.mutationType === MutationType.CREATE) {
      this.createOrUpdateForm = this.addSupplierForm;
    } else if (event.mutationType === MutationType.UPDATE) {
      this.createOrUpdateForm = this.updateSupplierForm;
      if (!this.createOrUpdateForm.valid) {
        this.createOrUpdateForm.patchValue(event.data as Supplier);
      }
    } else if (event.mutationType === MutationType.DELETE) {
      this.store.dispatch(
        deleteSupplier({ supplierId: event.data?.id as string })
      );
    }

    if (this.createOrUpdateForm.valid) {
      this.saveSupplier(event.mutationType);
    }
  }
}
