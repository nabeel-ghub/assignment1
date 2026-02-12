import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ center, results }) {
  const defaultPos = [20.5937, 78.9629]; // India center
  const pos = center ? [center.lat, center.lon] : defaultPos;

  return (
    <MapContainer center={pos} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {results.map((r, i) => (
        <Marker key={i} position={[r.lat, r.lon]}>
          <Popup>{r.display_name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
