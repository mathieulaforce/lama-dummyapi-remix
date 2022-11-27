import React from 'react'; 
import {  Container} from '@mui/material';
 
export const loader = async () => {
    console.log("loading stuff")
  return null;
};

const ProductsPage: React.FC = () => {
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

export default ProductsPage;
