// Datos de ejemplo mientras no hay backend. Las empresas son ficticias
// (`demo: true`): la interfaz lo indica y no muestra datos de contacto reales.

export const empresas = [
  {
    id: 'e1',
    nombre: 'Senderos del Occidente (ejemplo)',
    descripcion: 'Operador de ejemplo especializado en caminatas y turismo de naturaleza por el occidente de Boyacá.',
    rnt: null,          // Registro Nacional de Turismo; se verifica antes de publicar
    whatsapp: null,     // Número en formato internacional, p. ej. '573001234567'
    verificada: false,
    demo: true,
  },
  {
    id: 'e2',
    nombre: 'Raíces Boyacenses Tours (ejemplo)',
    descripcion: 'Operador de ejemplo enfocado en patrimonio, cultura y gastronomía de los pueblos boyacenses.',
    rnt: null,
    whatsapp: null,
    verificada: false,
    demo: true,
  },
];

/**
 * Un plan es una lista ordenada de paradas sobre sitios del catálogo
 * (`sitioId` apunta a `sitiosTuristicos`). El orden del arreglo es el
 * orden del recorrido; `dia` agrupa las paradas del itinerario.
 */
export const planes = [
  {
    id: 'p1',
    slug: 'occidente-natural-un-dia',
    titulo: 'Occidente natural en un día',
    empresaId: 'e1',
    resumen: 'Recorrido de un día entre cascadas, miradores y pueblos de montaña, con guía local y almuerzo típico.',
    imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=60',
    duracionDias: 1,
    dificultad: 'Moderada',
    precio: { valor: 120000, moneda: 'COP', unidad: 'por persona' },
    puntoEncuentro: 'Parque principal de Santa Bárbara, 7:00 AM',
    incluye: ['Guía local', 'Transporte durante el recorrido', 'Almuerzo típico', 'Seguro de viaje'],
    noIncluye: ['Entradas a los sitios', 'Gastos personales'],
    paradas: [
      { sitioId: '1', dia: 1, duracion: '1 h', nota: 'Encuentro y recorrido por el casco urbano.' },
      { sitioId: '2', dia: 1, duracion: '3 h', nota: 'Caminata hasta las cascadas y baño en el río.' },
      { sitioId: '4', dia: 1, duracion: '1 h 30 min', nota: 'Atardecer en los miradores.' },
    ],
    demo: true,
  },
  {
    id: 'p2',
    slug: 'pueblos-y-tradiciones-dos-dias',
    titulo: 'Pueblos y tradiciones: fin de semana',
    empresaId: 'e2',
    resumen: 'Dos días para conocer la arquitectura, las artesanías y la cocina de los pueblos de la zona, con noche en hospedaje rural.',
    imagen: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&auto=format&fit=crop&q=60',
    duracionDias: 2,
    dificultad: 'Fácil',
    precio: { valor: 380000, moneda: 'COP', unidad: 'por persona' },
    puntoEncuentro: 'Parque principal de San Martín, 8:00 AM',
    incluye: ['Guía cultural', 'Hospedaje 1 noche', 'Desayuno y almuerzo', 'Taller de artesanías'],
    noIncluye: ['Transporte hasta el punto de encuentro', 'Cena'],
    paradas: [
      { sitioId: '3', dia: 1, duracion: '3 h', nota: 'Tour cultural y taller de artesanías.' },
      { sitioId: '1', dia: 1, duracion: '2 h', nota: 'Recorrido arquitectónico y fotografía.' },
      { sitioId: '4', dia: 2, duracion: '2 h', nota: 'Amanecer en el mirador.' },
      { sitioId: '2', dia: 2, duracion: '3 h', nota: 'Senderismo y avistamiento de aves.' },
    ],
    demo: true,
  },
];
