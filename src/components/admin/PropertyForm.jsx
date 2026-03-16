import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useEffect } from 'react';

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    const { data } = await supabase.from('properties').select('*').eq('id', id).single();
    if (data) reset(data);
  };

  const onSubmit = async (data) => {
    if (id) {
      await supabase.from('properties').update(data).eq('id', id);
    } else {
      await supabase.from('properties').insert([data]);
    }
    navigate('/admin');
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-8">{id ? 'Editar Propiedad' : 'Nueva Propiedad'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-morphism p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm text-muted mb-2">Título</label>
            <input {...register('title')} className="w-full bg-secondary/50 border border-glass-border rounded-lg p-3" />
          </div>
          <div>
            <label className="block text-sm text-muted mb-2">Precio</label>
            <input type="number" {...register('price')} className="w-full bg-secondary/50 border border-glass-border rounded-lg p-3" />
          </div>
          <div>
            <label className="block text-sm text-muted mb-2">Imagen URL</label>
            <input {...register('image_url')} className="w-full bg-secondary/50 border border-glass-border rounded-lg p-3" />
          </div>
        </div>
        <button type="submit" className="w-full btn-primary py-4">Guardar Propiedad</button>
      </form>
    </div>
  );
};

export default PropertyForm;
