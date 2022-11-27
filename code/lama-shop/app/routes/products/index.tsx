import React from 'react';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { fetchProducts } from '../../api/product.api'; 
import ProductGrid from '../../features/products/productGrid';
import {  Container} from '@mui/material';

type LoaderReturnType = Awaited<ReturnType<typeof fetchProducts>>;

export const loader = async () => {
  return json<LoaderReturnType>(await fetchProducts(0, 12));
};

const ProductsPage: React.FC = () => {
  const data = useLoaderData<LoaderReturnType>();
  return (
    <Container>
      <h1>Products</h1>   
      <ProductGrid products={data.products} /> 
    </Container>
  );
};

export default ProductsPage;
