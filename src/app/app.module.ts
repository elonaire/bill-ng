import { NgModule, isDevMode } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ApolloModule } from 'apollo-angular';
import { StoreModule } from '@ngrx/store';
import * as fromSuppliers from './store/reducers/suppliers.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SuppliersEffects } from './store/effects/suppliers.effects';
import *  as fromBillboards from './store/reducers/billboards.reducer';
import * as fromCities from './store/reducers/cities.reducer';
import { BillboardsEffects } from './store/effects/billboards.effects';
import { CitiesEffects } from './store/effects/cities.effects';
import * as fromUsers from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './headers.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    ApolloModule,
    StoreModule.forRoot({ suppliers: fromSuppliers.reducer, billboards: fromBillboards.reducer, cities: fromCities.reducer, user: fromUsers.reducer }),
    EffectsModule.forRoot([
        SuppliersEffects,
        CitiesEffects,
        BillboardsEffects,
        UserEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ToastModule,
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
