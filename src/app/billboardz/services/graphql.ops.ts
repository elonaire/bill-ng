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
      id
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
      id
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
      id
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

/* Billboards Types */

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
      id
      name
    }
  }
`;

export const UPDATE_BILLBOARD_TYPE = gql`
  mutation updateBillboardType($billboardType: BillboardTypeInput!) {
    updateBillboardType(billboardType: $billboardType) {
      id
      name
    }
  }
`;

export const DELETE_BILLBOARD_TYPE = gql`
  mutation deleteBillboardType($id: String!) {
    deleteBillboardType(id: $id) {
      id
      name
    }
  }
`;

/* Cities */

export const CREATE_CITY = gql`
  mutation createCity($city: CityInput!) {
    createCity(city: $city) {
      id
      name
      population
      men
      women
      area
      socio_economy
      license_holders
    }
  }
`;

export const UPDATE_CITY = gql`
  mutation updateCity($city: CityInput!) {
    updateCity(city: $city) {
      id
      name
      population
      men
      women
      area
      socio_economy
      license_holders
    }
  }
`;

export const DELETE_CITY = gql`
  mutation deleteCity($id: String!) {
    deleteCity(id: $id) {
      id
      name
      population
      men
      women
      area
      socio_economy
      license_holders
    }
  }
`;

export const GET_CITIES = gql`
  {
    getCities {
      id
      name
      population
      men
      women
      area
      socio_economy
      license_holders
    }
  }
`;

/* Billboards */

export const CREATE_BILLBOARD = gql`
  mutation createBillboard($billboard: BillboardInput!) {
    createBillboard(billboard: $billboard) {
      id
      type {
        id
        name
      }
      city {
        id
        name
      }
      address {
        longitude
        latitude
      }
      billboardNumber
      totalSize
      supplier {
        id
        name
      }
      width
      height
      subType
      side
      premiumDescription
      orientation
      isActive
      price
      views
      rotation
      images {
        id: _id
        fieldname
        originalname
        encoding
        mimetype
        destination
        filename
        path
        size
      }
    }
  }
`;

export const UPDATE_BILLBOARD = gql`
  mutation updateBillboard($billboard: BillboardInput!) {
    updateBillboard(billboard: $billboard) {
      id
      type {
        id
        name
      }
      city {
        id
        name
      }
      address {
        longitude
        latitude
      }
      billboardNumber
      totalSize
      supplier {
        id
        name
      }
      width
      height
      subType
      side
      premiumDescription
      orientation
      isActive
      price
      views
      rotation
      images {
        id: _id
        fieldname
        originalname
        encoding
        mimetype
        destination
        filename
        path
        size
      }
    }
  }
`;

export const DELETE_BILLBOARD = gql`
  mutation deleteBillboard($id: String!) {
    deleteBillboard(id: $id) {
      id
      type {
        id
        name
      }
      city {
        id
        name
      }
      address {
        longitude
        latitude
      }
      billboardNumber
      totalSize
      supplier {
        id
        name
      }
    }
  }
`;

export const GET_BILLBOARDS = gql`
  {
    getBillboards {
      id
      type {
        id
        name
      }
      city {
        id
        name
      }
      address {
        longitude
        latitude
        formattedAddress
        neighborhood
      }
      billboardNumber
      totalSize
      supplier {
        id
        name
      }
      width
      height
      subType
      side
      premiumDescription
      orientation
      isActive
      price
      views
      rotation
      images {
        id: _id
        fieldname
        originalname
        encoding
        mimetype
        destination
        filename
        path
        size
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
