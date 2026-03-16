const Filters = () => {
  return (
    <div className="glass-morphism p-6 space-y-6">
      <h3 className="text-xl font-bold">Filtros</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted block mb-2">Precio de Venta</label>
          <input type="range" className="w-full accent-accent" />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>$0</span>
            <span>$5M+</span>
          </div>
        </div>
        <div>
          <label className="text-sm text-muted block mb-2">Tipo de Propiedad</label>
          <select className="w-full bg-secondary/50 border border-glass-border rounded-lg p-2 text-sm">
            <option>Todas</option>
            <option>Casas</option>
            <option>Departamentos</option>
            <option>Lotes</option>
          </select>
        </div>
      </div>
      <button className="w-full btn-primary mt-4">Aplicar Filtros</button>
    </div>
  );
};

export default Filters;
