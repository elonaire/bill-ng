import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "primeng/api";
import { mergeMap, map, catchError, EMPTY, tap } from "rxjs";
import { ApiService } from "src/app/billboardz/services/api.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[User] Login"),
      mergeMap((action) =>
        this.apiService
          .login(action["username"], action["password"])
          .pipe(
            map((user) => ({ type: "[User] Login Success", payload: user })),
            catchError(async (error) => ({ type: "[Global] Error", payload: error }))
          )
      )
    )
  );

  handleLoginSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType("[User] Login Success"),
    tap((action) => {
      // Perform any necessary logic with the login response
      const user = action["payload"];
      
      // Navigate to the admin page
      this.router.navigate(['admin']);
    })
  ),
  { dispatch: false }
);

handleLoginFailure$ = createEffect(() =>
  this.actions$.pipe(
    ofType("[Global] Error"),
    tap((action) => {
      const error = action["payload"];
    })
  ),
  { dispatch: false }
);

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[User] Logout"),
      tap((action) => {
        // Perform any necessary logic with the logout response
        this.router.navigate(['']);
      })
    ),
    { dispatch: false }
  );

  
}
