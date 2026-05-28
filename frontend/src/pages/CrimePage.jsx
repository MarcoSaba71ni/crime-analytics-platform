import { useState , useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, MapPin, Calendar, ShieldAlert, BadgeCheck, BookOpen , Bookmark } from "lucide-react"
import CrimeLocationMap from "../components/CrimeLocationMap"
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedCrime } from "../store/savedSlice";
import { useAuth } from "../context/useAuth";

function getCrimeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function CrimePage() {
    const [crime, setCrime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const role = user ? user.role : null;

    const savedCrimes = useSelector(
        (state) => state.saved.savedCrimes
    );
    const isSaved = savedCrimes.some((savedCrime) => savedCrime.id === crime?.id);

    const crimeId = getCrimeIdFromURL();

    console.log("Crime ID from URL:", crimeId);


    useEffect(() => {

        if (!crimeId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
            return;
        }

        const fetchCrime = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/crimes/${crimeId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    
                }
                const data = await response.json();
                console.log("Fetched crime data:", data);
                setCrime(data);
            } catch (error) {
                console.error("Error fetching crime:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCrime();
    }, [crimeId]);

    const severityColor = (level) => {
        if (level <= 2) return "bg-green-700 text-green-100";
        if (level === 3) return "bg-yellow-600 text-yellow-100";
        return "bg-red-700 text-red-100";
    };

    const handleSaveCrime = () => {
        if (!crime?.id) return;
        dispatch(toggleSavedCrime({
            id: crime.id,
            title: crime.title,
            description: crime.description,
            location: crime.location,
            type: crime.type
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin" />
                    <p className="text-white font-redwing tracking-widest">LOADING...</p>
                </div>
            </div>
        );
    }

    if (error || !crime) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex flex-col items-center justify-center gap-6">
                <ShieldAlert size={48} className="text-[var(--color-secondary)]" />
                <p className="text-white text-xl font-redwing">Crime record not found</p>
                <Link to="/" className="text-[var(--color-secondary)] underline font-redwing hover:opacity-80 transition-opacity">
                    ← BACK TO HOME
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-16 text-white">
            
            {/* Back link */}
            <div className="max-w-4xl mx-auto px-8 pt-12 relative z-10">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-[var(--color-secondary)] font-redwing tracking-widest text-sm hover:opacity-80 transition-opacity"
                >
                    <ArrowLeft size={16} /> BACK TO ALL CRIMES
                </Link>
            </div>

            {/* Location map */}
            {crime.latitude && crime.longitude && (
                <div className="max-w-4xl mx-auto px-8 pt-8 relative z-10">
                    <div className="flex items-center gap-2 text-[var(--color-secondary)] font-redwing tracking-widest text-xs mb-3">
                        <MapPin size={14} />
                        LOCATION
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <CrimeLocationMap lat={crime.latitude} lng={crime.longitude} interactive height="320px" />
                    </div>
                </div>
            )}

            
            {/* Content */}
            <div className="max-w-4xl mx-auto px-8 py-12 relative z-10">
                {/* Title row */}
                <div className="flex flex-col gap-3 mb-8">
                    <div className="flex justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs uppercase tracking-widest text-[var(--color-secondary)] font-redwing border border-[var(--color-secondary)] px-3 py-1 rounded-full">
                                {crime.type}
                            </span>
                            <span className={`text-xs font-redwing px-3 py-1 rounded-full ${severityColor(crime.severity)}`}>
                                Severity {crime.severity}/5
                            </span>
                            {crime.is_verified && (
                                <span className="flex items-center gap-1 text-xs bg-blue-700 px-3 py-1 rounded-full">
                                    <BadgeCheck size={12} /> Verified
                                </span>
                            )}
                        </div> 
                        {role === "analyst" && (
                            <div>
                                <button
                                    type="button"
                                    onClick={handleSaveCrime}
                                    aria-label="Toggle saved crime"
                                    className={`mr-4 cursor-pointer ${isSaved ? "text-[var(--color-secondary)]" : "text-gray-500"}`}
                                >
                                    <Bookmark size={32} fill={isSaved ? "currentColor" : "none"} />
                                </button>
                            </div>                         
                        )}
                    </div>
                    <h1 className="text-4xl font-redwing leading-tight">{crime.title}</h1>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-6 mb-10 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-[var(--color-secondary)]" />
                        <span>{crime.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={15} className="text-[var(--color-secondary)]" />
                        <span>{crime.location}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mb-10" />

                {/* Description */}
                <div className="flex flex-col gap-3 mb-12">
                    <div className="flex items-center gap-2 text-[var(--color-secondary)] font-redwing tracking-widest text-xs">
                        <BookOpen size={14} />
                        DESCRIPTION
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">{crime.description}</p>
                </div>

                {/* Source */}
                {crime.source && (
                    <div className="bg-gray-800 rounded-lg px-6 py-4 flex items-start gap-3">
                        <ShieldAlert size={18} className="text-[var(--color-secondary)] mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs font-redwing text-[var(--color-secondary)] tracking-widest mb-1">SOURCE</p>
                            <p className="text-gray-300 text-sm">{crime.source}</p>
                        </div>
                    </div>
                )}

               
            </div>
        </div>
    )
}
export default CrimePage
