import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, EMPTY } from "rxjs";
import { ApiService } from "src/app/billboardz/services/api.service";

@Injectable()
export class BillboardsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadBillboardTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Load Billboard Types'),
      mergeMap(() =>
        this.apiService.getBillboardTypes().pipe(
          map((billboardTypes) => ({
            type: '[Billboards] Load Billboard Types Success',
            payload: billboardTypes,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  loadBillboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Load Billboards'),
      mergeMap(() =>
        this.apiService.getBillboards().pipe(
          map((billboards) => ({
            type: '[Billboards] Load Billboards Success',
            payload: billboards,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  createBillboardType$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Create Billboard Type'),
      mergeMap((action) =>
        this.apiService.createBillboardType(action['billboardType']).pipe(
          map((billboardType) => ({
            type: '[Billboards] Create Billboard Type Success',
            payload: billboardType,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  updateBillboardType$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Update Billboard Type'),
      mergeMap((action) =>
        this.apiService.updateBillboardType(action['billboardType']).pipe(
          map((billboardType) => ({
            type: '[Billboards] Update Billboard Type Success',
            payload: billboardType,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  deleteBillboardType$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Delete Billboard Type'),
      mergeMap((action) =>
        this.apiService.deleteBillboardType(action['billboardTypeId']).pipe(
          map((billboardType) => ({
            type: '[Billboards] Delete Billboard Type Success',
            payload: billboardType,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  createBillboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Create Billboard'),
      mergeMap((action) =>
        this.apiService.createBillboard(action['billboard']).pipe(
          map((billboard) => ({
            type: '[Billboards] Create Billboard Success',
            payload: billboard,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  updateBillboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Update Billboard'),
      mergeMap((action) =>
        this.apiService.updateBillboard(action['billboard']).pipe(
          map((billboard) => ({
            type: '[Billboards] Update Billboard Success',
            payload: billboard,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );

  deleteBillboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Billboards] Delete Billboard'),
      mergeMap((action) =>
        this.apiService.deleteBillboard(action['billboardId']).pipe(
          map((billboard) => ({
            type: '[Billboards] Delete Billboard Success',
            payload: billboard,
          })),
          catchError(async (error) => ({
            type: '[Global] Error',
            payload: error,
          }))
        )
      )
    )
  );
}
