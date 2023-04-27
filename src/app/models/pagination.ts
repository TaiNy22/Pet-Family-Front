export interface Pagination {
  content: any[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: PageSort;
  totalElements: number;
  totalPages: number;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: PageSort;
  unpaged: boolean;
}

export interface PageSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
