import React from 'react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchProducts } from '../../api/product.api';
import Chip from '@mui/material/Chip';
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Grid,
} from '@mui/material';

type LoaderReturnType = Awaited<ReturnType<typeof fetchProducts>>;

export const loader = async () => {
  return json<LoaderReturnType>(await fetchProducts(0, 10));
};

const ProductsPage: React.FC = () => {
  const data = useLoaderData<LoaderReturnType>();
  return (
    <Container>
      <h1>Products</h1>
      <Grid container gap={1}>
        {data.products.map((product) => {
          return (
            <Grid key={product.id} item xs={3} component={Card}   >
              <CardMedia
                component="img" 
                height="140"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Box display="flex" flexDirection={"column"} flexGrow={1} justifyContent={"space-between"}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>

                  <Box>
                    <Box display="flex" gap={1}>
                      <Chip
                        label={product.category}
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        label={product.brand}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent> 
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default ProductsPage;
