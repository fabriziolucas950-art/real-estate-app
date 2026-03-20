import { create } from 'zustand';

// Simulated DB of properties
const mockProperties = [
  {
    id: '1',
    title: 'Quinta a Estrenar a solo 5 minutos del Centro',
    operation: 'Venta',
    status: 'Destacado',
    price_data: { amount: 185000, currency: 'USD', apto_credito: true, expenses: 15000, impuestos: 5000 },
    location: { city: 'Junín', neighborhood: 'Cerrado Junin', lat: -34.582, lng: -60.945 },
    attributes: { rooms: 3, bedrooms: 3, baths: 3, m2: 170, antiguedad: 0, orientacion: 'Norte', luminosidad: 'Muy Luminoso', estado: 'Excelente', amenities: ['Pileta', 'Parrilla', 'Cochera Doble', 'Seguridad 24hs'] },
    media: [
      { type: 'Foto', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { type: 'Foto', url: 'https://images.unsplash.com/photo-1600607687931-ce8e001c80c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { type: 'Plano', url: 'https://images.unsplash.com/photo-1600607687644-b7156942ce8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' } // Placeholder para plano
    ]
  },
  {
    id: '2',
    title: 'Departamento Moderno Centro',
    operation: 'Alquiler',
    status: 'Disponible',
    price_data: { amount: 450, currency: 'USD', apto_credito: false, expenses: 25000, impuestos: 3000 },
    location: { city: 'Junín', neighborhood: 'Centro', lat: -34.595, lng: -60.948 },
    attributes: { rooms: 2, bedrooms: 1, baths: 1, m2: 55, antiguedad: 5, orientacion: 'Este', luminosidad: 'Normal', estado: 'Excelente', amenities: ['Balcón', 'Gimnasio'] },
    media: [
      { type: 'Foto', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
    ]
  },
  {
    id: '3',
    title: 'Dúplex Minimalista',
    operation: 'Venta',
    status: 'Disponible',
    price_data: { amount: 120000, currency: 'USD', apto_credito: true, expenses: 5000, impuestos: 2000 },
    location: { city: 'Junín', neighborhood: 'Villa Belgrano', lat: -34.600, lng: -60.950 },
    attributes: { rooms: 3, bedrooms: 2, baths: 2, m2: 90, antiguedad: 2, orientacion: 'Sur', luminosidad: 'Muy Luminoso', estado: 'Nuevo', amenities: ['Patio', 'Parrilla'] },
    media: [
      { type: 'Foto', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
    ]
  },
  {
    id: '4',
    title: 'Lote en Barrio Privado',
    operation: 'Venta',
    status: 'Destacado',
    price_data: { amount: 75000, currency: 'USD', apto_credito: false, expenses: 10000, impuestos: 1500 },
    location: { city: 'Junín', neighborhood: 'Costa Verde', lat: -34.610, lng: -60.920 },
    attributes: { rooms: 0, bedrooms: 0, baths: 0, m2: 800, antiguedad: 0, orientacion: null, luminosidad: null, estado: null, amenities: ['Seguridad 24hs', 'Club House'] },
    media: [
      { type: 'Foto', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
    ]
  },
  {
    id: '5',
    title: 'Casa Clásica Reciclada',
    operation: 'Venta',
    status: 'Disponible',
    price_data: { amount: 150000, currency: 'USD', apto_credito: true, expenses: 0, impuestos: 4000 },
    location: { city: 'Junín', neighborhood: 'Pueblo Nuevo', lat: -34.590, lng: -60.960 },
    attributes: { rooms: 4, bedrooms: 3, baths: 2, m2: 140, antiguedad: 20, orientacion: 'Oeste', luminosidad: 'Normal', estado: 'A refaccionar', amenities: ['Garage', 'Jardín'] },
    media: [
      { type: 'Foto', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
    ]
  },
  {
    id: '6',
    title: 'Local Comercial Céntrico',
    operation: 'Alquiler',
    status: 'Disponible',
    price_data: { amount: 800, currency: 'USD', apto_credito: false, expenses: 12000, impuestos: 8000 },
    location: { city: 'Junín', neighborhood: 'Centro', lat: -34.594, lng: -60.947 },
    attributes: { rooms: 1, bedrooms: 0, baths: 1, m2: 120, antiguedad: 10, orientacion: 'Este', luminosidad: 'Bajo', estado: 'Excelente', amenities: ['Vidriera', 'Cortina Metálica'] },
    media: [
      { type: 'Foto', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
    ]
  }
];

export const useStore = create((set, get) => ({
  properties: mockProperties,
  filteredProperties: mockProperties, // initialized with all
  detailedPropertyId: null,

  setDetailedPropertyId: (id) => set({ detailedPropertyId: id }),

  // UI State Configs
  footerSettings: {
    address: 'Av. San Martín 123',
    city: 'Junín',
    province: 'Buenos Aires',
    phone: '+54 9 236 400-0000',
    email: 'contacto@balsells-chilano.com',
    social: {
      instagram: 'https://instagram.com/balsells-chilano',
      facebook: 'https://facebook.com/balsells-chilano',
      linkedin: 'https://linkedin.com/company/balsells-chilano'
    },
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

  getFilteredProperties: (ignoreMapBounds = false) => {
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

      if (!ignoreMapBounds && mapConfig.viewBound && mapConfig.autoUpdate) {
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