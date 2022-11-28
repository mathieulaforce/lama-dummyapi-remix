import React,{ useState, useEffect, useCallback, useRef } from "react";
 

type useVirtualScrollingProps<T> = {
    totalItemsLoaded : number; 
    startDataFetch: () => void;
    lastResponse: T;
    canLoadMoreData: (data:T | null) => boolean;
}

export const useVirtualScrolling = <T extends object>({totalItemsLoaded, lastResponse, startDataFetch, canLoadMoreData}: useVirtualScrollingProps<T>) => {
 
    const [shouldFetch, setShouldFetch] = useState(true); 
    const [height, setHeight] = useState<number>(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);    

    const containerRef = useCallback(
        (element: {getBoundingClientRect: () => DOMRect}) => { 
          if (element !== null) {
            setHeight(element.getBoundingClientRect().height);
          }
        },
        [totalItemsLoaded]
      ) as any; // TODO is it possible to pass this along without specifying generic type

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
        
        if (!shouldFetch || height < 1) { 
            console.log("stop");
          return;
        }
        if (clientHeight + scrollPosition + 100 < height){ 
            console.log("stop 2");
          return;
        }  
        console.log("try fetch");
        setShouldFetch(false); 
        startDataFetch(); 
      }, [clientHeight, scrollPosition, startDataFetch]);

       useEffect(() => {  
         
        if(height < 1 && !!lastResponse){ 
            return;
        }
         
        if (!canLoadMoreData(lastResponse)) { 
            setShouldFetch(false);
            return;
        } 
        setShouldFetch(true); 

    },[lastResponse, canLoadMoreData])

  return [containerRef, lastResponse];
};