import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

const InventoryManager = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (data) setProperties(data);
  };

  const deleteProperty = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta propiedad?')) {
      await supabase.from('properties').delete().eq('id', id);
      fetchProperties();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gestión de Inventario</h2>
        <Link to="/admin/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Nueva Propiedad
        </Link>
      </div>

      <div className="glass-morphism overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-secondary/50 border-b border-glass-border">
            <tr>
              <th className="p-4">Propiedad</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.id} className="border-b border-glass-border/50 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4 text-accent">${p.price.toLocaleString()}</td>
                <td className="p-4"><span className="px-2 py-1 bg-success/20 text-success rounded text-xs">Activo</span></td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <Link to={`/admin/edit/${p.id}`} className="text-muted hover:text-white"><Edit size={18} /></Link>
                    <button onClick={() => deleteProperty(p.id)} className="text-muted hover:text-red-400"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManager;
