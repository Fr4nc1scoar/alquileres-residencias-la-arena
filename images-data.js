const APARTMENT_IMAGES = [
  {
    id: 1,
    file: "images/vista-panoramica-mar.jpg",
    title: "Vista Panorámica al Mar Caribe",
    category: "vistas",
    room: "exterior",
    caption: "Imponente ventanal de piso a techo con vista directa al mar y Playa Moreno",
    featured: true
  },
  {
    id: 2,
    file: "images/vista-general-social.jpg",
    title: "Área Social Integrada",
    category: "social",
    room: "sala",
    caption: "Concepto abierto moderno: sala, comedor, cocina e isla con vista al mar",
    featured: true
  },
  {
    id: 3,
    file: "images/comedor-vista-mar.jpg",
    title: "Comedor de Diseño Frente al Mar",
    category: "social",
    room: "comedor",
    caption: "Mesa de vidrio templado para 6 personas con Smart TV y vista oceánica",
    featured: true
  },
  {
    id: 4,
    file: "images/cocina-isla.jpg",
    title: "Cocina Gourmet e Isla en Mármol",
    category: "cocina",
    room: "cocina",
    caption: "Isla desayunadora con taburetes modernos y acabados tipo Calacatta",
    featured: true
  },
  {
    id: 5,
    file: "images/habitacion-principal.jpg",
    title: "Suite Principal Matrimonial",
    category: "habitaciones",
    room: "habitacion1",
    caption: "Cama matrimonial queen size, cabecero tapizado, decoración zen y espejo de cuerpo entero",
    featured: true
  },
  {
    id: 6,
    file: "images/bano-1.jpg",
    title: "Baño Completo 1 de Lujo",
    category: "banos",
    room: "bano1",
    caption: "Porcelanato blanco marmoleado, ducha de lluvia, mampara de vidrio templado y espejo táctil LED",
    featured: true
  },
  {
    id: 7,
    file: "images/habitacion-2.jpg",
    title: "Habitación Secundaria (2 Camas)",
    category: "habitaciones",
    room: "habitacion2",
    caption: "Equipada con dos camas individuales confortables, gavetero y Smart TV",
    featured: true
  },
  {
    id: 8,
    file: "images/cocina-moderna.jpg",
    title: "Cocina Totalmente Equipada",
    category: "cocina",
    room: "cocina",
    caption: "Placa de inducción, horno empotrado, microondas, licuadora y cafetera",
    featured: false
  },
  {
    id: 9,
    file: "images/sala-estar.jpg",
    title: "Sala de Estar Confortable",
    category: "social",
    room: "sala",
    caption: "Sofás modulares en tono gris perla, aire acondicionado central y arte moderno",
    featured: false
  },
  {
    id: 10,
    file: "images/bano-2.jpg",
    title: "Baño Completo 2 de Estilo Contemporáneo",
    category: "banos",
    room: "bano2",
    caption: "Acabados en tonos amaderados, nicho iluminado en ducha y grifería de diseño",
    featured: false
  },
  {
    id: 11,
    file: "images/sala-comedor-vista.jpg",
    title: "Sala & Comedor con Luz Natural",
    category: "social",
    room: "sala",
    caption: "Espacio amplio bañado por luz caribeña con vista al horizonte",
    featured: false
  },
  {
    id: 12,
    file: "images/isla-cocina-sala.jpg",
    title: "Isla Central y Perspectiva de Sala",
    category: "cocina",
    room: "cocina",
    caption: "Diseño arquitectónico impecable con persianas enrollables modernas",
    featured: false
  },
  {
    id: 13,
    file: "images/sala-angulo-mar.jpg",
    title: "Ángulo Panorámico de la Sala",
    category: "social",
    room: "sala",
    caption: "Vista directa hacia la bahía de Pampatar y el Hotel Tibisay",
    featured: false
  },
  {
    id: 14,
    file: "images/sala-vista-mar-vertical.jpg",
    title: "Perspectiva Vertical de la Sala",
    category: "social",
    room: "sala",
    caption: "Amplitud y luminosidad garantizada para 6 huéspedes",
    featured: false
  },
  {
    id: 15,
    file: "images/habitacion-principal-2.jpg",
    title: "Detalle Suite Principal",
    category: "habitaciones",
    room: "habitacion1",
    caption: "Ambiente relajante, climatización central y lencería blanca de primera calidad",
    featured: false
  },
  {
    id: 16,
    file: "images/lavandero-tanque.jpg",
    title: "Lavandero Privado & Tanque de 1.000 L",
    category: "servicios",
    room: "servicios",
    caption: "Lavadora-secadora en torre, batea lavadero y tanque vertical de 1.000 litros para agua continua",
    featured: false
  },
  {
    id: 17,
    file: "images/vista-mar-tibisay.jpg",
    title: "Playa Moreno & Hotel Tibisay",
    category: "vistas",
    room: "exterior",
    caption: "La mejor ubicación de Margarita: a pasos del Hotel Tibisay y del mar",
    featured: false
  },
  {
    id: 18,
    file: "images/collage-apartamento.jpg",
    title: "Mosaico Resumen de la Propiedad",
    category: "resumen",
    room: "resumen",
    caption: "Vista general de todos los ambientes del apartamento",
    featured: false
  },
  {
    id: 19,
    file: "images/wifi-qr-code.jpg",
    title: "Acceso WiFi Datalink con QR",
    category: "servicios",
    room: "servicios",
    caption: "Conexión de alta velocidad: Red 'Emi', escaneo directo con cámara móvil",
    featured: false
  },
  {
    id: 20,
    file: "images/normas-piscina.jpg",
    title: "Normas de Uso de la Piscina",
    category: "normas",
    room: "normas",
    caption: "Reglamento oficial del Conjunto Residencial La Arena para el área social y piscina",
    featured: false
  },
  {
    id: 21,
    file: "images/normas-apartamento.jpg",
    title: "Normas del Apartamento y Contactos",
    category: "normas",
    room: "normas",
    caption: "Recomendaciones de cuidado, horario de check-out (12:00 PM) y números de asistencia",
    featured: false
  }
];

if (typeof module !== 'undefined') {
  module.exports = { APARTMENT_IMAGES };
}
