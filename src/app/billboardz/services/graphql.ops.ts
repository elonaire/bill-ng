import { gql } from 'apollo-angular';

export const GET_SUPPLIERS = gql`
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

export const CREATE_SUPPLIER = gql`
  mutation createSupplier($supplier: SupplierInput!) {
    createSupplier(supplier: $supplier) {
      name
      email
      address
      vatNumber
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation updateSupplier($supplier: SupplierInput!) {
    updateSupplier(supplier: $supplier) {
      name
      email
      address
      vatNumber
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation deleteSupplier($id: String!) {
    deleteSupplier(id: $id) {
      name
      email
      address
      vatNumber
    }
  }
`;

export const GET_SUPPLIER = gql`
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

export const CREATE_SUPPLIER_CONTACT = gql`
  mutation createSupplierContact(
    $supplierContact: SupplierContactInput!
    $supplierId: String!
    $supplierContactRoleIds: [String!]!
  ) {
    createSupplierContact(
      supplierContact: $supplierContact
      supplierId: $supplierId
      supplierContactRoleIds: $supplierContactRoleIds
    ) {
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

export const UPDATE_SUPPLIER_CONTACT = gql`
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

export const DELETE_SUPPLIER_CONTACT = gql`
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

export const GET_ROLES = gql`
  {
    getSupplierContactRoles {
      id: _id
      role
    }
  }
`;

export const GET_SUPPLIER_CONTACTS = gql`
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

export const GET_BILLBOARD_TYPES = gql`
  {
    getBillboardTypes {
      id
      name
    }
  }
`;

export const CREATE_BILLBOARD_TYPE = gql`
    mutation createBillboardType($billboardType: BillboardTypeInput!) {
        createBillboardType(billboardType: $billboardType) {
            name
        }
    }
`;

export const UPDATE_BILLBOARD_TYPE = gql`
    mutation updateBillboardType($billboardType: BillboardTypeInput!) {
        updateBillboardType(billboardType: $billboardType) {
            name
        }
    }
`;

export const DELETE_BILLBOARD_TYPE = gql`
    mutation deleteBillboardType($id: String!) {
        deleteBillboardType(id: $id) {
            name
        }
    }
`;
