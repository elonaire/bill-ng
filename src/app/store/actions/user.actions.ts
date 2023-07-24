import { createAction, props } from "@ngrx/store";

export const login = createAction('[User] Login', props<{username: string, password: string}>());

export const loginSuccess = createAction('[User] Login Success', (payload: any) => ({ payload }));

export const logout = createAction('[User] Logout');
