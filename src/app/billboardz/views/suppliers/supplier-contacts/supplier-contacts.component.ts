import { Component } from '@angular/core';
import { TableColumn, GenericTableConfigs } from 'src/app/@types/billboardz';

@Component({
  selector: 'app-supplier-contacts',
  templateUrl: './supplier-contacts.component.html',
  styleUrls: ['./supplier-contacts.component.scss']
})
export class SupplierContactsComponent {
  constructor() {
    this.tableConfigs = {
      tableName: '',
      columns: this.supplierTableColumns,
      showDelete: false,
      showExport: false,
      showImport: false,
      requestParams: {
        service: 'apiService',
        serviceMethod: 'getSupplier',
        graphQlQuery: 'getSupplierById'
      }
    };
  }

  supplierTableColumns: TableColumn[] = [
    { name: 'Name', prop: 'name', isSortable: true },
    { name: 'Role', prop: 'role', isSortable: true },
    { name: 'Email', prop: 'email', isSortable: true },
    { name: 'Phone', prop: 'phone', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;

  handleChangeEvent(event: any) {
    console.log('called', event);
    this.forcedChangeVal = new Date().getTime();
  }
}
