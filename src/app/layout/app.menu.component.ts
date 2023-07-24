import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/home']
                    }
                ]
            },
            {
                label: 'Suppliers',
                icon: 'pi pi-users',
                items: [
                    {
                        label: 'Suppliers',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/']
                    },
                ]
            },
            {
                label: 'Billboards',
                icon: 'pi pi-briefcase',
                items: [
                    {
                        label: 'Billboards',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/admin/billboards']
                    },
                    {
                        label: 'Billboard Types',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/admin/billboards/types']
                    },
                ]
            },
            {
                label: 'Cities',
                icon: 'pi pi-building',
                items: [
                    {
                        label: 'Cities',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/admin/cities']
                    },
                ]
            },
        ];
    }
}
