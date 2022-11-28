import { Box, CardContent, Chip, Rating, Typography } from '@mui/material';
import { Link, useNavigate } from '@remix-run/react';
import React from 'react';
import { Product } from '~/types/product';

interface ProductCardFooterProps {
  product: Product;
}

const ProductCardFooter: React.FC<ProductCardFooterProps> = ({ product }) => {
  const { category, rating, price } = product;
  const navigate = useNavigate();
  return (
    <CardContent
      sx={(theme) => ({
        ':last-child': {
          paddingBottom: theme.spacing(1),
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
      })}
    >
      <Box display="flex" gap={0.5} mb={0.5}>
        <Chip label={category} variant="outlined" size="small" onClick={() => {navigate(`/products/${category}`)}}/> 
      </Box>
      <Box
        display="flex"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Rating name="read-only" value={rating} readOnly />
        <Typography paragraph variant="h6" color="maroon" mb="0">
          $ {price}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default ProductCardFooter;
