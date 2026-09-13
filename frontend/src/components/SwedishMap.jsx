import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default marker icons broken by Vite's asset bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function BoundsTracker({ onBoundsChange }) {
    const map = useMapEvents({
        moveend: () => onBoundsChange(map.getBounds()),
        zoomend: () => onBoundsChange(map.getBounds()),
    });

    useEffect(() => {
        onBoundsChange(map.getBounds());
    }, [map, onBoundsChange]);

    return null;
}

function SwedishMap({ crimes = [], onBoundsChange, height = '600px', width = '100%', center = [59.3293, 18.0686], zoom = 12 }) {
    const pinned = crimes.filter(c => c.latitude != null && c.longitude != null);

    return (
        <MapContainer center={center} zoom={zoom} style={{ height, width }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {onBoundsChange && <BoundsTracker onBoundsChange={onBoundsChange} />}
            {pinned.map(c => (
                <Marker key={c.id} position={[c.latitude, c.longitude]}>
                    <Popup>
                        <div style={{ minWidth: 160 }}>
                            <p style={{ fontWeight: 700, margin: '0 0 4px' }}>{c.title}</p>
                            <p style={{ color: '#555', margin: '2px 0', fontSize: 12 }}>{c.type} · Severity {c.severity}/5</p>
                            <Link
                                to={`/crime-page?id=${c.id}`}
                                style={{ color: '#2563eb', fontSize: 12, display: 'inline-block', marginTop: 6 }}
                            >
                                View details &rarr;
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default SwedishMap;