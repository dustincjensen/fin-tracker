import debounce from 'lodash.debounce';
import * as React from 'react';

// https://gist.github.com/nslocum/f147149a243069577a91f5e1beaa5776
export const useWindowWidth = (delay = 300) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    const debouncedHandleResize = debounce(handleResize, delay);
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return width;
};
