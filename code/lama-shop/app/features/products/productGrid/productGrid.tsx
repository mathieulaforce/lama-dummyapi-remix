import React from 'react';
import { Box, Grid, Grow, NoSsr } from '@mui/material';
import type { Product } from '~/types/product';
import ProductCard from '../productCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = (props) => {
  if (!props.products?.length) {
    return <>Nothing</>;
  }

  return (
    <Grid container spacing={2}>
      {props.products.map((product) => {
        return (
          <Grid
            key={product.id}
            item
            xs={12}
            sm={6}
            md={4}
            xl={3}
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          > 
            <Grow in timeout={1000}>
              <Box sx={{height: "100%"}}>
              <ProductCard product={product}  />
              </Box>
            </Grow> 
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductGrid;
