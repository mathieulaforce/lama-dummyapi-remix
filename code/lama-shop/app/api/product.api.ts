import type { ProductListResponse } from './types/productListResponse';

export const fetchProducts = async (offset: number, limit: number) => {
    const res = await fetch(
        `https://dummyjson.com/products?offset=${offset}limit=${limit}`
      );
      const fetchResult: ProductListResponse = await res.json(); 
      return fetchResult;
}