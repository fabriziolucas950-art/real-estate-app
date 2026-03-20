import { create } from 'zustand';

// ANTIGRAVITY-KIT: REACTIVE ENGINE
export const useStore = create((set, get) => ({
  properties: [
    {
      id: '1',
      title: 'Quinta a Estrenar a solo 5 minutos del Centro',
      operation: 'Venta',
      price_data: { amount: 185000, currency: 'USD', expenses: 0, impuestos: 15000, apto_credito: true },
      media: [
        { type: 'Foto', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200' }, 
        { type: 'Foto', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200' }, 
        { type: 'Plano', url: 'https://images.unsplash.com/photo-1600607687931-cebf1daef506?auto=format&fit=crop&q=80&w=1200' },
        { type: 'Video', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'}
      ],
      attributes: { rooms: 5, m2: 170, bedrooms: 3, baths: 3, amenities: ['Piscina', 'Cochera x2'], antiguedad: 0, luminosidad: 'Muy Luminoso', orientacion: 'Norte', estado: 'Excelente' },
      location: { address: 'Ruta 7 Km 260', neighborhood: 'Cerrado Junín', city: 'Junín', lat: -34.585, lng: -60.948 },
      status: 'Disponible'
    },
    {
      id: '2',
      title: 'Departamento Moderno Centro',
      operation: 'Alquiler',
      price_data: { amount: 450, currency: 'USD', expenses: 8000, impuestos: 3000, apto_credito: false },
      media: [{ type: 'Foto', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' }],
      attributes: { rooms: 2, m2: 55, bedrooms: 1, baths: 1, amenities: ['Balcón', 'Sum'], antiguedad: 10, luminosidad: 'Normal', orientacion: 'Este', estado: 'Excelente' },
      location: { address: 'Roque Sáenz Peña 150', neighborhood: 'Centro', city: 'Junín', lat: -34.593, lng: -60.947 },
      status: 'Disponible'
    },
    {
      id: '3',
      title: 'Residencia de Lujo San Ignacio',
      operation: 'Venta',
      price_data: { amount: 320000, currency: 'USD', expenses: 20000, impuestos: 45000, apto_credito: true },
      media: [{ type: 'Foto', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200' }],
      attributes: { rooms: 6, m2: 600, bedrooms: 4, baths: 3, amenities: ['Gym', 'Piscina'], antiguedad: 2, luminosidad: 'Muy Luminoso', orientacion: 'Noreste', estado: 'Nuevo' },
      location: { address: 'Libertad 1200', neighborhood: 'Pueblo Nuevo', city: 'Junín', lat: -34.591, lng: -60.952 },
      status: 'Disponible'
    },
    {
      id: '4',
      title: 'Lote en Club de Campo',
      operation: 'Venta',
      price_data: { amount: 75000, currency: 'USD', expenses: 5000, impuestos: 12000, apto_credito: true },
      media: [{ type: 'Foto', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200' }],
      attributes: { rooms: 0, m2: 800, bedrooms: 0, baths: 0, amenities: ['Seguridad'], antiguedad: 0, luminosidad: 'Muy Luminoso', orientacion: 'Oeste', estado: 'Excelente' },
      location: { address: 'Acceso Pergamino', neighborhood: 'La Pradera', city: 'Junín', lat: -34.610, lng: -60.920 },
      status: 'Disponible'
    },
    {
      id: '5',
      title: 'Local Comercial Céntrico',
      operation: 'Alquiler',
      price_data: { amount: 800, currency: 'USD', expenses: 12000, impuestos: 6000, apto_credito: false },
      media: [{ type: 'Foto', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' }],
      attributes: { rooms: 3, m2: 120, bedrooms: 0, baths: 2, amenities: ['Apto Profesional'], antiguedad: 40, luminosidad: 'Bajo', orientacion: 'Sur', estado: 'A refaccionar' },
      location: { address: 'Rivadavia 100', neighborhood: 'Centro', city: 'Junín', lat: -34.595, lng: -60.945 },
      status: 'Disponible'
    },
    {
      id: '6',
      title: 'Dúplex Minimalista',
      operation: 'Venta',
      price_data: { amount: 110000, currency: 'USD', expenses: 4000, impuestos: 8500, apto_credito: true },
      media: [{ type: 'Foto', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200' }],
      attributes: { rooms: 3, m2: 90, bedrooms: 2, baths: 2, amenities: ['Patio', 'Parrilla'], antiguedad: 5, luminosidad: 'Muy Luminoso', orientacion: 'Norte', estado: 'Excelente' },
      location: { address: 'Primera Junta 500', neighborhood: 'Villa Belgrano', city: 'Junín', lat: -34.580, lng: -60.950 },
      status: 'Disponible'
    }
  ],
  
  // HERO SETTINGS: DYNAMIC TEXT ROTATOR
  heroKeywords: ['hogar', 'departamento', 'proyecto'],
  setHeroKeywords: (keywords) => set({ heroKeywords: keywords }),
  
  footerSettings: {
    featuredCities: ['Junín'],
    featuredRentCategories: ['Departamento', 'Casa'],
    featuredSaleCategories: ['Casa', 'Lote'],
    termsLink: '/legal/terminos',
    privacyLink: '/legal/privacidad'
  },

  updateFooterSettings: (settings) => set((state) => ({
    footerSettings: { ...state.footerSettings, ...settings }
  })),

  getStockStats: () => {
    const properties = get().properties;
    const stats = {
      locations: {},
      rent: {},
      sale: {}
    };

    properties.forEach(p => {
      const city = p.location.city;
      stats.locations[city] = (stats.locations[city] || 0) + 1;
      
      const type = p.attributes.rooms > 0 && p.title.toLowerCase().includes('lote') ? 'Lote' : 
                   p.title.toLowerCase().includes('local') ? 'Local' : 
                   p.title.toLowerCase().includes('departamento') ? 'Departamento' : 'Casa';
      
      const opKey = p.operation === 'Alquiler' ? 'rent' : 'sale';
      stats[opKey][type] = (stats[opKey][type] || 0) + 1;
    });

    return stats;
  },

  filters: {
    location: '',
    priceRange: [0, 1000000],
    bedrooms: 'Todos',
    bathrooms: 'Todos',
    operation: 'Todos',
    propertyType: 'Todos',
    amenities: []
  },
  
  mapConfig: {
    viewBound: null,
    autoUpdate: true,
    center: [-34.593, -60.947], 
    zoom: 13
  },

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  setMapConfig: (config) => set((state) => ({
    mapConfig: { ...state.mapConfig, ...config }
  })),

  getFilteredProperties: () => {
    const { properties, filters, mapConfig } = get();
    return properties.filter(p => {
      if (filters.location && !p.location.city.toLowerCase().includes(filters.location.toLowerCase()) && 
          !p.location.neighborhood.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (p.price_data.amount < filters.priceRange[0] || p.price_data.amount > filters.priceRange[1]) return false;
      if (filters.bedrooms !== 'Todos' && p.attributes.bedrooms < parseInt(filters.bedrooms)) return false;
      if (filters.bathrooms !== 'Todos' && p.attributes.baths < parseInt(filters.bathrooms)) return false;
      if (filters.operation !== 'Todos' && p.operation !== filters.operation) return false;

      if (filters.propertyType !== 'Todos') {
        const type = p.attributes.rooms === 0 && p.title.toLowerCase().includes('lote') ? 'Lote' : 
                     p.title.toLowerCase().includes('local') ? 'Local' : 
                     p.title.toLowerCase().includes('departamento') ? 'Departamento' : 
                     p.title.toLowerCase().includes('quinta') ? 'Quinta' : 'Casa';
        if (type !== filters.propertyType) return false;
      }

      if (filters.amenities && filters.amenities.length > 0) {
        // Must have all selected amenities
        const missing = filters.amenities.find(a => !p.attributes.amenities.map(x => x.toLowerCase()).includes(a.toLowerCase()));
        if (missing) return false;
      }

      if (mapConfig.viewBound && mapConfig.autoUpdate) {
        const { lat, lng } = p.location;
        const [[s, w], [n, e]] = mapConfig.viewBound;
        if (lat < s || lat > n || lng < w || lng > e) return false;
      }
      return true;
    });
  },

  updatePrice: (id, newPrice) => set((state) => ({
    properties: state.properties.map(p => 
      p.id === id ? { ...p, price_data: { ...p.price_data, amount: newPrice } } : p
    )
  })),

  addProperty: (property) => set((state) => ({
    properties: [...state.properties, { ...property, id: Date.now().toString() }]
  }))
}));
