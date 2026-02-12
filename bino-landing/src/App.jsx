import { useState } from "react";
import MapView from "./MapView";
import "./index.css";
import axios from 'axios';

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState(null);

  const handleSearch = async () => {
    if (!location) {
      alert("Need your location to search nearby places!");
      return;
    }
    const { lat, lng } = location;

    const res = await axios.post("http://localhost:8080/backend/nominatim/search", {
            query: query,
            lat: lat,
            lng: lng
    });
    console.log(res.data)
    setResults(res.data);
  };

  const askLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => alert("Location access denied. Can't search nearby places.")
    );
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <h1>
           Find it with <span className="highlight">Bino</span>
        </h1>
        <p>Bino is your WhatsApp bot to instantly discover products and services around you.</p>
        {!location && (
          <button className="btn-primary" onClick={askLocation}>
             Share my location
          </button>
        )}
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for bakery, mango, charger..."
        />
        <button className="btn-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Results + Map */}
      <div className="content">
        <ul className="results">
          {results.map((r, i) => (
            <li key={i}>
              <strong>{r.display_name}</strong>
              <br />
              <span className="coords">({r.lat}, {r.lng})</span>
            </li>
          ))}
        </ul>
        <div className="map-container">
          <MapView center={location} results={results} />
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/+919800081110"
        target="_blank"
        rel="noreferrer"
        className="btn-whatsapp"
      >
         Try Bino on WhatsApp
      </a>

      <footer className="footer">
        Built with ❤️
      </footer>
    </div>
  );
}

export default App;
