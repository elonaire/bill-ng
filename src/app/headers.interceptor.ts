import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from './@types/billboardz.d';
import { Store } from '@ngrx/store';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store.select('user').subscribe((user) => {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    });

    if (!request.headers.has('Authorization')) {
      this.router.navigate(['/']);
    }
    return next.handle(request);
  }
}
