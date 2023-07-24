import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiService } from '../../services/api.service';
import { AppState, BillboardzUserState } from 'src/app/@types/billboardz';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/user.actions';
import { MessageService } from 'primeng/api';
import * as selectors from '../../../store/selectors';
import { Router } from '@angular/router';
import { first, forkJoin, pipe, tap } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private store: Store<AppState>,
    private messageService: MessageService,
    private router: Router,
  ) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  login() {
    console.log(this.loginForm.value);
    this.store.dispatch(login({ ...this.loginForm.value }));

    this.store.select(selectors.selectUser).subscribe((user) => {
      // display toast message if we have an error

      if (user.error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to login',
          detail: user.error,
          life: 3000,
        });
      }
    });
  }

}
