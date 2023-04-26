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
  service: string;
  serviceMethod: string;
  graphQlQuery: string | string[];
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

export type BillboardzState = {
  suppliers: Supplier[];
  loading: boolean;
  supplierContacts: any[];
};

export type ActionPayloadResponse = {
  data: {
    [key: string]: any;
  };
};
