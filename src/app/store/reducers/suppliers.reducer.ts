import { createReducer, Action, on } from '@ngrx/store';
import { BillboardzSuppliersState } from 'src/app/@types/billboardz';
import {
  createSupplier,
  createSupplierContact,
  createSupplierContactSuccess,
  createSupplierSuccess,
  deleteSupplier,
  deleteSupplierContact,
  deleteSupplierContactSuccess,
  deleteSupplierSuccess,
  loadSupplierContacts,
  loadSupplierContactsSuccess,
  loadSuppliers,
  loadSuppliersSuccess,
  updateSupplier,
  updateSupplierContact,
  updateSupplierContactSuccess,
  updateSupplierSuccess,
} from '../actions/suppliers.actions';
import { error } from '../actions/global.actions';

export const INITIAL_STATE: BillboardzSuppliersState = {
  suppliers: [],
  loading: false,
  supplierContacts: [],
  error: '',
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
  }),
  on(createSupplier, (state) => state),
  on(createSupplierSuccess, (state, { payload }) => {
    console.log('createSupplierSuccess', payload);
    return {
      ...state,
      loading: false,
      suppliers: [...state.suppliers, payload.data['createSupplier']],
    };
  }),
  on(updateSupplier, (state) => state),
  on(updateSupplierSuccess, (state, { payload }) => {
    console.log('updateSupplierSuccess', payload);
    return {
      ...state,
      loading: false,
      suppliers: state.suppliers.map((supplier) => {
        if (supplier.id === payload.data['updateSupplier'].id) {
          return payload.data['updateSupplier'];
        }
        return supplier;
      }),
    };
  }),
  on(deleteSupplier, (state) => state),
  on(deleteSupplierSuccess, (state, { payload }) => {
    console.log('deleteSupplierSuccess', payload);
    return {
      ...state,
      loading: false,
      suppliers: state.suppliers.filter(
        (supplier) => supplier.id !== payload.data['deleteSupplier'].id
      ),
    };
  }),
  on(createSupplierContact, (state) => state),
  on(createSupplierContactSuccess, (state, { payload }) => {
    console.log('createSupplierContactSuccess', payload);
    return {
      ...state,
      loading: false,
      supplierContacts: [
        ...state.supplierContacts,
        payload.data['createSupplierContact'],
      ],
    };
  }),
  on(updateSupplierContact, (state) => state),
  on(updateSupplierContactSuccess, (state, { payload }) => {
    console.log('updateSupplierContactSuccess', payload);
    return {
      ...state,
      loading: false,
      supplierContacts: state.supplierContacts.map((supplierContact) => {
        if (supplierContact.id === payload.data['updateSupplierContact'].id) {
          return payload.data['updateSupplierContact'];
        }
        return supplierContact;
      }),
    };
  }),
  on(deleteSupplierContact, (state) => state),
  on(deleteSupplierContactSuccess, (state, { payload }) => {
    console.log('deleteSupplierContactSuccess', payload);
    return {
      ...state,
      loading: false,
      supplierContacts: state.supplierContacts.filter(
        (supplierContact) => supplierContact.id !== payload.data['deleteSupplierContact'].id
      ),
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
  state: BillboardzSuppliersState | undefined,
  action: Action
) {
  return suppliersReducer(state, action);
}
