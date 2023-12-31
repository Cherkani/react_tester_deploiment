import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const Preline = () => {
  const location = useLocation();

  useEffect(() => {
    import('preline/preline');
  }, []);

  useEffect(() => {
   
  }, [location.pathname]);

  return <></>;
};

export default Preline;
