import { AfterContentInit, Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, TableColumn, GenericTableConfigs, Supplier } from 'src/app/@types/billboardz';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';
import { loadSuppliers } from 'src/app/store/actions/suppliers.actions';
import { StoreSelectors } from '../../suppliers/suppliers/suppliers.component';
import { MutationType } from '../billboard-types/billboard-types.component';
import * as selectors from '../../../../store/selectors';
import { loadBillboardTypes, loadBillboards } from 'src/app/store/actions/billboards.actions';

declare var google: any;

@Component({
  selector: 'app-billboards',
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.scss']
})
export class BillboardsComponent implements OnInit, AfterContentInit {
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

  @ViewChild('searchBar', { static: false }) searchBar!: ElementRef;
  supplierTableColumns: TableColumn[] = [
    { name: 'Address', prop: 'name', isSortable: true },
    { name: 'Type', prop: 'billboardTypeName', isSortable: true },
    { name: 'City', prop: 'cityName', isSortable: true },
    { name: 'Supplier', prop: 'supplierName', isSortable: true },
    { name: 'Total Size', prop: 'totalSize', isSortable: true },
    { name: 'Billboard Number', prop: 'billboardNumber', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;
  addBillboardForm!: FormGroup;
  updateBillboardForm!: FormGroup;
  addressForm!: FormGroup;
  createOrUpdateForm!: FormGroup;
  options: any;
  overlays!: any[];
  style: any;
  map!: google.maps.Map;
  osmLayer: any;
  cities!: any[];
  suppliers!: any[];
  billboardTypes!: any[];

  ngOnInit(): void {
    this.options = {
      center: { lat: 32.0853, lng: 34.7818 },
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.overlays = [];

    this.store.dispatch(loadBillboards());
    this.store.dispatch(loadSuppliers());
    this.store.dispatch(loadBillboardTypes());
    this.addressForm = this.fb.group({
      longitude: [{ value: 0, disabled: true}, Validators.required],
      latitude: [{ value: 0, disabled: true}, Validators.required],
    });
    this.addBillboardForm = this.fb.group({
      address: [this.addressForm.value, Validators.required],
      type: ['', Validators.required],
      city: ['', Validators.required],
      supplier: ['', Validators.required],
      totalSize: ['', Validators.required],
      billboardNumber: ['', Validators.required],

    });

    this.updateBillboardForm = this.fb.group({
      id: ['', Validators.required],
      address: [this.addressForm.value, Validators.required],
      type: ['', Validators.required],
      city: ['', Validators.required],
      supplier: ['', Validators.required],
      totalSize: ['', Validators.required],
      billboardNumber: ['', Validators.required],
    });

    this.createOrUpdateForm = this.addBillboardForm;
    this.getBillboardTypes();
    this.getSuppliers();
  }

  ngAfterContentInit(): void {
    this.initAutocomplete();
  }

  initAutocomplete(): void {
    const input = this.searchBar?.nativeElement as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    console.log('autocomplete', autocomplete);
    

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log('place', place);
      
    });
  }

  overlayClicked(event: any) {
    console.log('event', event);
    
    console.log('overlayClicked', event.latLng.lat(), event.latLng.lng());
    this.addressForm.patchValue({
      longitude: event.latLng.lng(),
      latitude: event.latLng.lat(),
    });

    this.overlays = [
      new google.maps.Marker({
          position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
          title: 'Billboard',
      }),
    ];

    this.getCitiesWithinRadius(50000, event.latLng.lat(), event.latLng.lng());
  }

  handleChangeEvent(event: any) {
    console.log('called', event);
    this.forcedChangeVal = new Date().getTime();
  }

  saveSupplier(opType: MutationType) {
    if (opType === MutationType.CREATE) {
      this.createOrUpdateForm.patchValue({
        address: this.addressForm.value,
      });
      console.log('this.createOrUpdateForm.value', this.createOrUpdateForm.value);
      
      this.apiService
        .createBillboard(this.createOrUpdateForm.value)
        .subscribe((res) => {
          this.createOrUpdateForm.reset();
          this.forcedChangeVal = new Date().getTime();
        });
    } else {
      this.apiService
        .updateBillboard(this.createOrUpdateForm.value)
        .subscribe((res) => {
          this.forcedChangeVal = new Date().getTime();
        });
    }
  }

  handleFormTemplateEvent(event: FormMutationInfo) {
    console.log('handleFormTemplateEvent', event);

    // this.selectedMutationType = event;
    if (event.mutationType === MutationType.CREATE) {
      this.createOrUpdateForm = this.addBillboardForm;
    } else if (event.mutationType === MutationType.UPDATE) {
      this.createOrUpdateForm = this.updateBillboardForm;
      this.createOrUpdateForm.patchValue(event.data as Supplier);
    } else if (event.mutationType === MutationType.DELETE) {
      this.apiService
        .deleteBillboard(event.data?.id as string)
        .subscribe((res) => {
          this.forcedChangeVal = new Date().getTime();
        });
    }

    if (this.createOrUpdateForm.valid) {
      this.saveSupplier(event.mutationType);
    }
  }

  getBillboardTypes() {
    this.store.select(selectors.selectBillboardTypes).subscribe((res) => {
      console.log('getBillboardTypes called', res);
      this.billboardTypes = res;
    });
  }

  getSuppliers() {
    this.store.select(selectors.selectSuppliers).subscribe((res) => {
      this.suppliers = res;
    });
  }

  handleSelectEvent(event: any, field: string) {
    console.log('handleSelectEvent', event);
    console.log('field', field);
    if (field === 'city') {
      this.createOrUpdateForm.patchValue({
        [field]: event.value.name,
      });
    } else {
      this.createOrUpdateForm.patchValue({
        [field]: event.value.id,
      });
    }
  }

  getCitiesWithinRadius(radius: number, lat: number, lng: number) {
    this.apiService.getCitiesWithinRadius(radius, lat, lng).subscribe((res) => {
      console.log('getCitiesWithinRadius', res);
      this.cities = (res as any).results as any[];
    });
  }
}
