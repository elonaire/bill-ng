import { Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

const GET_SUPPLIERS = gql`
  {
    getSuppliers {
      id
      name
      email
      address
      vatNumber
    }
  }
`;

const CREATE_SUPPLIER = gql`
  mutation createSupplier($supplier: SupplierInput!) {
    createSupplier(supplier: $supplier) {
      name
      email
      address
      vatNumber
    }
  }
`;

const UPDATE_SUPPLIER = gql`
  mutation updateSupplier($supplier: SupplierInput!) {
    updateSupplier(supplier: $supplier) {
      name
      email
      address
      vatNumber
    }
  }
`;

const DELETE_SUPPLIER = gql`
  mutation deleteSupplier($id: String!) {
    deleteSupplier(id: $id) {
      name
      email
      address
      vatNumber
    }
  }
`;

const GET_SUPPLIER = gql`
  query getSupplier($id: String!) {
    getSupplier(id: $id) {
      name
      email
      address
      vatNumber
      contacts {
        id
        name
        email
        phone
        role
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    apollo.create({
      link: this.httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache()
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
}
