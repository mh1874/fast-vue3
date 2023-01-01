declare global {
  interface PageQuery {
    page: number;
    rows: number;
  }

  interface PageResult<T> {
    list: T;
    total: number;
  }
}

export {};
