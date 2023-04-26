import { AppState } from "../@types/billboardz";

export const selectBillboardTypes = (state: AppState) => state.billboards.billboardTypes;

export const selectCities = (state: AppState) => state.cities.cities;

export const selectSuppliers = (state: AppState) => state.suppliers.suppliers;

export const selectSupplierContacts = (state: AppState) => state.suppliers.supplierContacts;

export const selectBillboards = (state: AppState) => state.billboards.billboards;
