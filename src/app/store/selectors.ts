import { AppState } from "../@types/billboardz";

export const selectBillboardTypes = (state: AppState) => state.billboards.billboardTypes;

export const selectCities = (state: AppState) => state.cities.cities;

export const selectSuppliers = (state: AppState) => state.suppliers.suppliers;

export const selectSupplierContacts = (state: AppState) => state.suppliers.supplierContacts;

export const selectBillboards = (state: AppState) => {
    console.log('selectBillboards', state.billboards.billboards);
    
    const modified = state.billboards.billboards.map((billboard) => {
        const billboardCopy = { ...billboard };
        billboardCopy['supplierName'] = billboardCopy.supplier?.name;
        billboardCopy['cityName'] = billboardCopy.city?.name;
        billboardCopy['billboardTypeName'] = billboardCopy.type?.name;
        billboardCopy['formattedAddress'] = billboardCopy.address?.formattedAddress;
        return billboardCopy;
    });

    return modified;
};

export const selectUser = (state: AppState) => state.user;
