import React from 'react';
import { Card } from '@mui/material';
import type { Product } from '~/types/product';
import ProductCardMedia from './components/productCardMedia';
import ProductCardContent from './components/productCardContent';
import ProductCardFooter from './components/productCardFooter';
import { Link } from '@remix-run/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Link
        to={`/products/${product.category}/${product.id}`}
        style={{
          display: 'flex',
          flexGrow: 1,
          alignSelf: 'stretch',
          flexDirection: 'column',
          textDecoration: 'none',
        }}
      >
        <ProductCardMedia thumbnail={product.thumbnail} alt={product.title}  />
      </Link>
      <Link
        to={`/products/${product.category}/${product.id}`}
        style={{
          color: 'inherit',
          outline: 0,
          cursor: 'pointer',
          display: 'flex',
          flexGrow: 1,
          alignSelf: 'stretch',
          flexDirection: 'column',
          textDecoration: 'none',
        }}
      > 
        <ProductCardContent
          title={product.title}
          description={product.description}
        />
      </Link>

      <ProductCardFooter product={product} />
    </Card>
  );
};

export default ProductCard;
