import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([document.documentElement.clientWidth, document.documentElement.clientHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export default useWindowSize;
