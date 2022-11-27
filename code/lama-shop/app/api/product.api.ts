import type { ProductListResponse } from './types/productListResponse';
import type{ ProductResponse } from './types/productResponse';

export const fetchProducts = async (skip: number, limit: number) => {
    const res = await fetch(
        `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
      );
      const fetchResult: ProductListResponse = await res.json(); 
      return fetchResult;
}

export const fetchProductsByCategory = async (skip: number, limit: number, category: string) => {
  const res = await fetch(
      `https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${limit}`
    );
    const fetchResult: ProductListResponse = await res.json(); 
    return fetchResult;
}
 
export const fetchProduct = async (id: number) => {
  const res = await fetch(
      `https://dummyjson.com/products/${id}`
    );
    const fetchResult: ProductResponse = await res.json(); 
    return fetchResult;
}