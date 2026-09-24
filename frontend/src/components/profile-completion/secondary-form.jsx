import { useState } from 'react';
import NeighborhoodSelector from './NeighborhoodSelector';

const CRIME_CATEGORIES = ['Theft', 'Assault', 'Vandalism', 'Drug Offenses', 'Robbery', 'Fraud', 'Other'];
const NOTIFICATION_OPTIONS = ['Email', 'SMS', 'Push Notifications'];

const inputClass = "w-full rounded-lg border border-white/20 bg-[rgba(15,23,42,0.5)] p-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60 transition";

function SecondaryForm() {
    const [homeNeighborhood, setHomeNeighborhood] = useState('');
    const [watchAreas, setWatchAreas] = useState([]);
    const [areaInput, setAreaInput] = useState('');
    const [crimeCategories, setCrimeCategories] = useState([]);
    const [notifications, setNotifications] = useState([]);

    function addArea() {
        const trimmed = areaInput.trim();
        if (trimmed && !watchAreas.includes(trimmed)) {
            setWatchAreas([...watchAreas, trimmed]);
        }
        setAreaInput('');
    }

    function removeArea(area) {
        setWatchAreas(watchAreas.filter(a => a !== area));
    }

    function toggleCategory(cat) {
        setCrimeCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    }

    function toggleNotification(notif) {
        setNotifications(prev =>
            prev.includes(notif) ? prev.filter(n => n !== notif) : [...prev, notif]
        );
    }

    return (
        <form className="flex flex-col gap-5 bg-[var(--color-secondary)]/50 rounded-lg p-4">

            {/* Row 1 — Your Location: two columns */}
            <div className="flex flex-col gap-3">
                <p className="font-redwing text-white/60 text-xs tracking-widest uppercase">Your Location</p>
                <div className="flex gap-4">
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="neighborhood">Home Neighborhood</label>
                        <NeighborhoodSelector
                            id="neighborhood"
                            value={homeNeighborhood}
                            onChange={setHomeNeighborhood}
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="address">
                            Address <span className="text-white/40 text-xs font-sans">(optional)</span>
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Street address"
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>

            <hr className="border-white/10" />

            {/* Row 2 — Watch Areas: full width tag input */}
            <div className="flex flex-col gap-3">
                <p className="font-redwing text-white/60 text-xs tracking-widest uppercase">Your Watch Areas</p>
                <div className="flex flex-col gap-1">
                    <label className="text-white font-redwing" htmlFor="watch-area">Neighborhoods to Monitor</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="watch-area"
                            value={areaInput}
                            onChange={(e) => setAreaInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addArea())}
                            placeholder="e.g. Vasastan"
                            className={inputClass}
                        />
                        <button
                            type="button"
                            onClick={addArea}
                            className="shrink-0 rounded-lg border border-[var(--color-secondary)]/60 bg-[var(--color-secondary)]/20 px-3 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/40 transition font-bold text-lg leading-none"
                        >
                            +
                        </button>
                    </div>
                    {watchAreas.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {watchAreas.map(area => (
                                <span key={area} className="inline-flex items-center gap-1 rounded-full border border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/20 px-3 py-1 text-xs text-white">
                                    {area}
                                    <button
                                        type="button"
                                        onClick={() => removeArea(area)}
                                        className="ml-1 text-white/50 hover:text-white leading-none"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-white/10" />

            {/* Row 3 — Crime Categories | Notification Preferences: two columns */}
            <div className="flex gap-6">
                <div className="flex flex-1 flex-col gap-3">
                    <p className="font-redwing text-white/60 text-xs tracking-widest uppercase">Crime Categories</p>
                    <div className="grid grid-cols-2 gap-2">
                        {CRIME_CATEGORIES.map(cat => (
                            <label key={cat} className="inline-flex items-center gap-2 text-white/90 text-sm cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={crimeCategories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                    className="h-4 w-4 rounded border-white/30 bg-[rgba(15,23,42,0.5)] accent-[var(--color-secondary)]"
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="w-px bg-white/10 self-stretch" />

                <div className="flex flex-1 flex-col gap-3">
                    <p className="font-redwing text-white/60 text-xs tracking-widest uppercase">Notification Preferences</p>
                    <div className="flex flex-col gap-2">
                        {NOTIFICATION_OPTIONS.map(notif => (
                            <label key={notif} className="inline-flex items-center gap-2 text-white/90 text-sm cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={notifications.includes(notif)}
                                    onChange={() => toggleNotification(notif)}
                                    className="h-4 w-4 rounded border-white/30 bg-[rgba(15,23,42,0.5)] accent-[var(--color-secondary)]"
                                />
                                {notif}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

        </form>
    );
}

export default SecondaryForm;
