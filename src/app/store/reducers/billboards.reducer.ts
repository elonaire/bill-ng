import { createReducer, on, Action } from "@ngrx/store";
import { BillboardzBillboardsState } from "src/app/@types/billboardz";
import { loadBillboardTypes, loadBillboardTypesSuccess } from "../actions/billboards.actions";

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
        suppliers: payload.data['getBillboardTypes'],
      };
    }),
    );
  
  export function reducer(state: BillboardzBillboardsState | undefined, action: Action) {
    return billboardsReducer(state, action);
  }