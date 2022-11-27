import React, { useCallback, useEffect, useState } from 'react';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { fetchProducts } from '../../api/product.api';
import ProductGrid from '../../features/products/productGrid';
import { Container } from '@mui/material';

type LoaderReturnType = Awaited<ReturnType<typeof fetchProducts>>;

export const loader = async () => {
  return json<LoaderReturnType>(await fetchProducts(0, 12));
};

const ProductsPage: React.FC = () => {
  const data = useLoaderData<LoaderReturnType>();

  const [shouldFetch, setShouldFetch] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [height, setHeight] = useState(null);

  // Set height of the parent container whenever photos are loaded
  const divHeight = useCallback(
    (node: any) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [data.products.length]
  );

  // Add Listeners to scroll and client resize
  useEffect(() => {
    const scrollListener = () => {
      setClientHeight(window.innerHeight);
      setScrollPosition(window.scrollY);
    };
    // Avoid running during SSR
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollListener);
    }

    // Clean up
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', scrollListener);
      }
    };
  }, []);

  // Listen on scrolls. Fire on some self-described breakpoint
  useEffect(() => {
    if (!shouldFetch || !height) return;
    if (clientHeight + scrollPosition + 100 < height) return;
    console.log('SHOULD BE FETCHING!');

    setShouldFetch(false);
  }, [clientHeight, scrollPosition]);

  return (
    <Container>
      <h1>Products</h1>
      <div ref={divHeight}>
        <ProductGrid products={data.products} />
      </div>
    </Container>
  );
};

export default ProductsPage;
