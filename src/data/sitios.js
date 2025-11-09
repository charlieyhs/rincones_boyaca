export const sitiosTuristicos = [
  {
    id: '1',
    nombre: 'Santa Bárbara',
    imagen: 'https://cdn.jsdelivr.net/gh/charlieyhs/rincones_boyaca_imagenes/lugares/santa_barbara.avif',
    descripcion: 'Encantador pueblo colonial ubicado en las montañas de Boyacá, conocido por su arquitectura bien conservada y sus calles empedradas. Un destino perfecto para quienes buscan conectarse con la historia y la naturaleza.',
    ubicacion: 'Santa Bárbara, Boyacá',
    horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    precio: 'Entrada gratuita',
    color: '#4caf50',
    actividades: [
      { id: '1-1', nombre: 'Recorrido arquitectónico' },
      { id: '1-2', nombre: 'Fotografía patrimonial' },
      { id: '1-3', nombre: 'Gastronomía local' },
      { id: '1-4', nombre: 'Caminata ecológica' }
    ],
    galeria: [
      { id: '1-1', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=60' },
      { id: '1-2', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60' },
      { id: '1-3', url: 'https://images.unsplash.com/photo-1464822759844-d62ed8fbf4f4?w=400&auto=format&fit=crop&q=60' },
      { id: '1-4', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=60' }
    ],
    calificacion: 4.7,
    resenas: 128,
    coords: [5.6513754, -74.1571872],
    categoria: 'HISTORICO',
  },
  {
    id: '2',
    nombre: 'Otanche',
    categoria: 'NATURAL',
    imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60',
    descripcion: 'Paraíso natural rodeado de cascadas, ríos cristalinos y bosques exuberantes. Ideal para los amantes del ecoturismo y las actividades al aire libre.',
    ubicacion: 'Otanche, Boyacá',
    horario: 'Todos los días: 7:00 AM - 5:00 PM',
    precio: '$15.000 COP por persona',
    color: '#2196f3',
    actividades: [
      { id: '2-1', nombre: 'Rappel en cascadas' },
      { id: '2-2', nombre: 'Senderismo' },
      { id: '2-3', nombre: 'Avistamiento de aves' },
      { id: '2-4', nombre: 'Camping' },
      { id: '2-5', nombre: 'Natación en ríos' }
    ],
    galeria: [
      { id: '2-1', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=60' },
      { id: '2-2', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60' },
      { id: '2-3', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=crop&q=60' }
    ],
    calificacion: 4.9,
    resenas: 95,
    coords: [5.657778, -74.180556]
  },
  {
    id: '3',
    nombre: 'San Martín',
    categoria: 'COLONIAL',
    imagen: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=60',
    descripcion: 'Pueblo lleno de tradiciones culturales y festividades únicas. Conoce la rica historia y las costumbres ancestrales de esta región boyacense.',
    ubicacion: 'San Martín, Boyacá',
    horario: 'Miércoles a Domingo: 9:00 AM - 5:00 PM',
    precio: '$10.000 COP por persona',
    color: '#ff9800',
    actividades: [
      { id: '3-1', nombre: 'Tour cultural' },
      { id: '3-2', nombre: 'Artesanías locales' },
      { id: '3-3', nombre: 'Festivales tradicionales' },
      { id: '3-4', nombre: 'Gastronomía típica' }
    ],
    galeria: [
      { id: '3-1', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop&q=60' },
      { id: '3-2', url: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&auto=format&fit=crop&q=60' },
      { id: '3-3', url: 'https://images.unsplash.com/photo-1464822759844-d62ed8fbf4f4?w=400&auto=format&fit=crop&q=60' },
      { id: '3-4', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=60' },
      { id: '3-5', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60' }
    ],
    calificacion: 4.5,
    resenas: 76,
    coords: [5.6631272, -74.1256534]
  },
  {
    id: '4',
    nombre: 'Coscuez',
    categoria: 'MONUMENTO',
    imagen: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60',
    descripcion: 'Famosa por sus impresionantes miradores naturales que ofrecen vistas panorámicas de los valles y montañas de Boyacá. Un destino imperdible para los amantes de los paisajes.',
    ubicacion: 'Coscuez, Boyacá',
    horario: 'Todos los días: 6:00 AM - 7:00 PM',
    precio: '$8.000 COP por persona',
    color: '#9c27b0',
    actividades: [
      { id: '4-1', nombre: 'Fotografía de paisajes' },
      { id: '4-2', nombre: 'Amaneceres y atardeceres' },
      { id: '4-3', nombre: 'Caminatas panorámicas' },
      { id: '4-4', nombre: 'Picnic' }
    ],
    galeria: [
      { id: '4-1', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&auto=format&fit=crop&q=60' },
      { id: '4-2', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=crop&q=60' },
      { id: '4-3', url: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&auto=format&fit=crop&q=60' }
    ],
    calificacion: 4.8,
    resenas: 112,
    coords: [5.6260903, -74.1555653]
  },
];