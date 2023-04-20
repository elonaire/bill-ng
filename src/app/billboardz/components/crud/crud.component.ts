import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  GenericTableConfigs,
  Supplier,
  TableColumn,
} from 'src/app/@types/billboardz';
import { ApiService } from '../../services/api.service';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum MutationType {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './crud.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CrudComponent implements OnInit {
  @Input() tableConfigs!: GenericTableConfigs;
  @Output() changeEvent = new EventEmitter<any>();
  @Input() forcedChangeVal: any;

  data: Supplier[] = [];
  columns: TableColumn[] = [];

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  dataItem: Partial<Supplier> = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];
  addSupplierForm!: FormGroup;
  selectedMutationType: MutationType = MutationType.CREATE;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService,
    private apollo: Apollo,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getData();
    this.columns = this.tableConfigs?.columns;
    this.addSupplierForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', Validators.required],
        vatNumber: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);

    if (
      changes['forcedChangeVal'].currentValue &&
      !changes['forcedChangeVal'].firstChange
    ) {
      this.getData();
    }
  }

  getData() {
    console.log('getData');

    this.apiService.getSuppliers().subscribe(async (res) => {
      await this.apollo.client.resetStore();
      this.data = (res.data as any).getSuppliers;
      console.log('this.data', this.data);
    });
  }

  openNew() {
    this.dataItem = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(dataItem: Supplier) {
    this.dataItem = { ...dataItem };
    this.productDialog = true;
    this.addSupplierForm.patchValue(this.dataItem);
    this.selectedMutationType = MutationType.UPDATE;
  }

  deleteProduct(dataItem: Supplier) {
    this.deleteProductDialog = true;
    this.dataItem = { ...dataItem };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedProducts = [];
  }

  confirmDelete(row: Partial<Supplier>) {
    this.deleteProductDialog = false;
    this.apiService.deleteSupplier(row.id as string).subscribe((res) => {
        this.changeEvent.emit((res.data as any).deleteSupplier);
      });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
    this.dataItem = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(opType: MutationType) {
    this.submitted = true;

    if (opType === MutationType.CREATE) {
        this.apiService.createSupplier(this.addSupplierForm.value).subscribe((res) => {
            this.changeEvent.emit((res.data as any).createSupplier);
            this.addSupplierForm.reset();
          });
    } else {
        this.apiService.updateSupplier(this.addSupplierForm.value).subscribe((res) => {
            this.changeEvent.emit((res.data as any).updateSupplier);
          });
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  get MutationType() {
    return MutationType;
  }
}
