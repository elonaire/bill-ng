import { Component, OnInit } from '@angular/core';
import { GenericTableConfigs, TableColumn } from 'src/app/@types/billboardz';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  constructor() {
    this.tableConfigs = {
      tableName: 'Supplier',
      columns: this.supplierTableColumns,
    };
  }

  supplierTableColumns: TableColumn[] = [
    { name: 'Name', prop: 'name', isSortable: true },
    { name: 'Email', prop: 'email', isSortable: true },
    { name: 'Address', prop: 'address', isSortable: true },
    { name: 'VAT Number', prop: 'vatNumber', isSortable: true },
  ];
  tableConfigs: GenericTableConfigs;
  forcedChangeVal: any;

  ngOnInit(): void {}

  handleChangeEvent(event: any) {
    console.log('called', event);
    this.forcedChangeVal = new Date().getTime();
  }
}
