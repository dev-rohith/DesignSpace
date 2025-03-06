// LocationMap.jsx
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const defaultIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const LocationMap = ({ 
  locations = [], 
  height = "400px",
  width = "100%",
  zoom = 13,
  scrollWheelZoom = true,
  className = ""
}) => {
  const center = locations[0]
    ? [locations[0].latitude, locations[0].longitude]
    : [51.505, -0.09];

  return (
    <div style={{ height, width }} className={className}>
      <MapContainer 
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: "100%", width: "100%", borderRadius: "8px"  }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={defaultIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationMap;