import { Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  GET_SUPPLIERS,
  CREATE_SUPPLIER,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
  GET_SUPPLIER,
  CREATE_SUPPLIER_CONTACT,
  UPDATE_SUPPLIER_CONTACT,
  DELETE_SUPPLIER_CONTACT,
  GET_ROLES,
  GET_SUPPLIER_CONTACTS,
  GET_BILLBOARD_TYPES,
  CREATE_BILLBOARD_TYPE,
  UPDATE_BILLBOARD_TYPE,
  DELETE_BILLBOARD_TYPE,
  GET_CITIES,
  CREATE_CITY,
  UPDATE_CITY,
  DELETE_CITY,
  GET_BILLBOARDS,
  CREATE_BILLBOARD,
  DELETE_BILLBOARD,
  UPDATE_BILLBOARD,
} from './graphql.ops';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo, private httpLink: HttpLink, private http: HttpClient) {
    apollo.create({
      link: this.httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache(),
    });
  }

  getSuppliers() {
    return this.apollo.query({
      query: GET_SUPPLIERS,
    });
  }

  createSupplier(supplier: any) {
    return this.apollo.mutate({
      mutation: CREATE_SUPPLIER,
      variables: {
        supplier,
      },
    });
  }

  updateSupplier(supplier: any) {
    return this.apollo.mutate({
      mutation: UPDATE_SUPPLIER,
      variables: {
        supplier,
      },
    });
  }

  deleteSupplier(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_SUPPLIER,
      variables: {
        id,
      },
    });
  }

  getSupplier(id: string) {
    return this.apollo.query({
      query: GET_SUPPLIER,
      variables: {
        id,
      },
    });
  }

  createSupplierContact(
    supplierContact: any,
    supplierId: string,
    supplierContactRoleIds: string[]
  ) {
    return this.apollo.mutate({
      mutation: CREATE_SUPPLIER_CONTACT,
      variables: {
        supplierContact,
        supplierId,
        supplierContactRoleIds,
      },
    });
  }

  updateSupplierContact(supplierContact: any) {
    return this.apollo.mutate({
      mutation: UPDATE_SUPPLIER_CONTACT,
      variables: {
        supplierContact,
      },
    });
  }

  deleteSupplierContact(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_SUPPLIER_CONTACT,
      variables: {
        id,
      },
    });
  }

  getRoles() {
    return this.apollo.query({
      query: GET_ROLES,
    });
  }

  getSupplierContacts(supplierId: string) {
    return this.apollo.query({
      query: GET_SUPPLIER_CONTACTS,
      variables: {
        supplierId,
      },
    });
  }

  getBillboardTypes() {
    return this.apollo.query({
      query: GET_BILLBOARD_TYPES,
    });
  }

  createBillboardType(billboardType: any) {
    return this.apollo.mutate({
      mutation: CREATE_BILLBOARD_TYPE,
      variables: {
        billboardType,
      },
    });
  }

  updateBillboardType(billboardType: any) {
    return this.apollo.mutate({
      mutation: UPDATE_BILLBOARD_TYPE,
      variables: {
        billboardType,
      },
    });
  }

  deleteBillboardType(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_BILLBOARD_TYPE,
      variables: {
        id,
      },
    });
  }

  /* Cities */
  getCities() {
    return this.apollo.query({
      query: GET_CITIES,
    });
  }

  createCity(city: any) {
    return this.apollo.mutate({
      mutation: CREATE_CITY,
      variables: {
        city,
      },
    });
  }

  updateCity(city: any) {
    return this.apollo.mutate({
      mutation: UPDATE_CITY,
      variables: {
        city,
      },
    });
  }

  deleteCity(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_CITY,
      variables: {
        id,
      },
    });
  }

  /* Google Maps */
  getCitiesWithinRadius(radius: number, lat: number, lng: number) {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=locality&location=${lat},${lng}&key=AIzaSyBi2bAqDJmx3gLWUyB3M7UwShJurO4hEDs&radius=${radius}`
    );
  }

  /* Billboards */
  getBillboards() {
    return this.apollo.query({
      query: GET_BILLBOARDS
    });
  }

  createBillboard(billboard: any) {
    return this.apollo.mutate({
      mutation: CREATE_BILLBOARD,
      variables: {
        billboard,
      },
    });
  }

  deleteBillboard(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_BILLBOARD,
      variables: {
        id,
      },
    });
  }

  updateBillboard(billboard: any) {
    return this.apollo.mutate({
      mutation: UPDATE_BILLBOARD,
      variables: {
        billboard,
      },
    });
  }

  getSelectedPlaceDetails(placeId: string) {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=adr_address,address_components,formatted_address,vicinity&key=AIzaSyBi2bAqDJmx3gLWUyB3M7UwShJurO4hEDs`
    );
  }

  uploadCSV(file: FormData) {
    return this.http.post('http://localhost:3000/file-upload/upload', file);
  }
}
