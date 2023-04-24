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
  query getSupplierById($id: String!) {
    getSupplierById(id: $id) {
      name
      email
      address
      vatNumber
      contacts {
        id: _id
        name
        email
        phone
        role {
          id: _id
          role
        }
      }
    }
  }
`;

const CREATE_SUPPLIER_CONTACT = gql`
  mutation createSupplierContact($supplierContact: SupplierContactInput!, $supplierId: String!, $supplierContactRoleIds: [String!]!) {
    createSupplierContact(supplierContact: $supplierContact, supplierId: $supplierId, supplierContactRoleIds: $supplierContactRoleIds) {
      id: _id
      name
      email
      phone
      role {
        id: _id
        role
      }
    }
  }
`;

const UPDATE_SUPPLIER_CONTACT = gql`
  mutation updateSupplierContact($supplierContact: SupplierContactInput!) {
    updateSupplierContact(supplierContact: $supplierContact) {
      id: _id
      name
      email
      phone
      role {
        id: _id
        role
      }
    }
  }
`;

const DELETE_SUPPLIER_CONTACT = gql`
  mutation deleteSupplierContact($id: String!) {
    deleteSupplierContact(id: $id) {
      id: _id
      name
      email
      phone
      role {
        id: _id
        role
      }
    }
  }
`;

const GET_ROLES = gql`
  {
    getSupplierContactRoles {
      id: _id
      role
    }
  }
`;

const GET_SUPPLIER_CONTACTS = gql`
  query getSupplierContacts($supplierId: String!) {
    getSupplierContacts(supplierId: $supplierId) {
      id: _id
      name
      email
      phone
      role {
        id: _id
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

  createSupplierContact(supplierContact: any, supplierId: string, supplierContactRoleIds: string[]) {
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
}
