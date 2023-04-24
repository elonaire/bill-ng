import { Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
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
} from './graphql.ops';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
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
}
