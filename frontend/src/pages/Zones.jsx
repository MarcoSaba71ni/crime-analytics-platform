import { useState, useEffect } from 'react';
import SwedishMap from '../components/SwedishMap';
import CrimeCard from '../components/CrimeCard';


function Zones() {
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedSeverity, setSelectedSeverity] = useState('all');
	const [showDisclaimer, setShowDisclaimer] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [crimes, setCrimes] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const limit = 6;

	useEffect(() => {
		let ignore = false;

		async function loadCrimes() {
			setIsLoading(true);
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/crimes?page=${currentPage}&limit=${limit}`);
				const contentType = response.headers.get('content-type');
				if (!response.ok || !contentType || !contentType.includes('application/json')) {
					const text = await response.text();
					throw new Error(`Network response was not ok: ${text}`);
				}
				const data = await response.json();
				const allCrimes = data.crimes || data;
				if (!ignore) {
					setCrimes(prev => currentPage === 1 ? allCrimes : [...prev, ...allCrimes]);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}

		loadCrimes();

		return () => { ignore = true; };
	}, [currentPage]);

	const filteredCrimes = crimes.filter((crime) => {
		const normalizedSearch = searchTerm.toLowerCase();
		const matchesSearch =
			crime.title.toLowerCase().includes(normalizedSearch) ||
			crime.location.toLowerCase().includes(normalizedSearch) ||
			crime.type.toLowerCase().includes(normalizedSearch);
		const matchesCategory = selectedCategory === 'all' || crime.type.toLowerCase() === selectedCategory;
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

	return (
		<main className="w-full min-h-screen bg-[var(--color-primary)] text-white flex flex-col gap-16">
			<section className="relative">
				<div className="relative mx-auto pt-32 flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-12">
					<div className="max-w-3xl text-left">
						<p className="inline-flex rounded-full border border-[var(--color-secondary)]/60 bg-[rgba(4,31,69,0.55)] px-4 py-1 text-xs tracking-[0.18em] text-[var(--color-secondary)] font-redwing">
							ZONES
						</p>
						<h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
							The explore the map of Stockholm and crimality pin points.
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
			<section className="mx-auto w-full px-6 pb-16 flex flex-col lg:flex-row gap-8">
				<div className="flex-1 flex flex-col gap-4">
					<h2 className="text-2xl font-semibold">Crime Zones in Stockholm</h2>
					<div className="flex gap-4">
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search for a zone, a crime or severity..."
							className="w-full rounded border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-secondary)]"
						/>
						<div>
							<button className="rounded bg-[var(--color-secondary)] px-4 py-2 text-black font-redwing text-sm tracking-wide">
								Filter
							</button>
						</div>
					</div>
					<div className="flex flex-wrap gap-2 items-center">
						<p className="text-white text-sm sm:text-md">All Categories:</p>
						<button type="button" onClick={() => setSelectedCategory('all')} className={getFilterButtonClass(selectedCategory === 'all')}>All</button>
						<button type="button" onClick={() => setSelectedCategory('vandalism')} className={getFilterButtonClass(selectedCategory === 'vandalism')}>Vandalism</button>
						<button type="button" onClick={() => setSelectedCategory('theft')} className={getFilterButtonClass(selectedCategory === 'theft')}>Theft</button>
						<button type="button" onClick={() => setSelectedCategory('assault')} className={getFilterButtonClass(selectedCategory === 'assault')}>Assault</button>
					</div>
					<div className="flex flex-wrap gap-2 items-center">
						<p className="text-white text-sm sm:text-md">Severity:</p>
						<button type="button" onClick={() => setSelectedSeverity('all')} className={getFilterButtonClass(selectedSeverity === 'all')}>All</button>
						<button type="button" onClick={() => setSelectedSeverity('low')} className={getFilterButtonClass(selectedSeverity === 'low')}>Low</button>
						<button type="button" onClick={() => setSelectedSeverity('medium')} className={getFilterButtonClass(selectedSeverity === 'medium')}>Medium</button>
						<button type="button" onClick={() => setSelectedSeverity('high')} className={getFilterButtonClass(selectedSeverity === 'high')}>High</button>
					</div>
					<div id="crime-wrapper" className="flex-1 flex flex-col gap-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{filteredCrimes.map((crime) => (
								<CrimeCard key={crime.id} crime={crime} compact />
							))}
							{filteredCrimes.length === 0 && !isLoading && (
								<p className="text-gray-400 text-center col-span-full">No crimes found matching your current search and filters.</p>
							)}
							{isLoading && (
								<div className="col-span-full w-full min-h-40 flex flex-col items-center justify-center gap-4">
									<div className="w-10 h-10 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin" />
									<p className="text-white font-redwing tracking-widest">LOADING...</p>
								</div>
							)}
							{error && (
								<p className="text-red-500 text-center col-span-full">Error: {error}</p>
							)}
						</div>
						<div className="flex justify-center mt-2">
							<button
								className="font-redwing hover:text-[var(--color-secondary)] cursor-pointer duration-300 text-2xl text-white"
								onClick={() => setCurrentPage(prev => prev + 1)}
							>
								LOAD MORE
							</button>
						</div>
					</div>				
				</div>
				<div className="flex-1">
					<SwedishMap width="100%" height="600px" />
				</div>
			</section>
		</main>
	);
}

export default Zones;