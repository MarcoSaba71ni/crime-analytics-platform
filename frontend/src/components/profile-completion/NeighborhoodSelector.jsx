import { STOCKHOLM_NEIGHBORHOODS } from '../../data/stockholm-neighborhoods';

const selectClass =
    'w-full rounded-lg border border-white/20 bg-[rgba(15,23,42,0.5)] p-2.5 text-white ' +
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60 transition';

/**
 * Controlled neighborhood selector scoped to Stockholm districts.
 *
 * Props:
 *   id        – html id for the <select> (default: 'neighborhood')
 *   value     – currently selected neighborhood string ('' = unselected)
 *   onChange  – (neighborhoodString: string) => void
 */
function NeighborhoodSelector({ id = 'neighborhood', value = '', onChange }) {
    return (
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={selectClass}
        >
            <option value="">Select neighborhood</option>
            {STOCKHOLM_NEIGHBORHOODS.map((name) => (
                <option key={name} value={name}>
                    {name}
                </option>
            ))}
        </select>
    );
}

export default NeighborhoodSelector;
