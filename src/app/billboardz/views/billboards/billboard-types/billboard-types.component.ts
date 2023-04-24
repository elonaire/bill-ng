import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn, GenericTableConfigs, Supplier } from 'src/app/@types/billboardz';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';

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
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.tableConfigs = {
      tableName: 'Billboard Types',
      columns: this.supplierTableColumns,
      showDelete: true,
      showExport: true,
      showImport: true,
      wrapInCard: true,
      requestParams: {
        service: 'apiService',
        serviceMethod: 'getBillboardTypes',
        graphQlQuery: 'getBillboardTypes',
      },
      // graphQLOpType: GraphQLOpType.QUERY,
    };
  }

  supplierTableColumns: TableColumn[] = [
    { name: 'ID', prop: 'id', isSortable: true },
    { name: 'Name', prop: 'name', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;
  addSupplierForm!: FormGroup;
  updateSupplierForm!: FormGroup;
  createOrUpdateForm!: FormGroup;

  ngOnInit(): void {
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
      this.apiService
        .createBillboardType(this.addSupplierForm.value)
        .subscribe((res) => {
          this.addSupplierForm.reset();
          this.forcedChangeVal = new Date().getTime();
        });
    } else {
      this.apiService
        .updateBillboardType(this.updateSupplierForm.value)
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
      console.log('this.createOrUpdateForm', this.createOrUpdateForm.value);
      
    } else if (event.mutationType === MutationType.DELETE) {
      this.apiService.deleteBillboardType(event.data?.id as string).subscribe((res) => {
        this.forcedChangeVal = new Date().getTime();
      });
    }

    if (this.createOrUpdateForm.valid) {
      this.saveSupplier(event.mutationType);
    }
  }
}
