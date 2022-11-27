import React from 'react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { fetchProduct } from '../../../../api/product.api';
import { Container, Typography } from '@mui/material';
import Carrousel from '~/components/carrousel/carrousel';

type LoaderReturnType = Awaited<ReturnType<typeof fetchProduct>>;

export const loader: LoaderFunction = async ({ params }) => {
 
  if (params.productId && !Number.isNaN(Number(params.productId))) {
    return json<LoaderReturnType>(await fetchProduct(+params.productId));
  }

  throw new Error();
};

const ProductsPage: React.FC = () => {
  const product = useLoaderData<LoaderReturnType>();
  return (
    <Container>
      <h1>{product.title}</h1>
      <Carrousel steps={product.images.filter(img => img !== product.thumbnail).map((img, index) => ({
        content: <img src={img} alt={`${product.title} ${index +1}`}/>,
        id: img,
        label: img
      }))} startingIndex={0} />
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
    </Container>
  );
};

export default ProductsPage;
