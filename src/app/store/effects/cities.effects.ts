import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, EMPTY } from "rxjs";
import { ApiService } from "src/app/billboardz/services/api.service";

@Injectable()
export class CitiesEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Cities] Load Cities'),
      mergeMap(() =>
        this.apiService.getCities().pipe(
          map((cities) => ({
            type: '[Cities] Load Cities Success',
            payload: cities,
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