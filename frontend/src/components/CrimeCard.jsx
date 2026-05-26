import { Link } from "react-router-dom";
import { Bookmark , BadgeCheck } from "lucide-react";
import CrimeLocationMap from "./CrimeLocationMap";
import {useAuth} from "../context/useAuth";
import { toggleSavedCrime } from "../store/savedSlice";
import { useDispatch , useSelector } from "react-redux";

function CrimeCard({ crime }) {
    const { user, role } = useAuth();
    const isAnalyst = (role ?? user?.role ?? "").toLowerCase() === "analyst";
    const isVerified = Boolean(crime.is_verified);
    const dispatch = useDispatch();
    const savedCrimes = useSelector((state) => state.saved.savedCrimes);
    const isSaved = savedCrimes.some((savedCrime) => savedCrime.id === crime.id);

    function handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleSavedCrime({
            id: crime.id,
            title: crime.title,
            description: crime.description,
            location: crime.location
        }));
    }

    return (
        <Link to={`/crime-page?id=${crime.id}`}
        className="bg-[var(--color-primary)] text-white rounded-lg mb-4 overflow-hidden flex flex-col">
            <div className="relative isolate w-full h-40 overflow-hidden">
                {crime.latitude && crime.longitude ? (
                    <div className="w-full h-full pointer-events-none relative z-0">
                        <CrimeLocationMap lat={crime.latitude} lng={crime.longitude} />
                    </div>
                ) : crime.image_url ? (
                    <img
                        src={`${import.meta.env.VITE_API_URL}/crimes/proxy-image?url=${encodeURIComponent(crime.image_url)}`}
                        alt={crime.image_alt || crime.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/600x160/1e293b/94a3b8?text=No+Image';
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">No location data</span>
                    </div>
                )}

                {isAnalyst && (
                    <button
                        type="button"
                        aria-label="Toggle saved crime"
                        className="absolute top-2 right-2 z-[1200] cursor-pointer px-2 py-1 text-sm rounded shadow-md ring-1 ring-black/10 bg-white text-black transition-colors duration-200"
                        onClick={handleSave}
                    >
                        <Bookmark
                            size={16}
                            strokeWidth={2}
                            className={isSaved ? "text-[var(--color-secondary)]" : "text-black"}
                            fill={isSaved ? "currentColor" : "none"}
                        />
                    </button>
                )}
                <span
                    className={`absolute top-2 ${isAnalyst ? "right-12" : "right-2"} z-[1200] cursor-pointer px-2 py-1 text-sm rounded shadow-md ring-1 ${
                        isVerified
                            ? "bg-green-600 text-white ring-green-800/40"
                            : "bg-white text-black ring-black/10"
                    }`}
                >
                    <BadgeCheck size={16} strokeWidth={2} />
                </span>
                </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-base font-bold leading-snug">{crime.title}</h3>
                    <p className="text-gray-400 text-sm whitespace-nowrap">{crime.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wide text-gray-400">{crime.type}</span>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">Severity {crime.severity}/5</span>
                    {crime.is_verified && (
                        <span className="text-xs bg-green-600 px-2 py-0.5 rounded-full">Verified<span><BadgeCheck size={16} strokeWidth={2} className="inline-block ml-1" /></span></span>
                    )}
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">{crime.description}</p>
            </div>
        </Link>
    );
}

export default CrimeCard;
