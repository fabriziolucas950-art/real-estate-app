import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Maximize, Bed, Bath, MessageCircle, ArrowLeft, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import MortgageCalculator from '../components/public/MortgageCalculator';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) console.error(error);
      else setProperty(data);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>Cargando...</div>;
  if (!property) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>Propiedad no encontrada.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="container" 
      style={{ padding: '6rem 1.5rem' }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={20} /> Volver al listado
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
        <section>
          {/* Main Image Slider Placeholder */}
          <div className="glass-card" style={{ height: '500px', overflow: 'hidden', marginBottom: '2rem' }}>
            <img 
              src={property.images?.[0]} 
              alt={property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>{property.title}</h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
              <MapPin /> {property.location}
            </p>
          </div>

          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '3rem' }}>
            {property.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Maximize size={24} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>{property.m2} m²</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Superficie</div>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Bed size={24} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>{property.rooms}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Ambientes</div>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Bath size={24} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>{property.bathrooms}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Baños</div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="glass-card" style={{ height: '400px', background: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} color="var(--text-muted)" />
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Google Maps Integration Placeholder</p>
            </div>
          </div>
        </section>

        <aside>
          <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '7rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--accent)' }}>Precio de {property.operation_type}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>USD {property.price.toLocaleString()}</h2>
              {property.expenses > 0 && (
                <p style={{ color: 'var(--text-muted)' }}>+ Expensas: ${property.expenses.toLocaleString()}</p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontWeight: '700' }}>Consultar por esta propiedad</h3>
              <input type="text" placeholder="Tu Nombre" className="search-input" />
              <input type="email" placeholder="Tu Email" className="search-input" />
              <textarea placeholder="Hola, me gustaría recibir más información..." className="search-input" style={{ minHeight: '120px', resize: 'none' }}></textarea>
              <button className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Enviar Consulta</button>
            </div>

            <a 
              href={`https://wa.me/5491100000000?text=Hola! Me interesa la propiedad: ${property.title}`} 
              className="glass-card"
              style={{ 
                marginTop: '1.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem', 
                padding: '1rem', 
                background: '#25D366', 
                color: 'white',
                fontWeight: '700',
                border: 'none'
              }}
            >
              <MessageCircle size={20} /> Contactar por WhatsApp
            </a>

            {property.operation_type === 'Venta' && (
              <MortgageCalculator price={property.price} />
            )}
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;
