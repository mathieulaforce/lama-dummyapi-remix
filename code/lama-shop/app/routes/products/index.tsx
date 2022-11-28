import React, { useCallback, useEffect, useState } from 'react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { fetchProducts } from '../../api/product.api';
import ProductGrid from '../../features/products/productGrid';
import { Box, CircularProgress, Container } from '@mui/material';
import { useVirtualScrolling } from '~/hooks/useVirtualScrolling';

type LoaderReturnType = Awaited<ReturnType<typeof fetchProducts>>;

export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url); 
  let skip = url.searchParams.get("skip") || 0;
  let limit = url.searchParams.get("limit") || 12; 
  return json<LoaderReturnType>(await fetchProducts(+skip, +limit));
};

const ProductsPage: React.FC = () => {
  const response = useLoaderData<LoaderReturnType>();
   
  const [data, setData] = useState(response);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [height, setHeight] = useState<number | null>(null);
 
  const fetcher = useFetcher<LoaderReturnType>();
  // Set height of the parent container whenever photos are loaded
  const containerElement = useCallback(
    (node: HTMLElement) => { 
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [data.products?.length]
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

  useEffect(() => { 
    if (fetcher.data && !fetcher.data.products?.length) { 
      setShouldFetch(false);
      return;
    }
 
    if (fetcher.data && fetcher.data.products.length > 0) {
      const newData = fetcher.data;
      newData.products = [...data.products, ...newData.products]
      setData(newData); 
      setShouldFetch(true);
    }

  },[fetcher.data])
 

  // Listen on scrolls. Fire on some self-described breakpoint
  useEffect(() => {
    if (!shouldFetch || !height) {
      return;
    }
    if (clientHeight + scrollPosition + 100 < height){ 
      return;
    } 
    fetcher.load(`/Products?index&skip=${(data.skip)+12}&limit=12`)

    setShouldFetch(false);
  }, [clientHeight, scrollPosition, fetcher]);

 
 
  // const [containerElement] = useVirtualScrolling<typeof response>({
  //     canLoadMoreData : (data) => { 
  //       console.log("can load more?", data)
  //       if(!data){
  //         console.log("nope")
  //         return false;
  //       }
  //       console.log("yes + update")
  //       setData((currentData) => data);
  //       console.log(data);
  //       return true;
  //     },
  //     startDataFetch : () => fetcher.load(`/Products?index&skip=${(data.skip)+12}&limit=12`),
  //     lastResponse : fetcher.data!, 
  //     totalItemsLoaded : data.products.length
  // });

  return (
    <Container>
      <h1>Products</h1>
      <div ref={containerElement}>        
        <ProductGrid products={data.products} />
        <Box display={"flex"} justifyContent="center" my={5}>
          {fetcher.state === "loading" && <CircularProgress />}
        </Box>
      </div>
    </Container>
  );
};

export default ProductsPage;
