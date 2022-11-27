import React from 'react';   
import { 
  Grid,
} from '@mui/material';
import type { Product } from '~/types/product';
import ProductCard from '../productCard';


interface ProductGridProps {
    products: Product[]
};

const ProductGrid:React.FC<ProductGridProps> = (props) => {
    return  <Grid container spacing={2}>
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
          <ProductCard product={product} />
           
        </Grid>
      );
    })}
  </Grid>
    ;
};

export default ProductGrid;