import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';

const severityBorder = (s) => {
    if (s <= 2) return 'border-l-green-500';
    if (s === 3) return 'border-l-yellow-400';
    return 'border-l-red-500';
};

const severityLabel = (s) => {
    if (s <= 2) return { text: 'Low', cls: 'bg-green-500/20 text-green-400' };
    if (s === 3) return { text: 'Med', cls: 'bg-yellow-400/20 text-yellow-300' };
    return { text: 'High', cls: 'bg-red-500/20 text-red-400' };
};

function CrimeListItem({ crime }) {
    const sev = severityLabel(crime.severity);

    return (
        <Link
            to={`/crime-page?id=${crime.id}`}
            className={`flex items-start justify-between gap-3 rounded-lg border-l-4 ${severityBorder(crime.severity)} bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors duration-200`}
        >
            {/* Left: title + type */}
            <div className="flex flex-col gap-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-snug truncate">{crime.title}</p>
                <span className="text-white/40 text-xs uppercase tracking-wide">{crime.type}</span>
            </div>

            {/* Right: date + severity + verified */}
            <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-white/40 text-xs whitespace-nowrap">{crime.date}</span>
                <div className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sev.cls}`}>
                        {sev.text} {crime.severity}/5
                    </span>
                    {crime.is_verified && (
                        <BadgeCheck size={14} className="text-green-400 shrink-0" />
                    )}
                </div>
            </div>
        </Link>
    );
}

export default CrimeListItem;