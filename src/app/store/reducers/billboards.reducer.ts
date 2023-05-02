import { createReducer, on, Action } from '@ngrx/store';
import { BillboardzBillboardsState } from 'src/app/@types/billboardz';
import {
  createBillboard,
  createBillboardType,
  createBillboardTypeSuccess,
  deleteBillboardType,
  deleteBillboardTypeSuccess,
  loadBillboardTypes,
  loadBillboardTypesSuccess,
  loadBillboards,
  loadBillboardsSuccess,
  updateBillboardType,
  updateBillboardTypeSuccess,
} from '../actions/billboards.actions';

export const INITIAL_STATE: BillboardzBillboardsState = {
  billboards: [],
  loading: false,
  billboardTypes: [],
};

const billboardsReducer = createReducer(
  INITIAL_STATE,
  on(loadBillboardTypes, (state) => state),
  on(loadBillboardTypesSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboardTypes: payload.data['getBillboardTypes'],
    };
  }),
  on(loadBillboards, (state) => state),
  on(loadBillboardsSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboards: payload.data['getBillboards'],
    };
  }),
  on(createBillboardType, (state) => state),
  on(createBillboardTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboardTypes: [
        ...state.billboardTypes,
        payload.data['createBillboardType'],
      ],
    };
  }),
  on(updateBillboardType, (state) => state),
  on(updateBillboardTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboardTypes: [
        ...state.billboardTypes.filter(
          (billboardType) =>
            billboardType.id !== payload.data['updateBillboardType'].id
        ),
        payload.data['updateBillboardType'],
      ],
    };
  }),
  on(deleteBillboardType, (state) => state),
  on(deleteBillboardTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboardTypes: [
        ...state.billboardTypes.filter(
          (billboardType) =>
            billboardType.id !== payload.data['deleteBillboardType'].id
        ),
      ],
    };
  }),
  on(createBillboard, (state) => state),
  on(createBillboardTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboards: [...state.billboards, payload.data['createBillboard']],
    };
  }),
  on(updateBillboardType, (state) => state),
  on(updateBillboardTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboards: [
        ...state.billboards.filter(
          (billboard) => billboard.id !== payload.data['updateBillboard'].id
        ),
        payload.data['updateBillboard'],
      ],
    };
  }),
  on(deleteBillboardType, (state) => state),
  on(deleteBillboardTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboards: [
        ...state.billboards.filter(
          (billboard) => billboard.id !== payload.data['deleteBillboard'].id
        ),
      ],
    };
  })
);

export function reducer(
  state: BillboardzBillboardsState | undefined,
  action: Action
) {
  return billboardsReducer(state, action);
}
