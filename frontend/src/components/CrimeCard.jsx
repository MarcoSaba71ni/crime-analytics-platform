import { Link } from "react-router-dom";

function CrimeCard({ crime }) {
    return (
        <Link to={`/crime-page?id=${crime.id}`} 
        className="bg-gray-800 text-white rounded-lg mb-4 overflow-hidden flex flex-col">
            {crime.image_url && (
                <img
                    src={crime.image_url}
                    alt={crime.image_alt || crime.title}
                    className="w-full h-40 object-cover"
                />
            )}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-base font-bold leading-snug">{crime.title}</h3>
                    <p className="text-gray-400 text-sm whitespace-nowrap">{crime.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wide text-gray-400">{crime.type}</span>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">Severity {crime.severity}/5</span>
                    {crime.is_verified && (
                        <span className="text-xs bg-blue-700 px-2 py-0.5 rounded-full">Verified</span>
                    )}
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">{crime.description}</p>
            </div>
        </Link>
    );
}

export default CrimeCard;