# Rincones Boyacá

Mapa interactivo para descubrir sitios turísticos de Boyacá (Colombia). Muestra los lugares sobre un mapa con marcadores por categoría, permite filtrarlos y buscarlos, y cambiar a una vista de lista con tarjetas. Cada sitio abre una ficha con descripción, actividades, galería, horario, precio y calificación.

🔗 **Demo:** https://charlieyhs.github.io/rincones_boyaca/

## Funcionalidades

- **Mapa interactivo** con [Leaflet](https://leafletjs.com/) y tres estilos de capa: satélite (Esri), mapa (OSM Humanitarian) y suave (CARTO).
- **Marcadores por categoría**: Histórico, Monumento, Colonial y Natural, cada una con su color y leyenda.
- **Filtros** por texto (nombre, descripción, ubicación; sin distinguir tildes ni mayúsculas) y por categoría.
- **Vista mapa / lista**, con un switch en móvil y botones en escritorio.
- **Ficha del sitio** en un diálogo (pantalla completa en pantallas pequeñas), con **Ver en mapa** para centrar el sitio y **Cómo llegar** para abrir la ruta en Google Maps o Waze.
- **Mi ubicación**: centra el mapa en la posición del usuario (geolocalización del navegador).
- **Diseño responsive**: en dispositivos táctiles el marcador abre directamente la ficha; en escritorio muestra un popup previo.

## Tecnologías

| Área | Herramienta |
| --- | --- |
| UI | React 19 |
| Componentes | MUI 7 (Material UI) + Emotion |
| Mapas | Leaflet 1.9 + React Leaflet 5 |
| Build | Vite (rolldown-vite) |
| Calidad | ESLint 9 |

## Requisitos

- Node.js 20.19+ o 22.12+ (lo que exige Vite 7)
- npm

## Primeros pasos

```bash
git clone https://github.com/charlieyhs/rincones_boyaca.git
cd rincones_boyaca
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173/rincones_boyaca/`.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción en la carpeta `dist/` |
| `npm run preview` | Sirve localmente el build de producción |
| `npm run lint` | Ejecuta ESLint |

## Estructura del proyecto

```
src/
├── App.jsx                     # Layout principal (header + mapa)
├── main.jsx                    # Punto de entrada, tema de MUI
├── constants.js                # Constantes globales (colores)
├── data/
│   └── sitios.js               # Catálogo de sitios turísticos
├── context/                    # Contexto de filtros
├── providers/                  # MapFiltersProvider: estado y lógica de filtrado
├── hooks/                      # useMapFilters
├── utils/
│   ├── mapsUtil.js             # Colores por categoría e íconos SVG de marcadores
│   └── texto.js                # Recorte de textos y normalización para búsquedas
└── components/maps/
    ├── Mapa.jsx                # Contenedor: cabecera, filtros, vista mapa/lista
    ├── MapView.jsx             # Mapa Leaflet, capas y marcadores
    ├── EnfocarSitio.jsx        # Centra el mapa en un sitio ("Ver en mapa")
    ├── MapFilters.jsx          # Panel lateral de filtros
    ├── MapFooter.jsx           # Leyenda, selector de capa y botón de ubicación
    ├── CartasLugares.jsx       # Vista de lista (tarjetas)
    ├── PopupCard.jsx           # Popup del marcador (escritorio)
    ├── MarcadoresVisibles.jsx  # Ajusta el zoom para mostrar los sitios filtrados
    ├── UbicacionActual.jsx     # Centra el mapa en la ubicación del usuario
    ├── dialogs/
    │   ├── DialogInfoSitio.jsx # Diálogo de la ficha y sus acciones
    │   ├── InfoSitio.jsx       # Contenido de la ficha del sitio
    │   └── ComoLlegar.jsx      # Enlaces de ruta a Google Maps y Waze
    └── toggle/ViewMode.jsx     # Switch mapa/lista en móvil
```

## Agregar un sitio turístico

Los sitios están en [`src/data/sitios.js`](src/data/sitios.js). Para añadir uno, agrega un objeto al arreglo `sitiosTuristicos`:

```js
{
  id: '5',
  nombre: 'Nombre del lugar',
  categoria: 'NATURAL',            // HISTORICO | MONUMENTO | COLONIAL | NATURAL
  imagen: 'https://...',           // imagen principal
  descripcion: 'Descripción del lugar...',
  ubicacion: 'Municipio, Boyacá',
  horario: 'Todos los días: 8:00 AM - 5:00 PM',
  precio: 'Entrada gratuita',
  actividades: [{ id: '5-1', nombre: 'Senderismo' }],
  galeria: [{ id: '5-1', url: 'https://...' }],
  calificacion: 4.5,
  resenas: 10,
  coords: [5.65, -74.15],          // [latitud, longitud]
}
```

El color de cada sitio sale de su categoría. Las categorías y sus colores se definen en [`src/utils/mapsUtil.js`](src/utils/mapsUtil.js).

## Despliegue

La app se publica en **GitHub Pages** con GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. Cada push a `main` (o una ejecución manual del workflow) instala dependencias, corre `npm run lint` y `npm run build`.
2. El contenido de `dist/` se sube como artefacto y se despliega en Pages.
3. `vite.config.js` usa `base: "/rincones_boyaca/"`, que coincide con la ruta del repositorio en Pages.

La carpeta `dist/` no se versiona. En *Settings → Pages* el origen debe ser **GitHub Actions**.

## Créditos

- Teselas de mapa: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors, Humanitarian OpenStreetMap Team, © CARTO, © Esri.
- Algunas fotografías de ejemplo provienen de [Unsplash](https://unsplash.com/).
