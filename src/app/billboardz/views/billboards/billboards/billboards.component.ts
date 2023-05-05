import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AppState,
  TableColumn,
  GenericTableConfigs,
} from 'src/app/@types/billboardz';
import { FormMutationInfo } from 'src/app/billboardz/components/crud/crud.component';
import { ApiService } from 'src/app/billboardz/services/api.service';
import { loadSuppliers } from 'src/app/store/actions/suppliers.actions';
import { StoreSelectors } from '../../suppliers/suppliers/suppliers.component';
import { MutationType } from '../billboard-types/billboard-types.component';
import * as selectors from '../../../../store/selectors';
import {
  createBillboard,
  deleteBillboard,
  loadBillboardTypes,
  loadBillboards,
  updateBillboard,
} from 'src/app/store/actions/billboards.actions';

declare var google: any;

@Component({
  selector: 'app-billboards',
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.scss'],
})
export class BillboardsComponent implements OnInit, AfterContentInit {
  selectedImageToUpload: any;
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
    { name: 'Address', prop: 'formattedAddress', isSortable: true },
    { name: 'Type', prop: 'billboardTypeName', isSortable: true },
    { name: 'City', prop: 'cityName', isSortable: true },
    { name: 'Supplier', prop: 'supplierName', isSortable: true },
    { name: 'Total Size', prop: 'totalSize', isSortable: true },
    { name: 'Billboard Number', prop: 'billboardNumber', isSortable: true },
    // width, height, subType, side, premiumDescription, orientation, isActive, price, views, rotation, image1, image2, image3, image4, image5, image6, image7, image8
    { name: 'Width', prop: 'width', isSortable: true },
    { name: 'Height', prop: 'height', isSortable: true },
    { name: 'Sub type', prop: 'subType', isSortable: true },
    { name: 'Side', prop: 'side', isSortable: true },
    {
      name: 'Premium Description',
      prop: 'premiumDescription',
      isSortable: true,
    },
    { name: 'Orientation', prop: 'orientation', isSortable: true },
    { name: 'Status', prop: 'isActive', isSortable: true },
    { name: 'Price', prop: 'price', isSortable: true },
    { name: 'Views', prop: 'views', isSortable: true },
    { name: 'Rotation', prop: 'rotation', isSortable: true },
    { name: 'Image 1', prop: 'image1', isSortable: true },
    { name: 'Image 2', prop: 'image2', isSortable: true },
    { name: 'Image 3', prop: 'image3', isSortable: true },
    { name: 'Image 4', prop: 'image4', isSortable: true },
    { name: 'Image 5', prop: 'image5', isSortable: true },
    { name: 'Image 6', prop: 'image6', isSortable: true },
    { name: 'Image 7', prop: 'image7', isSortable: true },
    { name: 'Image 8', prop: 'image8', isSortable: true },
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
  uploadedFiles: any[] = [];
  imagesIndex = [
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
    'image7',
    'image8',
  ];
  formData: FormData = new FormData();
  uploadEndpoint = 'http://localhost:3000/files/upload-bulk';
  billboardStatuses = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

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
      longitude: [{ value: 0, disabled: true }, Validators.required],
      latitude: [{ value: 0, disabled: true }, Validators.required],
      formattedAddress: [{ value: '', disabled: true }, Validators.required],
      neighborhood: [{ value: '', disabled: true }, Validators.required],
    });
    this.addBillboardForm = this.fb.group({
      address: [this.addressForm.value, Validators.required],
      type: ['', Validators.required],
      city: ['', Validators.required],
      supplier: ['', Validators.required],
      totalSize: ['', Validators.required],
      billboardNumber: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      subType: ['', Validators.required],
      side: ['', Validators.required],
      premiumDescription: ['', Validators.required],
      orientation: ['', Validators.required],
      isActive: [false, Validators.required],
      price: ['', Validators.required],
      views: ['', Validators.required],
      rotation: ['', Validators.required],
      images: [[]],
    });

    this.updateBillboardForm = this.fb.group({
      id: ['', Validators.required],
      address: [this.addressForm.value, Validators.required],
      type: ['', Validators.required],
      city: ['', Validators.required],
      supplier: ['', Validators.required],
      totalSize: ['', Validators.required],
      billboardNumber: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      subType: ['', Validators.required],
      side: ['', Validators.required],
      premiumDescription: ['', Validators.required],
      orientation: ['', Validators.required],
      isActive: [false, Validators.required],
      price: ['', Validators.required],
      views: ['', Validators.required],
      rotation: ['', Validators.required],
      images: [[]],
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

    console.log(
      'this.addressForm.value',
      this.addressForm.value
    );

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
      console.log(
        'this.createOrUpdateForm.value',
        this.createOrUpdateForm.value
      );

      this.store.dispatch(
        createBillboard({ billboard: this.createOrUpdateForm.value })
      );
    } else {
      this.store.dispatch(
        updateBillboard({ billboard: this.createOrUpdateForm.value })
      );
    }
  }

  handleFormTemplateEvent(event: FormMutationInfo) {
    console.log('handleFormTemplateEvent', event);

    // this.selectedMutationType = event;
    if (event.mutationType === MutationType.CREATE) {
      this.createOrUpdateForm = this.addBillboardForm;
      console.log('this.createOrUpdateForm', this.createOrUpdateForm.value);
    } else if (event.mutationType === MutationType.UPDATE) {
      this.createOrUpdateForm = this.updateBillboardForm;
      if (!this.createOrUpdateForm.valid) {
        this.createOrUpdateForm.patchValue(event.data as any);
      }
    } else if (event.mutationType === MutationType.DELETE) {
      this.store.dispatch(
        deleteBillboard({ billboardId: event.data?.id as string })
      );
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
      this.getSelectedPlaceDetails(event.value.place_id);
      this.createOrUpdateForm.patchValue({
        [field]: event.value.name,
      });
    } else if (field === 'isActive') {
      this.createOrUpdateForm.patchValue({
        [field]: event.value,
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

  getSelectedPlaceDetails(placeId: string) {
    this.apiService.getSelectedPlaceDetails(placeId).subscribe((res) => {
      console.log('getSelectedPlaceDetails', res);
      this.addressForm.patchValue({
        formattedAddress: (res as any).result.formatted_address,
        neighborhood: (res as any).result.vicinity,
      });
    });
  }

  handleFileSelect(event: any) {
    console.log('handleFileSelect', event);
    // this.uploadedFiles = event.currentFiles;
    this.formData.set(
      this.selectedImageToUpload,
      event.currentFiles[0] as File
    );
    console.log('this.formData', this.formData);
    this.selectedImageToUpload = '';
  }

  uploadFiles() {
    console.log('onUpload');
  }

  handleSelectImageToUpload(event: any) {
    console.log('handleSelectImageToUpload', event);
    this.selectedImageToUpload = event.value;
  }

  uploadHandler(event: any) {
    console.log('uploadHandler', event);

    this.apiService.filesBulkUpload(this.formData).subscribe((res) => {
      const files = (res as any[]).map((file) => {
        const { originalname, filename, path, destination, fieldname, mimetype, encoding, size, _id } = file;
        return {
          originalname,
          filename,
          path,
          destination,
          fieldname,
          mimetype,
          size,
          encoding,
          _id,
        };
      });
      
      this.uploadedFiles = [...this.uploadedFiles, ...files];
      this.createOrUpdateForm.patchValue({
        images: files,
      });
      this.formData = new FormData();
    });
  }
}
