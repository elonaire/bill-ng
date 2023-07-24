import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, EMPTY, tap } from 'rxjs';
import { ApiService } from 'src/app/billboardz/services/api.service';

@Injectable()
export class SuppliersEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Load Suppliers'),
      mergeMap(() =>
        this.apiService.getSuppliers().pipe(
          map((suppliers) => ({
            type: '[Suppliers] Load Suppliers Success',
            payload: suppliers,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  loadSupplierContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Load Supplier Contacts'),
      mergeMap((action) =>
        this.apiService.getSupplierContacts(action['supplierId']).pipe(
          map((supplierContacts) => ({
            type: '[Suppliers] Load Supplier Contacts Success',
            payload: supplierContacts,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  createSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Create Supplier'),

      mergeMap((action) =>
        this.apiService.createSupplier(action['supplier']).pipe(
          map((supplier) => ({
            type: '[Suppliers] Create Supplier Success',
            payload: supplier,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  updateSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Update Supplier'),

      mergeMap((action) =>
        this.apiService.updateSupplier(action['supplier']).pipe(
          map((supplier) => ({
            type: '[Suppliers] Update Supplier Success',
            payload: supplier,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  deleteSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Delete Supplier'),

      mergeMap((action) =>
        this.apiService.deleteSupplier(action['supplierId']).pipe(
          map((supplier) => ({
            type: '[Suppliers] Delete Supplier Success',
            payload: supplier,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  createSupplierContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Create Supplier Contact'),

      mergeMap((action) =>
        this.apiService
          .createSupplierContact(
            action['supplierContact'],
            action['supplierId'],
            action['supplierContactRoleIds']
          )
          .pipe(
            map((supplierContact) => ({
              type: '[Suppliers] Create Supplier Contact Success',
              payload: supplierContact,
            })),
            catchError(async (error) => ({
              type: '[Global] Error',
              payload: error,
            }))
          )
      )
    )
  );

  updateSupplierContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Update Supplier Contact'),

      mergeMap((action) =>
        this.apiService.updateSupplierContact(action['supplierContact']).pipe(
          map((supplierContact) => ({
            type: '[Suppliers] Update Supplier Contact Success',
            payload: supplierContact,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  deleteSupplierContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Suppliers] Delete Supplier Contact'),

      mergeMap((action) =>
        this.apiService.deleteSupplierContact(action['supplierContactId']).pipe(
          map((supplierContact) => ({
            type: '[Suppliers] Delete Supplier Contact Success',
            payload: supplierContact,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  handleLoginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[Global] Error'),
        tap((action) => {
          const error = action['payload'];
        })
      ),
    { dispatch: false }
  );
}
