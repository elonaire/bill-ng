import { createReducer, Action, on } from "@ngrx/store";
import { BillboardzSuppliersState } from "src/app/@types/billboardz";
import { loadSupplierContacts, loadSupplierContactsSuccess, loadSuppliers, loadSuppliersSuccess } from "../actions/suppliers.actions";

export const INITIAL_STATE: BillboardzSuppliersState = {
  suppliers: [],
  loading: false,
  supplierContacts: [],
};

const suppliersReducer = createReducer(
  INITIAL_STATE,
  on(loadSuppliers, (state) => state),
  on(loadSuppliersSuccess, (state, { payload }) => {
    
    return {
      ...state,
      loading: false,
      suppliers: payload.data['getSuppliers'],
    };
  }),
  on(loadSupplierContacts, (state) => state),
  on(loadSupplierContactsSuccess, (state, { payload }) => {
    console.log('loadSupplierContactsSuccess', payload);
    return {
      ...state,
      loading: false,
      supplierContacts: payload.data['getSupplierContacts'],
    };
  })
  );

export function reducer(state: BillboardzSuppliersState | undefined, action: Action) {
  return suppliersReducer(state, action);
}
