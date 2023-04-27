import { createReducer, on, Action } from "@ngrx/store";
import { BillboardzBillboardsState } from "src/app/@types/billboardz";
import { loadBillboardTypes, loadBillboardTypesSuccess, loadBillboards, loadBillboardsSuccess } from "../actions/billboards.actions";

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
    );
  
  export function reducer(state: BillboardzBillboardsState | undefined, action: Action) {
    return billboardsReducer(state, action);
  }