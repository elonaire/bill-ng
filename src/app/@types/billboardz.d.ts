export interface TableColumn {
  name: string;
  prop: string;
  isSortable: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  address: string;
  vatNumber: string;
}

export interface GenericTableConfigs {
  tableName: string;
  columns: TableColumn[];
  forcedChangeVal?: any;
  showSearch?: boolean;
  showExport: boolean;
  showImport: boolean;
  showDelete: boolean;
  wrapInCard?: boolean;
  requestParams: RequestParams;
  graphQLOpType?: GraphQLOpType;
}

export interface RequestParams {
  storeSelector: StoreSelectors;
}

export enum GraphQLOpType {
  QUERY = 'query',
  MUTATION = 'mutation',
}

export enum MutationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type BillboardzSuppliersState = {
  suppliers: Supplier[];
  loading: boolean;
  supplierContacts: any[];
  error: string;
};

export type ActionPayloadResponse = {
  data: {
    [key: string]: any;
  };
};

export type BillboardzBillboardsState = {
  billboards: any[];
  loading: boolean;
  billboardTypes: any[];
  error: string;
};

export type BillboardzCitiesState = {
  cities: any[];
  loading: boolean;
  error: string;
};

export type BillboardzUserState = {
  user: any;
  loading: boolean;
  token: string;
  error: string;
};

export enum StoreSelectors {
  SUPPLIERS = 'selectSuppliers',
  BILLBOARDS = 'selectBillboards',
  SUPPLIER_CONTACTS = 'selectSupplierContacts',
  BILLBOARD_TYPES = 'selectBillboardTypes',
  CITIES = 'selectCities',
}

export type AppState = {
  suppliers: BillboardzSuppliersState;
  billboards: BillboardzBillboardsState;
  cities: BillboardzCitiesState;
  user: BillboardzUserState;
};
