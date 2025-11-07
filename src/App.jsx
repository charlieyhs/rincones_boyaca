import MapaBoyaca from "./components/maps/Mapa"
import './app.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        🌄 Rincones Boyacá
      </header>

      <main className="app-content">
        <MapaBoyaca />
      </main>
    </div>
  );
}

export default App;
