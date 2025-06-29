import React from 'react';
import { useSEO } from '../hooks/useSEO';

const SEOWrapper = ({ children, seoConfig }) => {
  useSEO(seoConfig);
  return <>{children}</>;
};

export default SEOWrapper;
