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
          catchError(() => EMPTY)
        )
      )
    )
  );
}
