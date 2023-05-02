import { createAction, props } from "@ngrx/store";
import { ActionPayloadResponse, Supplier } from "src/app/@types/billboardz.d";

export const loadSuppliers = createAction('[Suppliers] Load Suppliers');

export const loadSuppliersSuccess = createAction('[Suppliers] Load Suppliers Success', (payload: ActionPayloadResponse) => ({ payload }));

export const createSupplier = createAction('[Suppliers] Create Supplier', props<{supplier: Supplier}>());

export const createSupplierSuccess = createAction('[Suppliers] Create Supplier Success', (payload: ActionPayloadResponse) => ({ payload }));

export const updateSupplier = createAction('[Suppliers] Update Supplier', props<{supplier: Supplier}>());

export const updateSupplierSuccess = createAction('[Suppliers] Update Supplier Success', (payload: ActionPayloadResponse) => ({ payload }));

export const deleteSupplier = createAction('[Suppliers] Delete Supplier', props<{supplierId: string}>());

export const deleteSupplierSuccess = createAction('[Suppliers] Delete Supplier Success', (payload: ActionPayloadResponse) => ({ payload }));

export const loadSupplierContacts = createAction('[Suppliers] Load Supplier Contacts', props<{supplierId: string}>());

export const loadSupplierContactsSuccess = createAction('[Suppliers] Load Supplier Contacts Success', (payload: ActionPayloadResponse) => ({ payload }));

export const createSupplierContact = createAction('[Suppliers] Create Supplier Contact', props<{supplierId: string, supplierContact: any, supplierContactRoleIds: string[]}>());

export const createSupplierContactSuccess = createAction('[Suppliers] Create Supplier Contact Success', (payload: ActionPayloadResponse) => ({ payload }));

export const updateSupplierContact = createAction('[Suppliers] Update Supplier Contact', props<{supplierContact: any}>());

export const updateSupplierContactSuccess = createAction('[Suppliers] Update Supplier Contact Success', (payload: ActionPayloadResponse) => ({ payload }));

export const deleteSupplierContact = createAction('[Suppliers] Delete Supplier Contact', props<{supplierContactId: string}>());

export const deleteSupplierContactSuccess = createAction('[Suppliers] Delete Supplier Contact Success', (payload: ActionPayloadResponse) => ({ payload }));
