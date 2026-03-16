import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Phone, Calendar } from 'lucide-react';

const LeadInbox = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Bandeja de Leads</h2>
      <div className="grid gap-6">
        {leads.map(lead => (
          <div key={lead.id} className="glass-morphism p-6 flex justify-between items-start">
            <div className="space-y-2">
              <h4 className="text-xl font-bold">{lead.name}</h4>
              <div className="flex gap-4 text-sm text-muted">
                <span className="flex items-center gap-1"><Mail size={16} /> {lead.email}</span>
                <span className="flex items-center gap-1"><Phone size={16} /> {lead.phone}</span>
              </div>
              <p className="text-sm mt-4 italic">"{lead.message}"</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted block mb-2 flex items-center gap-1">
                <Calendar size={12} /> {new Date(lead.created_at).toLocaleDateString()}
              </span>
              <button className="text-accent text-sm font-semibold hover:underline">Responder</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadInbox;
