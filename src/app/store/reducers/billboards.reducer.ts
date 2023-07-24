import { createReducer, on, Action } from '@ngrx/store';
import { BillboardzBillboardsState } from 'src/app/@types/billboardz';
import {
  createBillboard,
  createBillboardSuccess,
  createBillboardType,
  createBillboardTypeSuccess,
  deleteBillboard,
  deleteBillboardSuccess,
  deleteBillboardType,
  deleteBillboardTypeSuccess,
  loadBillboardTypes,
  loadBillboardTypesSuccess,
  loadBillboards,
  loadBillboardsSuccess,
  updateBillboard,
  updateBillboardSuccess,
  updateBillboardType,
  updateBillboardTypeSuccess,
} from '../actions/billboards.actions';
import { error } from '../actions/global.actions';

export const INITIAL_STATE: BillboardzBillboardsState = {
  billboards: [],
  loading: false,
  billboardTypes: [],
  error: '',
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
  on(createBillboardSuccess, (state, { payload }) => {
    console.log('createBillboardSuccess', payload.data['createBillboard']);
    
    return {
      ...state,
      loading: false,
      billboards: [...state.billboards, payload.data['createBillboard']],
    };
  }),
  on(updateBillboard, (state) => state),
  on(updateBillboardSuccess, (state, { payload }) => {
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
  on(deleteBillboard, (state) => state),
  on(deleteBillboardSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      billboards: [
        ...state.billboards.filter(
          (billboard) => billboard.id !== payload.data['deleteBillboard'].id
        ),
      ],
    };
  }),
  on(error, (state, { payload }) => {
    return {
        ...state,
        loading: false,
        error: payload['message']
    };
})
);

export function reducer(
  state: BillboardzBillboardsState | undefined,
  action: Action
) {
  return billboardsReducer(state, action);
}
