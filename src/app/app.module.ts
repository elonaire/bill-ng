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

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    ApolloModule,
    StoreModule.forRoot({ suppliers: fromSuppliers.reducer }),
    EffectsModule.forRoot([
        SuppliersEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
