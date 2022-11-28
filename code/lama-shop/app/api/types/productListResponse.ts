import type { ProductResponse } from "./productResponse";

export type ProductListResponse = {
  products: ProductResponse[],
  total: number,
  skip: number,
  limit: number,
  };
   