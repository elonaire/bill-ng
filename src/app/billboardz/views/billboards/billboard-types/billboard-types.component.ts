import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn, GenericTableConfigs, Supplier, AppState } from 'src/app/@types/billboardz';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';
import { StoreSelectors } from '../../suppliers/suppliers/suppliers.component';
import { Store } from '@ngrx/store';
import { createBillboardType, deleteBillboardType, loadBillboardTypes, updateBillboardType } from 'src/app/store/actions/billboards.actions';

export enum MutationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Component({
  selector: 'app-billboard-types',
  templateUrl: './billboard-types.component.html',
  styleUrls: ['./billboard-types.component.scss']
})
export class BillboardTypesComponent {
  constructor(private fb: FormBuilder, private apiService: ApiService, private store: Store<AppState>) {
    this.tableConfigs = {
      tableName: 'Billboard Types',
      columns: this.supplierTableColumns,
      showDelete: true,
      showExport: false,
      showImport: false,
      wrapInCard: true,
      requestParams: {
        storeSelector: StoreSelectors.BILLBOARD_TYPES,
      },
      // graphQLOpType: GraphQLOpType.QUERY,
    };
  }

  supplierTableColumns: TableColumn[] = [
    // { name: 'ID', prop: 'id', isSortable: true },
    { name: 'Name', prop: 'name', isSortable: true },
    { name: 'Billboard Count', prop: 'billboardCount', isSortable: true },
    { name: 'City Count', prop: 'cityCount', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;
  addSupplierForm!: FormGroup;
  updateSupplierForm!: FormGroup;
  createOrUpdateForm!: FormGroup;

  ngOnInit(): void {
    this.store.dispatch(loadBillboardTypes());
    this.addSupplierForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.updateSupplierForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });

    this.createOrUpdateForm = this.addSupplierForm;
  }

  handleChangeEvent(event: any) {
    console.log('called', event);
    this.forcedChangeVal = new Date().getTime();
  }

  saveSupplier(opType: MutationType) {
    if (opType === MutationType.CREATE) {
      this.store.dispatch(createBillboardType({ billboardType: this.createOrUpdateForm.value }));
      this.addSupplierForm.reset();
    } else {
      this.store.dispatch(updateBillboardType({ billboardType: this.createOrUpdateForm.value }));
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
      this.store.dispatch(deleteBillboardType({ billboardTypeId: event.data?.id as string }));
    }

    if (this.createOrUpdateForm.valid) {
      this.saveSupplier(event.mutationType);
    }
  }
}
