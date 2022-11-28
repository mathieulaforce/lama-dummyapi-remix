import { CardContent, Typography } from '@mui/material';
import React from 'react';

interface ProductCardContentProps {
    title:string;
    description: string;
};

const ProductCardContent:React.FC<ProductCardContentProps> = ({title, description}) => {
    return     <CardContent sx={{ paddingBottom: 0 }}>
    <Typography gutterBottom variant="h5" component="div">
      {title}
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      overflow="hidden"
      sx={{
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
      }}
    >
      {description}
    </Typography>
  </CardContent>;
};

export default ProductCardContent;