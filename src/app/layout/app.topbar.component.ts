import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppSidebarComponent } from './app.sidebar.component';
import { LayoutService } from './service/app.layout.service';
import { AppState } from '../@types/billboardz';
import { Store } from '@ngrx/store';
import { logout } from '../store/actions/user.actions';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    activeItem!: number;
    constructor(public layoutService: LayoutService, public el: ElementRef, private store: Store<AppState>) {}

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onSidebarButtonClick() {
        this.layoutService.showSidebar();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    logout() {
        this.store.dispatch(logout());
    }
}
