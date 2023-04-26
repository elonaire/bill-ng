import { createAction, props } from "@ngrx/store";
import { ActionPayloadResponse, Supplier } from "src/app/@types/billboardz.d";

export const loadSuppliers = createAction('[Suppliers] Load Suppliers');

export const loadSuppliersSuccess = createAction('[Suppliers] Load Suppliers Success', (payload: ActionPayloadResponse) => ({ payload }));

export const createSupplier = createAction('[Suppliers] Create Supplier', props<{supplier: Supplier}>());

export const createSupplierSuccess = createAction('[Suppliers] Create Supplier Success', (payload: ActionPayloadResponse) => ({ payload }));

export const updateSupplier = createAction('[Suppliers] Update Supplier', props<{supplier: Supplier}>());

export const updateSupplierSuccess = createAction('[Suppliers] Update Supplier Success', (payload: ActionPayloadResponse) => ({ payload }));

export const deleteSupplier = createAction('[Suppliers] Delete Supplier', props<{supplier: Supplier}>());

export const deleteSupplierSuccess = createAction('[Suppliers] Delete Supplier Success', (payload: ActionPayloadResponse) => ({ payload }));

export const loadSupplierContacts = createAction('[Suppliers] Load Supplier Contacts', props<{supplierId: string}>());

export const loadSupplierContactsSuccess = createAction('[Suppliers] Load Supplier Contacts Success', (payload: ActionPayloadResponse) => ({ payload }));
