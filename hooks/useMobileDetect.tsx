import { useState, useEffect } from 'react';

const useIsMobile = (size: number = 1280): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= size);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size]);

  return isMobile;
};

export default useIsMobile;
