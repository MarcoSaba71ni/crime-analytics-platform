import { useState, useEffect } from 'react';
import SwedishMap from '../components/SwedishMap';
import CrimeCard from '../components/CrimeCard';
import CrimeListItem from '../components/CrimeListItem';


function Zones() {
	const [crimes, setCrimes] = useState([]);
	const [visibleCount, setVisibleCount] = useState(6);
	const [mapBounds, setMapBounds] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showDisclaimer, setShowDisclaimer] = useState(false);
	const [selectedView, setSelectedView] = useState('map');

	// Search / filter state — used only by the bottom section
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedSeverity, setSelectedSeverity] = useState('all');

	// Single fetch — shared by both sections
	useEffect(() => {
		let ignore = false;
		async function loadCrimes() {
			setIsLoading(true);
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/crimes?limit=100`);
				const contentType = response.headers.get('content-type');
				if (!response.ok || !contentType || !contentType.includes('application/json')) {
					const text = await response.text();
					throw new Error(`Network response was not ok: ${text}`);
				}
				const data = await response.json();
				if (!ignore) setCrimes(data.crimes || data);
			} catch (err) {
				if (!ignore) setError(err.message);
			} finally {
				if (!ignore) setIsLoading(false);
			}
		}
		loadCrimes();
		return () => { ignore = true; };
	}, []);

	// Callback from SwedishMap — converts Leaflet bounds to a plain object
	const handleBoundsChange = (bounds) => {
		setMapBounds({
			north: bounds.getNorth(),
			south: bounds.getSouth(),
			east: bounds.getEast(),
			west: bounds.getWest(),
		});
	};

	// Left panel: crimes visible in the current map viewport
	const visibleCrimes = mapBounds
		? crimes.filter(c =>
			c.latitude != null &&
			c.longitude != null &&
			c.latitude >= mapBounds.south &&
			c.latitude <= mapBounds.north &&
			c.longitude >= mapBounds.west &&
			c.longitude <= mapBounds.east
		)
		: crimes.filter(c => c.latitude != null && c.longitude != null);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
		setVisibleCount(6);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		setVisibleCount(6);
	};

	const handleSeverityChange = (severity) => {
		setSelectedSeverity(severity);
		setVisibleCount(6);
	};

	// Bottom section: crimes filtered by search / category / severity
	const filteredCrimes = crimes.filter((crime) => {
		const normalizedSearch = searchTerm.toLowerCase();
		const crimeTitle = (crime.title ?? '').toLowerCase();
		const crimeLocation = (crime.location ?? '').toLowerCase();
		const crimeType = (crime.type ?? '').toLowerCase();
		const matchesSearch =
			crimeTitle.includes(normalizedSearch) ||
			crimeLocation.includes(normalizedSearch) ||
			crimeType.includes(normalizedSearch);
		const matchesCategory = selectedCategory === 'all' || crimeType === selectedCategory;
		const matchesSeverity =
			selectedSeverity === 'all' ||
			(selectedSeverity === 'low' && crime.severity <= 2) ||
			(selectedSeverity === 'medium' && crime.severity === 3) ||
			(selectedSeverity === 'high' && crime.severity >= 4);
		return matchesSearch && matchesCategory && matchesSeverity;
	});

	const getFilterButtonClass = (isActive) =>
		`border px-2 sm:px-3 py-1 sm:py-2 rounded-full cursor-pointer transition-colors text-sm sm:text-md duration-300 ease-in-out ${
			isActive
				? 'border-[var(--color-secondary)] bg-[var(--color-secondary)] text-[var(--color-primary)]'
				: 'border-white text-white hover:bg-[#4073BA]'
		}`;

	const handleViewChange = (view) => {
		setSelectedView(view);
	};

	return (
		<main className="w-full min-h-screen bg-[var(--color-primary)] text-white flex flex-col gap-16">

			{/* Section 1: Hero */}
			<section className="relative w-full h-140">
				<div className="absolute inset-0 bg-[url('/images/man-with-mask-cop.jpg')] bg-cover bg-center brightness-50" />
				<div className="relative z-10 mx-auto pt-32 flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-12">
					<div className="max-w-3xl text-left">
						<p className="inline-flex rounded-full border border-[var(--color-secondary)]/60 bg-[rgba(4,31,69,0.55)] px-4 py-1 text-xs tracking-[0.18em] text-[var(--color-secondary)] font-redwing">
							ZONES
						</p>
						<h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
							Explore the map of Stockholm and criminality pin points.
						</h1>
						<p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
							Explore how crime pressure is distributed across zones, how risks shift over time, and where targeted prevention can make the biggest impact.
						</p>
						<div className="mt-4 flex flex-col gap-2">
							<button
								type="button"
								onClick={() => setShowDisclaimer(prev => !prev)}
								className="inline-flex items-center gap-2 text-[var(--color-secondary)] text-sm cursor-pointer w-fit font-redwing tracking-wide"
							>
								<span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[var(--color-secondary)] text-xs font-bold font-redwing">i</span>
								Sensitive Information
							</button>
							{showDisclaimer && (
								<p className="max-w-2xl text-sm leading-relaxed text-[var(--color-secondary)]/70">
									&quot;Due to limited access to structured, incident-level crime data, this project combines real verified data with simulated dataset based on real statistical trends from Brottsförebyggande rådet. The dataset reflects observed developments such as declining overall crime rates and increasing levels of organized and financial crime.&quot;
								</p>
							)}
						</div>
					</div>
				</div>
			</section>

			<section className='flex justify-center' role="group" aria-label="Zones view selector">
				<div>
					<button aria-pressed={selectedView === 'map'} onClick={() => handleViewChange('map')} className={`border text-[var(--color-secondary)] font-redwing py-1 text-sm px-3 rounded-l-full hover:bg-[var(--color-secondary)] hover:text-black cursor-pointer transition ${selectedView === 'map' ? 'bg-[var(--color-secondary)] text-black' : ''}`}>Map of View</button>
				</div>
				<div>
					<button aria-pressed={selectedView === 'list'} onClick={() => handleViewChange('list')} className={`border text-[var(--color-secondary)] font-redwing py-1 text-sm px-3 rounded-r-full hover:bg-[var(--color-secondary)] hover:text-black cursor-pointer transition ${selectedView === 'list' ? 'bg-[var(--color-secondary)] text-black' : ''}`}>List of Crimes</button>
				</div>
			</section>

			{selectedView === 'map' && (
			<>
				{/* Section 2: Split panel — left list driven by map viewport */}
				<section className="mx-auto w-full px-6 pb-16 flex flex-col gap-4">
					<div>
						<h2 className="text-2xl font-semibold">Crimes in view</h2>
						<p className="text-white/40 text-sm mt-1">Updates as you pan or zoom the map.</p>
					</div>
					<div className="flex flex-col lg:flex-row gap-8">
						<div className="flex-1 flex flex-col gap-3 bg-[var(--color-primary)] rounded-xl p-4">
						<div className="h-[600px] overflow-y-auto flex flex-col gap-2 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[var(--color-primary)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-secondary)]/40 [&::-webkit-scrollbar-thumb]:rounded-full">
							{isLoading && (
								<div className="w-full min-h-40 flex flex-col items-center justify-center gap-4">
									<div className="w-10 h-10 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin" />
									<p className="text-white font-redwing tracking-widest">LOADING...</p>
								</div>
							)}
							{!isLoading && visibleCrimes.length === 0 && (
								<p className="text-white/40 text-sm text-center mt-8">No crimes with location data in the current view.</p>
							)}
							{visibleCrimes.map(crime => (
								<CrimeListItem key={crime.id} crime={crime} />
							))}
						</div>
						</div>
						<div className="flex-1">
							<SwedishMap
							crimes={crimes}
							onBoundsChange={handleBoundsChange}
							width="100%"
							height="600px"
						/>
					</div>
					</div>
				</section>
			</>
			)}
			{selectedView === 'list' && (
			<>
				{/* Section 3: Full crime list with search / filter */}
				<section className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-12 flex flex-col gap-6">
					<div>
						<h2 className="text-2xl font-semibold">Browse all crimes</h2>
						<p className="text-white/40 text-sm mt-1">Search and filter across the full dataset.</p>
					</div>
					<div className="flex flex-col gap-3 font-redwing">
						<input
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder="Search by title, location or type..."
							className="w-full rounded border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-secondary)]"
						/>
						<div className="flex flex-wrap gap-2 items-center">
							<p className="text-white text-sm">Category:</p>
							<button type="button" onClick={() => handleCategoryChange('all')} className={getFilterButtonClass(selectedCategory === 'all')}>All</button>
							<button type="button" onClick={() => handleCategoryChange('vandalism')} className={getFilterButtonClass(selectedCategory === 'vandalism')}>Vandalism</button>
							<button type="button" onClick={() => handleCategoryChange('theft')} className={getFilterButtonClass(selectedCategory === 'theft')}>Theft</button>
							<button type="button" onClick={() => handleCategoryChange('assault')} className={getFilterButtonClass(selectedCategory === 'assault')}>Assault</button>
						</div>
						<div className="flex flex-wrap gap-2 items-center">
							<p className="text-white text-sm">Severity:</p>
							<button type="button" onClick={() => handleSeverityChange('all')} className={getFilterButtonClass(selectedSeverity === 'all')}>All</button>
							<button type="button" onClick={() => handleSeverityChange('low')} className={getFilterButtonClass(selectedSeverity === 'low')}>Low</button>
							<button type="button" onClick={() => handleSeverityChange('medium')} className={getFilterButtonClass(selectedSeverity === 'medium')}>Medium</button>
							<button type="button" onClick={() => handleSeverityChange('high')} className={getFilterButtonClass(selectedSeverity === 'high')}>High</button>
						</div>
					</div>
					{error && <p className="text-red-500">Error: {error}</p>}
					{!isLoading && filteredCrimes.length === 0 && (
						<p className="text-white/40 text-sm text-center mt-4">No crimes match your current filters.</p>
					)}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredCrimes.slice(0, visibleCount).map(crime => (
							<CrimeCard key={crime.id} crime={crime} compact />
						))}
					</div>
					{visibleCount < filteredCrimes.length && (
						<div className="flex justify-center mt-4">
							<button
								type="button"
								className="font-redwing hover:text-[var(--color-secondary)] cursor-pointer duration-300 text-2xl text-white"
								onClick={() => setVisibleCount(prev => prev + 6)}
							>
								LOAD MORE
							</button>
						</div>
					)}
				</section>
			</>
			)}

		</main>
	);
}

export default Zones;