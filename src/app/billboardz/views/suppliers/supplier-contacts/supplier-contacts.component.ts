import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  TableColumn,
  GenericTableConfigs,
  Supplier,
  AppState,
} from 'src/app/@types/billboardz';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';
import { StoreSelectors } from '../suppliers/suppliers.component';
import { Store } from '@ngrx/store';
import { loadSupplierContacts } from 'src/app/store/actions/suppliers.actions';

export enum MutationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Component({
  selector: 'app-supplier-contacts',
  templateUrl: './supplier-contacts.component.html',
  styleUrls: ['./supplier-contacts.component.scss'],
})
export class SupplierContactsComponent {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.tableConfigs = {
      tableName: '',
      columns: this.supplierTableColumns,
      showDelete: false,
      showExport: false,
      showImport: false,
      requestParams: {
        storeSelector: StoreSelectors.SUPPLIER_CONTACTS,
      },
    };
  }

  supplierTableColumns: TableColumn[] = [
    { name: 'Name', prop: 'name', isSortable: true },
    { name: 'Role', prop: 'roleName', isSortable: true },
    { name: 'Email', prop: 'email', isSortable: true },
    { name: 'Phone', prop: 'phone', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;
  addSupplierContactForm!: FormGroup;
  updateSupplierContactForm!: FormGroup;
  createOrUpdateForm!: FormGroup;
  currentSupplierId!: string;
  roles!: any[];

  ngOnInit(): void {
    this.getRoles();
    this.currentSupplierId = this.route?.parent?.snapshot.paramMap.get('id') as string;
    console.log('currentSupplierId', this.currentSupplierId);
    
    this.store.dispatch(loadSupplierContacts({ supplierId: this.currentSupplierId }));
    this.addSupplierContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: [[], Validators.required],
    });

    this.updateSupplierContactForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: [[], Validators.required],
    });

    this.createOrUpdateForm = this.addSupplierContactForm;
  }

  handleChangeEvent(event: any) {
    console.log('called', event);
    this.forcedChangeVal = new Date().getTime();
  }

  saveSupplier(opType: MutationType) {
    if (opType === MutationType.CREATE) {
      const { name, email, phone } = this.createOrUpdateForm.value;
      this.apiService
        .createSupplierContact(
          { name, email, phone },
          this.currentSupplierId,
          this.createOrUpdateForm.value.role
        )
        .subscribe((res) => {
          this.createOrUpdateForm.reset();
          this.forcedChangeVal = new Date().getTime();
        });
    } else {
      this.apiService
        .updateSupplierContact(this.createOrUpdateForm.value)
        .subscribe((res) => {
          this.forcedChangeVal = new Date().getTime();
        });
    }
  }

  handleFormTemplateEvent(event: FormMutationInfo) {
    console.log('handleFormTemplateEvent', event);

    if (event.mutationType === MutationType.CREATE) {
      this.createOrUpdateForm = this.addSupplierContactForm;
    } else if (event.mutationType === MutationType.UPDATE) {
      this.createOrUpdateForm = this.updateSupplierContactForm;
      this.createOrUpdateForm.patchValue(event.data as Supplier);
    } else if (event.mutationType === MutationType.DELETE) {
      this.apiService
        .deleteSupplierContact(event.data?.id as string)
        .subscribe((res) => {
          this.forcedChangeVal = new Date().getTime();
        });
    }

    if (this.createOrUpdateForm.valid) {
      this.saveSupplier(event.mutationType);
    }
  }

  getRoles() {
    this.apiService.getRoles().subscribe((res) => {
      console.log('getRoles', res);
      this.roles = (res.data as any).getSupplierContactRoles;
    });
  }

  handleRoleChange(event: any) {
    console.log('handleRoleChange', event);
    this.createOrUpdateForm.patchValue({
      role: (event.value as any[]).map((val) => val.id),
    });
  }
}
