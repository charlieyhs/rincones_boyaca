import Mapa from "./components/maps/Mapa"
import './app.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        Rincones Boyacá
        <p style={{ 
          fontSize: '0.9rem', 
          fontWeight: 'normal', 
          marginTop: '0.5rem',
          opacity: 0.9 
        }}>
          Descubre la belleza de nuestros paisajes
        </p>
      </header>

      <main className="app-content">
        <Mapa />
      </main>
    </div>
  );
}

export default App;
