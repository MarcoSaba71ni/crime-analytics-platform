import UnderConstruction from "../components/UnderConstruction";

function Zones() {
	return (
		<main className="w-full min-h-screen bg-[var(--color-primary)] text-white">
			<section className="relative">
				<div className="relative mx-auto pt-16 flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-12">
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
					</div>
				</div>
			</section>

			<section className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-12">
				<UnderConstruction
					title="Zone Intelligence Module In Progress"
					message="We are currently building interactive zone mapping, risk overlays, and area-level trend tracking to support better local awareness."
					eta="Module release coming soon"
					showHomeButton={true}
				/>
			</section>
		</main>
	);
}

export default Zones;
