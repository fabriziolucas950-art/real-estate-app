import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import MortgageCalculator from '../components/public/MortgageCalculator';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    setProperty(data);
  };

  if (!property) return <div className="p-12 text-center text-muted">Cargando...</div>;

  return (
    <motion.div 
      className="container py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <img src={property.image_url} alt={property.title} className="w-full h-[500px] object-cover rounded-2xl mb-8" />
          <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
          <p className="text-2xl text-accent font-semibold mb-6">${property.price.toLocaleString()}</p>
          <div className="prose prose-invert max-w-none">
            {property.description}
          </div>
        </div>
        <div className="space-y-8">
          <div className="glass-morphism p-6">
            <h3 className="text-xl font-bold mb-4">Calculadora Hipotecaria</h3>
            <MortgageCalculator price={property.price} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;
