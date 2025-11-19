import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { VERDE_BOYACA } from './constants.js';

const theme = createTheme({
    palette:{
        success: {
          main: VERDE_BOYACA,
        }
    },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </StrictMode>,
)
