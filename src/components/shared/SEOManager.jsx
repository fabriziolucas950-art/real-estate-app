import React, { useEffect } from 'react';

const SEOManager = ({ property }) => {
  useEffect(() => {
    if (property) {
      document.title = `${property.title} | LUXREALTY - ${property.location}`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${property.operation_type} ${property.title} en ${property.location}. ${property.description.substring(0, 150)}...`);
      }
    } else {
      document.title = 'LUXREALTY | Inmobiliaria de Selección';
    }
  }, [property]);

  return null;
};

export default SEOManager;
