import { Action, createReducer, on } from '@ngrx/store';
import { BillboardzUserState } from 'src/app/@types/billboardz.d';
import { login, loginSuccess, logout } from '../actions/user.actions';
import { error } from '../actions/global.actions';

export const INITIAL_STATE: BillboardzUserState = {
  user: null,
  loading: false,
  token: '',
  error: '',
};

const userReducer = createReducer(
  INITIAL_STATE,
  on(login, (state) => state),
  on(loginSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      token: payload.data['login'].token,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      token: '',
    };
  }),
  on(error, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload['message'],
    };
  })
);

export function reducer(
  state: BillboardzUserState | undefined,
  action: Action
) {
  return userReducer(state, action);
}
