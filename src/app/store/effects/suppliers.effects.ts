import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, EMPTY } from "rxjs";
import { ApiService } from "src/app/billboardz/services/api.service";

@Injectable()
export class SuppliersEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService
      ) {}

    loadSuppliers$ = createEffect(() => this.actions$.pipe(
        ofType('[Suppliers] Load Suppliers'),
        mergeMap(() => this.apiService.getSuppliers()
          .pipe(
            map(suppliers => ({ type: '[Suppliers] Load Suppliers Success', payload: suppliers })),
            catchError(() => EMPTY)
          ))
        )
      );

      loadSupplierContacts$ = createEffect(() => this.actions$.pipe(
        ofType('[Suppliers] Load Supplier Contacts'),
        mergeMap((action) => this.apiService.getSupplierContacts(action['supplierId'])
          .pipe(
            map(supplierContacts => ({ type: '[Suppliers] Load Supplier Contacts Success', payload: supplierContacts })),
            catchError(() => EMPTY)
          ))
        )
      );
}
