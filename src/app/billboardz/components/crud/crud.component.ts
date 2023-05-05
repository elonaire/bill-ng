import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  AppState,
  GenericTableConfigs,
  Supplier,
  TableColumn,
} from 'src/app/@types/billboardz.d';
import { ApiService } from '../../services/api.service';
import { Apollo } from 'apollo-angular';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as selectors from '../../../store/selectors';

export enum MutationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface FormMutationInfo {
  mutationType: MutationType;
  data?: Supplier;
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
  @Input() formTemplate!: TemplateRef<any>;
  @Output() formTemplateEvent = new EventEmitter<FormMutationInfo>();
  fileData: FormData = new FormData();

  data: Supplier[] = [];
  columns: TableColumn[] = [];

  addItemDialog: boolean = false;

  deleteItemDialog: boolean = false;

  deleteItemsDialog: boolean = false;

  dataItem!: Supplier;

  selectedItems: Supplier[] = [];

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];
  selectedMutationType: MutationType = MutationType.CREATE;
  itemId!: string | null | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService,
    private apollo: Apollo,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.itemId = this.route?.parent?.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getData();
    this.columns = this.tableConfigs.columns;
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
    this.store.select((selectors as any)[this.tableConfigs.requestParams.storeSelector]).subscribe((res) => {
      console.log('res', res);
      this.data = res;
    });
  }

  getNestedValue(obj: Record<string, any>, key: string | string[]): any {
    if (typeof key === 'string') {
        return obj[key];
    }

    return key.reduce((accumulator, currentKey) => {
        return accumulator ? accumulator[currentKey] : undefined;
    }, obj);
};

  openNew() {
    // this.dataItem = {};
    this.submitted = false;
    this.addItemDialog = true;
    this.formTemplateEvent.emit({ mutationType: MutationType.CREATE });
  }

  deleteSelectedItems() {
    this.deleteItemsDialog = true;
  }

  editItem(dataItem: Supplier) {
    this.dataItem = { ...dataItem };
    console.log('this.dataItem', this.dataItem);
    
    this.addItemDialog = true;
    this.selectedMutationType = MutationType.UPDATE;
    this.formTemplateEvent.emit({ mutationType: MutationType.UPDATE, data: this.dataItem });
  }

  deleteItem(dataItem: Supplier) {
    this.deleteItemDialog = true;
    this.dataItem = { ...dataItem };
  }

  confirmDeleteSelected() {
    this.deleteItemsDialog = false;
    this.selectedItems.forEach((dataItem) => {
      this.formTemplateEvent.emit({ mutationType: MutationType.DELETE, data: dataItem });
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedItems = [];
  }

  confirmDelete(row: Supplier) {
    this.deleteItemDialog = false;
    this.formTemplateEvent.emit({ mutationType: MutationType.DELETE, data: row });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
    // this.dataItem = {};
  }

  hideDialog() {
    this.addItemDialog = false;
    this.submitted = false;
  }

  saveItem(opType: MutationType) {
    this.submitted = true;
    console.log('opType', opType);
    this.formTemplateEvent.emit({ mutationType: opType, data: this.dataItem });
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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  uploadCSV(event: any) {
    console.log('event', event);
    this.fileData.append('file', event.currentFiles[0]);

    this.apiService.uploadCSV(this.fileData).subscribe((res) => {
      console.log('res', res);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Records Uploaded',
        life: 3000,
      });
    }
    );
  }
}
