import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, TableColumn, GenericTableConfigs, Supplier } from 'src/app/@types/billboardz';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';
import { loadSuppliers } from 'src/app/store/actions/suppliers.actions';
import { StoreSelectors } from '../../suppliers/suppliers/suppliers.component';
import { MutationType } from '../billboard-types/billboard-types.component';

@Component({
  selector: 'app-billboards',
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.scss']
})
export class BillboardsComponent {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {
    this.tableConfigs = {
      tableName: 'Billboards',
      columns: this.supplierTableColumns,
      showDelete: true,
      showExport: true,
      showImport: true,
      wrapInCard: true,
      requestParams: {
        storeSelector: StoreSelectors.BILLBOARDS,
      },
      // graphQLOpType: GraphQLOpType.QUERY,
    };
  }

  supplierTableColumns: TableColumn[] = [
    { name: 'Address', prop: 'name', isSortable: true },
    { name: 'Type', prop: 'email', isSortable: true },
    { name: 'City', prop: 'address', isSortable: true },
    { name: 'Supplier', prop: 'vatNumber', isSortable: true },
    { name: 'Total Size', prop: 'vatNumber', isSortable: true },
    { name: 'Billboard Number', prop: 'vatNumber', isSortable: true },
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
      this.apiService
        .createSupplier(this.addSupplierForm.value)
        .subscribe((res) => {
          this.addSupplierForm.reset();
          this.forcedChangeVal = new Date().getTime();
        });
    } else {
      this.apiService
        .updateSupplier(this.updateSupplierForm.value)
        .subscribe((res) => {
          this.forcedChangeVal = new Date().getTime();
        });
    }
  }

  handleFormTemplateEvent(event: FormMutationInfo) {
    console.log('handleFormTemplateEvent', event);

    // this.selectedMutationType = event;
    if (event.mutationType === MutationType.CREATE) {
      this.createOrUpdateForm = this.addSupplierForm;
    } else if (event.mutationType === MutationType.UPDATE) {
      this.createOrUpdateForm = this.updateSupplierForm;
      this.createOrUpdateForm.patchValue(event.data as Supplier);
    } else if (event.mutationType === MutationType.DELETE) {
      this.apiService
        .deleteSupplier(event.data?.id as string)
        .subscribe((res) => {
          this.forcedChangeVal = new Date().getTime();
        });
    }

    if (this.createOrUpdateForm.valid) {
      this.saveSupplier(event.mutationType);
    }
  }
}
