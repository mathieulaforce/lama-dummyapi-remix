import React from 'react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData, useParams } from '@remix-run/react';
import { fetchProductsByCategory } from '../../../api/product.api';
import { Container } from '@mui/material';
import ProductGrid from '~/features/products/productGrid';

type LoaderReturnType = Awaited<ReturnType<typeof fetchProductsByCategory>>;

export const loader: LoaderFunction = async ({ params }) => {
  if (params.category) {
    return json<LoaderReturnType>(await fetchProductsByCategory(0, 12, params.category));
  }

  throw new Error();
};

const ProductsPage: React.FC = () => {
  const data = useLoaderData<LoaderReturnType>();
  const category = useParams().category;
  return (
    <Container>
      <h1>Products - {category}</h1> 
      <Outlet />
      <ProductGrid products={data.products} /> 
    </Container>
  );
};

export default ProductsPage;
