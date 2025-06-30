export interface Bill {
  bill: {
    billNo: string;
    billYear: string;
    billType: string;
    billTypeURI: string;
    shortTitleEn: string;
    shortTitleGa: string;
    longTitleEn: string;
    longTitleGa: string;
    status: string;
    statusURI: string;
    source: string;
    sourceURI: string;
    method: string;
    methodURI: string;
    originHouse: {
      showAs: string;
      uri: string;
    };
    originHouseURI: string;
    sponsors: Sponsor[];
    lastUpdated: string;
    uri: string;
  };
}

export interface Sponsor {
  sponsor: {
    by: {
      showAs: string;
      uri: string;
    };
    as: {
      showAs: string | null;
      uri: string | null;
    };
    isPrimary: boolean;
  };
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedBillsResponse {
  data: Bill[];
  pagination: PaginationInfo;
  meta: {
    counts?: {
      billCount?: number;
    };
  };
}
