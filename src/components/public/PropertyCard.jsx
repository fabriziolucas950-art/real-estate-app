import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="glass-morphism overflow-hidden group border-glass-border hover:border-accent/40 transition-colors"
    >
      <Link to={`/property/${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img src={property.image_url} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-4 right-4 glass-morphism px-3 py-1 text-sm font-bold">
            ${property.price.toLocaleString()}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold">{property.title}</h3>
          <p className="text-muted text-sm line-clamp-2">{property.description}</p>
          <div className="flex justify-between text-muted border-t border-glass-border pt-4">
            <span className="flex items-center gap-2"><Bed size={18} /> {property.beds}</span>
            <span className="flex items-center gap-2"><Bath size={18} /> {property.baths}</span>
            <span className="flex items-center gap-2"><Square size={18} /> {property.sqft} m²</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
