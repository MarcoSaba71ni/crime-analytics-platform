import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icons broken by Vite's asset bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function CrimeLocationMap({ lat, lng, interactive = false, height = '160px' }) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height, width: '100%' }}
            dragging={interactive}
            zoomControl={interactive}
            scrollWheelZoom={interactive}
            doubleClickZoom={interactive}
            touchZoom={interactive}
            keyboard={interactive}
            attributionControl={interactive}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={[lat, lng]} />
        </MapContainer>
    );
}

export default CrimeLocationMap;
