import { CardMedia } from '@mui/material';
import React from 'react';

interface ProductCardMediaProps {
  thumbnail: string;
  alt: string;
}

const ProductCardMedia: React.FC<ProductCardMediaProps> = ({
  thumbnail,
  alt,
}) => {
  return (
    <CardMedia
      component="img"
      sx={{
        height: '140px',
        objectFit: 'cover',
        zIndex: 15,
        position: 'relative',
      }}
      image={thumbnail}
      alt={alt}
    />
  );
};

export default ProductCardMedia;
