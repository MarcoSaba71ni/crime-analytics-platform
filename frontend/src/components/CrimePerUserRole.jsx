import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrimeLocationMap from "./CrimeLocationMap";
import { useSelector } from "react-redux";

function truncateText(text, limit) {
    if (!text) return "";
    if (text.length <= limit) return text;
    return `${text.slice(0, limit).trim()}...`;
}

function CrimePerUserRole() {

    const [reporterLoading, setReporterLoading] = useState(true);
    const [reportedCrimes, setReportedCrimes] = useState([]);
    const { role , user } = useAuth();
    const userId = user ? user.id : null;

    const savedCrimes = useSelector((state) => state.saved.savedCrimes);

    useEffect(() => {
        async function fetchReporterCrimes() {
            if (role !== "crime_reporter" || !userId) {
                setReportedCrimes([]);
                setReporterLoading(false);
                return;
            }

            setReporterLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/crimes?reporter_id=${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch crimes");
                }

                const data = await response.json();
                // Backend returns a paginated payload: { total, page, limit, crimes }.
                const crimes = Array.isArray(data?.crimes) ? data.crimes : [];
                setReportedCrimes(crimes);
            } catch (error) {
                console.error(error);
                setReportedCrimes([]);
            } finally {
                setReporterLoading(false);
            }
        }

        fetchReporterCrimes();
    }, [role, userId]);


    return (
        <div>
            {role === "analyst" && (
                <div className="w-2/3 flex flex-col items-start justify-start">
                    <h2 className="text-3xl font-bold  mt-4 text-white text-start items-top">SAVED LIST</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4 w-full">
                        {savedCrimes.map((crime) => (
                            <div key={crime.id} className="w-full bg-[var(--color-primary)] rounded-md p-4 mt-4 flex flex-col items-start text-left">
                                <div className="w-full">
                                    {crime.latitude && crime.longitude ? (
                                        <div className="w-full h-40 mb-4">
                                            <CrimeLocationMap lat={crime.latitude} lng={crime.longitude} />
                                        </div>
                                    ) : null}
                                    <Link to={`/crime-page?id=${crime.id}`}>
                                        <h3 className="text-md font-redwing text-white leading-snug break-words">
                                            {truncateText(crime.title, 55)}
                                        </h3>
                                    </Link>
                                    <p className="text-xs text-white leading-relaxed break-words mt-2">
                                        {truncateText(crime.description, 150)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {savedCrimes.length === 0 && (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full min-h-56 flex items-center justify-center text-center mt-4">
                                <p className="text-lg font-redwing text-white">No saved crimes yet.</p>
                            </div>
                        )}                                
                    </div>

                </div>
            )}
            {role === "crime_reporter" && (
                <div className="w-2/3 flex flex-col items-start justify-start">
                    <h2 className="text-3xl font-bold  mt-4 text-white text-start items-top">REPORTED CRIMES</h2>
                    {reporterLoading && (
                        <p className="px-4 mt-4 text-sm font-redwing text-white">Loading reported crimes...</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4 w-full">
                        {reportedCrimes.map((crime) => (
                            <div key={crime.id} className="w-full bg-[var(--color-primary)] rounded-md p-4 mt-4 flex flex-col items-start text-left">
                                <div className="w-full">
                                    {crime.latitude && crime.longitude ? (
                                        <div className="w-full h-40 mb-4">
                                            <CrimeLocationMap lat={crime.latitude} lng={crime.longitude} />
                                        </div>
                                    ) : null}
                                    <Link to={`/crime-page?id=${crime.id}`}>
                                        <h3 className="text-md font-redwing text-white leading-snug break-words">
                                            {truncateText(crime.title, 55)}
                                        </h3>
                                    </Link>
                                    <p className="text-xs text-white leading-relaxed break-words mt-2">
                                        {truncateText(crime.description, 150)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {reportedCrimes.length === 0 && (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full min-h-56 flex items-center justify-center text-center mt-4">
                                <p className="text-lg font-redwing text-white">No reported crimes yet.</p>
                            </div>
                        )}                                
                    </div>

                </div>
            )}            
        </div>

    )
}
export default CrimePerUserRole;