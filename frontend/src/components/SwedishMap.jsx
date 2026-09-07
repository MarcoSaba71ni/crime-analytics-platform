import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icons broken by Vite's asset bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function SwedishMap({ height = '600px', width = '100%', center = [59.3293, 18.0686], zoom = 12 }) {
    const [crimes, setCrimes] = useState([]);

    useEffect(() => {
        async function fetchCrimes() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/crimes?limit=100`);
                if (!res.ok) return;
                const data = await res.json();
                setCrimes(data.crimes || []);
            } catch {
                // network error â€” map shows empty
            }
        }
        fetchCrimes();
    }, []);

    const pinned = crimes.filter(c => c.latitude != null && c.longitude != null);

    return (
        <MapContainer center={center} zoom={zoom} style={{ height, width }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pinned.map(c => (
                <Marker key={c.id} position={[c.latitude, c.longitude]}>
                    <Popup>
                        <div style={{ minWidth: 160 }}>
                            <p style={{ fontWeight: 700, margin: '0 0 4px' }}>{c.title}</p>
                            <p style={{ color: '#555', margin: '2px 0', fontSize: 12 }}>{c.type} Â· Severity {c.severity}/5</p>
                            <a
                                href={`/crime-page?id=${c.id}`}
                                style={{ color: '#2563eb', fontSize: 12, display: 'inline-block', marginTop: 6 }}
                            >
                                View details â†’
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default SwedishMap;

