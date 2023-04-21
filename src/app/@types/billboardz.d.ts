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
  }

  export interface RequestParams {
    service: string;
    serviceMethod: string;
    graphQlQuery: string;
  }
  