import { useState } from 'react';
import { useAuth } from '../context/useAuth.jsx';

function ReportingForm({ onClose }) {

    const [ title, setTitle ] = useState('');
    const [ type, setType ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ severity, setSeverity ] = useState('');
    const [ date, setDate ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
    const [ source, setSource ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ imageAlt, setImageAlt ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ fieldErrors, setFieldErrors ] = useState({});
    const { token } = useAuth();


    function getFieldClass(fieldName) {
        const hasError = Boolean(fieldErrors[fieldName]);

        return `w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] ${hasError ? 'border-red-400 bg-red-500/15' : 'border-white/25 bg-white/10'}`;
    }

    function clearFieldError(fieldName) {
        setFieldErrors((currentErrors) => {
            if (!currentErrors[fieldName]) {
                return currentErrors;
            }

            return {
                ...currentErrors,
                [fieldName]: false,
            };
        });

        if (error) {
            setError(null);
        }
    }

    function validateFields() {
        const nextFieldErrors = {
            title: !title.trim(),
            type: !type.trim(),
            description: !description.trim(),
            severity: !severity,
            date: !date,
            location: !location.trim(),
            latitude: !latitude.trim(),
            longitude: !longitude.trim(),
            source: !source.trim(),
            imageUrl: false,
            imageAlt: false,
        };

        setFieldErrors(nextFieldErrors);

        return Object.values(nextFieldErrors).some(Boolean);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (validateFields()) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        const incidentDetails = {
            title,
            type,
            description,
            severity: severity ? Number(severity) : undefined,
            date,
            location,
            latitude: latitude ? Number(latitude) : undefined,
            longitude: longitude ? Number(longitude) : undefined,
            source: source || undefined,
            image_url: imageUrl || undefined,
            image_alt: imageAlt || undefined,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/crimes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(incidentDetails)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Failed to submit report');
            }

            const data = await response.json();
            console.log('Report submitted successfully:', data);
            setFieldErrors({});
            onClose();
        } catch (err) {
            console.error('Error submitting report:', err);
            setError('An error occurred while submitting the report. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-6 rounded-2xl border border-white/20 bg-gradient-to-br from-[var(--color-primary)] via-[#0a2f5f] to-[var(--color-primary)] p-6 shadow-2xl ring-1 ring-white/15 sm:p-8">
            <div className="border-b border-white/20 pb-4 flex justify-between items-start">
                <div>
                    <h3 className="font-redwing text-2xl text-white">Incident Details</h3>
                    <p className="mt-1 text-sm text-white/75">Complete all key fields for a higher-quality report and faster verification.</p>                       
                </div>
                <div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-1  text-lg text-[var(--color-primary)] transition-transform duration-300 ease-in-out hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
                    >
                        Close
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-title" className="mb-2 block text-sm font-semibold tracking-wide text-white">Title</label>
                    <input
                        id="crime-title"
                        type="text"
                        placeholder="Brief title of the crime"
                        className={getFieldClass('title')}
                        aria-invalid={Boolean(fieldErrors.title)}
                        value={title}
                        onFocus={() => clearFieldError('title')}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            clearFieldError('title');
                        }}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-type" className="mb-2 block text-sm font-semibold tracking-wide text-white">Type</label>
                    <input
                        id="crime-type"
                        type="text"
                        placeholder="e.g., Theft, Assault"
                        className={getFieldClass('type')}
                        aria-invalid={Boolean(fieldErrors.type)}
                        value={type}
                        onFocus={() => clearFieldError('type')}
                        onChange={(e) => {
                            setType(e.target.value);
                            clearFieldError('type');
                        }}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:col-span-2">
                    <label htmlFor="crime-description" className="mb-2 block text-sm font-semibold tracking-wide text-white">Description</label>
                    <textarea
                        id="crime-description"
                        rows="4"
                        placeholder="Describe what happened, who was affected, and any notable context"
                        className={getFieldClass('description')}
                        aria-invalid={Boolean(fieldErrors.description)}
                        value={description}
                        onFocus={() => clearFieldError('description')}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            clearFieldError('description');
                        }}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-severity" className="mb-2 block text-sm font-semibold tracking-wide text-white">Severity</label>
                    <select
                        id="crime-severity"
                        value={severity}
                        onFocus={() => clearFieldError('severity')}
                        onChange={(e) => {
                            setSeverity(e.target.value);
                            clearFieldError('severity');
                        }}
                        className={getFieldClass('severity')}
                        aria-invalid={Boolean(fieldErrors.severity)}
                    >
                        <option className='text-black' value="" disabled>Select severity (1-5)</option>
                        <option className='text-black' value="1">1 - Very Low</option>
                        <option className='text-black' value="2">2 - Low</option>
                        <option className='text-black' value="3">3 - Medium</option>
                        <option className='text-black' value="4">4 - High</option>
                        <option className='text-black' value="5">5 - Critical</option>
                    </select>
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-date" className="mb-2 block text-sm font-semibold tracking-wide text-white">Date</label>
                    <input
                        id="crime-date"
                        type="date"
                        value={date}
                        onFocus={() => clearFieldError('date')}
                        onChange={(e) => {
                            setDate(e.target.value);
                            clearFieldError('date');
                        }}
                        className={getFieldClass('date')}
                        aria-invalid={Boolean(fieldErrors.date)}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:col-span-2">
                    <label htmlFor="crime-location" className="mb-2 block text-sm font-semibold tracking-wide text-white">Location</label>
                    <input
                        id="crime-location"
                        type="text"
                        placeholder="Street, district, or landmark"
                        value={location}
                        onFocus={() => clearFieldError('location')}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            clearFieldError('location');
                        }}
                        className={getFieldClass('location')}
                        aria-invalid={Boolean(fieldErrors.location)}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-latitude" className="mb-2 block text-sm font-semibold tracking-wide text-white">Latitude</label>
                    <input
                        id="crime-latitude"
                        type="number"
                        step="any"
                        inputMode="decimal"
                        placeholder="59.3293"
                        value={latitude}
                        onFocus={() => clearFieldError('latitude')}
                        onChange={(e) => {
                            setLatitude(e.target.value);
                            clearFieldError('latitude');
                        }}
                        className={getFieldClass('latitude')}
                        aria-invalid={Boolean(fieldErrors.latitude)}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-longitude" className="mb-2 block text-sm font-semibold tracking-wide text-white">Longitude</label>
                    <input
                        id="crime-longitude"
                        type="number"
                        step="any"
                        inputMode="decimal"
                        placeholder="18.0686"
                        value={longitude}
                        onFocus={() => clearFieldError('longitude')}
                        onChange={(e) => {
                            setLongitude(e.target.value);
                            clearFieldError('longitude');
                        }}
                        className={getFieldClass('longitude')}
                        aria-invalid={Boolean(fieldErrors.longitude)}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-source" className="mb-2 block text-sm font-semibold tracking-wide text-white">Source</label>
                    <input
                        id="crime-source"
                        type="text"
                        placeholder="Official source (optional)"
                        value={source}
                        onFocus={() => clearFieldError('source')}
                        onChange={(e) => {
                            setSource(e.target.value);
                            clearFieldError('source');
                        }}
                        className={getFieldClass('source')}
                        aria-invalid={Boolean(fieldErrors.source)}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <label htmlFor="crime-image-url" className="mb-2 block text-sm font-semibold tracking-wide text-white">Image URL</label>
                    <input
                        id="crime-image-url"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onFocus={() => clearFieldError('imageUrl')}
                        onChange={(e) => {
                            setImageUrl(e.target.value);
                            clearFieldError('imageUrl');
                        }}
                        className={getFieldClass('imageUrl')}
                        aria-invalid={Boolean(fieldErrors.imageUrl)}
                    />
                </div>

                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:col-span-2">
                    <label htmlFor="crime-image-alt" className="mb-2 block text-sm font-semibold tracking-wide text-white">Image Alt Text</label>
                    <input
                        id="crime-image-alt"
                        type="text"
                        placeholder="Short accessibility description for the image"
                        value={imageAlt}
                        onFocus={() => clearFieldError('imageAlt')}
                        onChange={(e) => {
                            setImageAlt(e.target.value);
                            clearFieldError('imageAlt');
                        }}
                        className={getFieldClass('imageAlt')}
                        aria-invalid={Boolean(fieldErrors.imageAlt)}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-white/70">Tip: Use concise, objective wording to improve report quality.</p>
                    {error && <p className="text-xs text-red-300">{error}</p>}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`cursor-pointer rounded-lg bg-[var(--color-secondary)] px-5 py-2.5 font-redwing text-lg text-[var(--color-primary)] transition-all duration-300 ease-in-out hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'SUBMITTING...' : 'SUBMIT REPORT'}
                </button>
            </div>
        </form>
    )
}

export default ReportingForm