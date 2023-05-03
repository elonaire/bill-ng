import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn, GenericTableConfigs, Supplier, AppState } from 'src/app/@types/billboardz';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';
import { StoreSelectors } from '../../suppliers/suppliers/suppliers.component';
import { Store } from '@ngrx/store';
import { loadCities } from 'src/app/store/actions/cities.actions';

export enum MutationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  constructor(private fb: FormBuilder, private apiService: ApiService, private store: Store<AppState>) {
    this.tableConfigs = {
      tableName: 'Cities',
      columns: this.supplierTableColumns,
      showDelete: true,
      showExport: true,
      showImport: true,
      wrapInCard: true,
      requestParams: {
        storeSelector: StoreSelectors.CITIES,
      },
      // graphQLOpType: GraphQLOpType.QUERY,
    };
  }

  supplierTableColumns: TableColumn[] = [
    // { name: 'ID', prop: 'id', isSortable: true },
    { name: 'Name', prop: 'name', isSortable: true },
    { name: 'Population', prop: 'population', isSortable: true },
    { name: 'Men', prop: 'men', isSortable: true },
    { name: 'Women', prop: 'women', isSortable: true },
    { name: 'Area', prop: 'area', isSortable: true },
    { name: 'Socio Economy', prop: 'socio_economy', isSortable: true },
    { name: 'License Holders', prop: 'license_holders', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;
  addSupplierForm!: FormGroup;
  updateSupplierForm!: FormGroup;
  createOrUpdateForm!: FormGroup;

  ngOnInit(): void {
    this.store.dispatch(loadCities());
    
    this.addSupplierForm = this.fb.group({
      name: ['', Validators.required],
      population: ['', Validators.required],
      men: ['', Validators.required],
      women: ['', Validators.required],
      area: ['', Validators.required],
      socio_economy: ['', Validators.required],
      license_holders: ['', Validators.required],
    });

    this.updateSupplierForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      population: ['', Validators.required],
      men: ['', Validators.required],
      women: ['', Validators.required],
      area: ['', Validators.required],
      socio_economy: ['', Validators.required],
      license_holders: ['', Validators.required],
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
        .createCity(this.createOrUpdateForm.value)
        .subscribe((res) => {
          this.createOrUpdateForm.reset();
          this.forcedChangeVal = new Date().getTime();
        });
    } else if (opType === MutationType.UPDATE) {
      console.log('this.createOrUpdateForm', this.createOrUpdateForm.value);
      
      this.apiService
        .updateCity(this.createOrUpdateForm.value)
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
      this.apiService.deleteCity(event.data?.id as string).subscribe((res) => {
        this.forcedChangeVal = new Date().getTime();
      });
    }

    if (this.createOrUpdateForm.valid) {
      this.saveSupplier(event.mutationType);
    }
  }
}
