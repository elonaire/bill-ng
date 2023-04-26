import { createReducer, Action, on } from "@ngrx/store";
import { BillboardzState } from "src/app/@types/billboardz";
import { loadSupplierContacts, loadSupplierContactsSuccess, loadSuppliers, loadSuppliersSuccess } from "../actions/suppliers.actions";

export const INITIAL_STATE: BillboardzState = {
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
      loading: true,
      suppliers: payload.data['getSuppliers'],
    };
  }),
  on(loadSupplierContacts, (state) => state),
  on(loadSupplierContactsSuccess, (state, { payload }) => {
    console.log('loadSupplierContactsSuccess', payload);
    return {
      ...state,
      loading: true,
      supplierContacts: payload.data['getSupplierContacts'],
    };
  })
  );

export function reducer(state: BillboardzState | undefined, action: Action) {
  return suppliersReducer(state, action);
}
