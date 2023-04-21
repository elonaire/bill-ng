import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss'],
})
export class SupplierDetailsComponent {
  routeItems = [
    { label: 'Contacts', routerLink: '' },
    { label: 'Cities', routerLink: '/cities' },
    { label: 'Signs', routerLink: '/signs' },
    { label: 'Orders', routerLink: '/orders' },
    { label: 'Customers', routerLink: '/customers' },
  ];
}
