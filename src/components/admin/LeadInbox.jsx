import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Phone, Calendar, Inbox } from 'lucide-react';

const LeadInbox = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*, properties(title)')
        .order('created_at', { ascending: false });
      
      if (error) console.error(error);
      else setLeads(data);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Consultas Recibidas</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {leads.map(lead => (
          <div key={lead.id} className="glass-card" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', alignItems: 'start', gap: '2rem' }}>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.125rem' }}>{lead.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                <Mail size={14} /> {lead.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <Phone size={14} /> {lead.phone || 'N/A'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Consulta por: {lead.properties?.title || 'Propiedad Eliminada'}
              </div>
              <p style={{ fontSize: '0.925rem' }}>"{lead.message}"</p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', justifyContent: 'flex-end' }}>
                <Calendar size={14} /> {new Date(lead.created_at).toLocaleDateString()}
              </div>
              <button style={{ marginTop: '1rem', fontSize: '0.75rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white' }}>
                Marcar como Contactado
              </button>
            </div>
          </div>
        ))}

        {leads.length === 0 && !loading && (
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay consultas nuevas.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadInbox;
