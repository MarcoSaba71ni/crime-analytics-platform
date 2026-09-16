import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import landingPageAnimation from '../animations/landing-page';
import { Database, Flag, TrendingUp, Lightbulb, Bot, ChevronsDown } from 'lucide-react';

const CONCEPTS = [
    { id: 'concept-0', label: 'CRIME DATA',        Icon: Database,   desc: 'Visualize public information from official Swedish sources.' },
    { id: 'concept-1', label: 'REPORT INCIDENTS',  Icon: Flag,       desc: 'Report real events mapped across your city.' },
    { id: 'concept-2', label: 'PATTERNS',          Icon: TrendingUp, desc: 'Trends that emerge over time and across areas.' },
    { id: 'concept-3', label: 'AI INSIGHTS',       Icon: Lightbulb,  desc: 'Intelligent reports for your neighborhood.' },
    { id: 'concept-4', label: 'AI ACTION',         Icon: Bot,        desc: 'AI agents that recommend actions based on local crime trends.' },
];

// Static map placeholder — will be upgraded to a live visualization later
function MapPlaceholder() {
    const dots = [
        { top: '22%', left: '32%', r: 4, o: 0.9 },
        { top: '38%', left: '56%', r: 5, o: 0.7 },
        { top: '52%', left: '24%', r: 3, o: 0.8 },
        { top: '44%', left: '67%', r: 6, o: 0.55 },
        { top: '66%', left: '47%', r: 4, o: 0.85 },
        { top: '27%', left: '72%', r: 3, o: 0.5 },
        { top: '60%', left: '34%', r: 5, o: 0.65 },
        { top: '74%', left: '61%', r: 3, o: 0.6 },
        { top: '31%', left: '43%', r: 3, o: 0.75 },
        { top: '57%', left: '74%', r: 4, o: 0.45 },
    ];

    return (
        <div className="absolute inset-0 bg-[#061830] overflow-hidden">
            {/* Street grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
                {[15, 30, 45, 60, 75, 90].map(x => (
                    <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="white" strokeWidth="0.5" />
                ))}
                {[20, 35, 50, 65, 80].map(y => (
                    <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="white" strokeWidth="0.5" />
                ))}
                <line x1="0" y1="25%" x2="100%" y2="72%" stroke="white" strokeWidth="0.5" />
                <line x1="0" y1="75%" x2="100%" y2="20%" stroke="white" strokeWidth="0.5" />
            </svg>

            {/* Watch-area rings */}
            <div
                className="absolute border border-[var(--color-secondary)]/25 rounded-full pointer-events-none"
                style={{ top: '47%', left: '47%', width: 180, height: 180, transform: 'translate(-50%, -50%)' }}
            />
            <div
                className="absolute border border-[var(--color-secondary)]/10 rounded-full pointer-events-none"
                style={{ top: '47%', left: '47%', width: 260, height: 260, transform: 'translate(-50%, -50%)' }}
            />

            {/* Incident dots */}
            {dots.map((d, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-[var(--color-secondary)]"
                    style={{
                        top: d.top, left: d.left,
                        width: d.r * 3, height: d.r * 3,
                        opacity: d.o,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}

            <div className="absolute bottom-4 left-5">
                <p className="font-redwing text-[10px] text-white/20 tracking-[0.3em] uppercase">
                    Kista, Stockholm
                </p>
            </div>
        </div>
    );
}

function HomePage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showLoginDiv, setShowLoginDiv] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            landingPageAnimation();
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isLoginOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowLoginDiv(true);
        } else {
            setShowLoginDiv(false);
        }
    }, [isLoginOpen]);

    return (
        <main className="bg-[var(--color-primary)] text-white">

            {/* ── Section 1: Hero ──────────────────────────────────── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-x-hidden">
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="inline-flex w-fit rounded-full border border-[var(--color-secondary)]/70 bg-[#041F45A6] px-4 py-1 text-xs tracking-[0.18em] text-[var(--color-secondary)] font-redwing">
                        PUBLIC SAFETY INTELLIGENCE
                    </p>
                    {/* SS and Safe Sweden share the same space — animated sequence on load */}
                    <div className="relative flex items-center justify-center w-full">
                        {/* heading-group moves as a unit; strikethrough is a real div so GSAP can erase it */}
                        <div id="heading-group" className="relative inline-block opacity-0">
                            <h1 className="font-redwing text-6xl md:text-8xl font-bold leading-none line-through">
                                <span id="ss-left">S</span><span id="ss-right" className="inline-block line-through">S</span>
                            </h1>
                            <div
                                id="strikethrough-line"
                                className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2 origin-center"
                            />
                        </div>
                        <h2
                            id="landing-subheading-2"
                            className="absolute left-1/2 -translate-x-1/2 font-redwing text-6xl md:text-8xl whitespace-nowrap opacity-0"
                        >
                            Safe Sweden
                        </h2>
                    </div>
                </div>
                <p
                    id="landing-subheading"
                    className="mt-8 text-sm font-redwing sm:text-base text-white max-w-lg opacity-0"
                >
                    Watch your neighborhood and Stockholm's surrounding areas for public safety insights.
                </p>

                <div
                    id="landing-cta"
                    className="mt-12 flex flex-wrap gap-4 justify-center opacity-0"
                >
                    <Link to="/auth/register">
                        <button className="font-redwing bg-[var(--color-secondary)] text-[var(--color-primary)] px-8 py-3 text-xs tracking-[0.2em] hover:bg-white transition-colors duration-300">
                            GET STARTED
                        </button>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsLoginOpen(true)}
                        className="font-redwing border border-white/15 text-white/50 px-8 py-3 text-xs tracking-[0.2em] hover:border-white/40 hover:text-white/80 transition-colors duration-300"
                    >
                        SIGN IN
                    </button>
                </div>
                <div
                    id="landing-scroll-indicator"
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
                    aria-hidden="true"
                >
                    <p className="font-redwing text-[10px] tracking-[0.4em] text-[var(--color-secondary)]/50 uppercase">Scroll</p>
                    <div className="rounded-full p-2 animate-bounce">
                        <ChevronsDown size={30} strokeWidth={2} className="text-[var(--color-secondary)]/70" />
                    </div>
                </div>
            </section>

            {/* ── Section 2: Journey (scroll-driven) ───────────────── */}
            <section id="journey-section" className="relative">
                {/* Sticky panel */}
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
                    {/* Video background */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/images/video-Stadshuset_view.webm"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                    />
                    {/* Dark overlay so text stays readable */}
                    <div className="absolute inset-0 bg-[var(--color-primary)]/75" />

                    {/* Content sits above the video + overlay */}
                    <div className="relative z-15 flex flex-col items-center py-10">
                        <p className="font-redwing text-[10px] tracking-[0.35em] text-[var(--color-secondary)] mb-16 uppercase">
                            AI-Powered Crime analytics platform
                        </p>

                        <div className="flex flex-col gap-2 md:gap-4 sm:flex-row items-center">
                            {CONCEPTS.map((concept, i) => (
                                <div key={concept.id} className="flex sm:flex-row items-center">
                                    <div
                                        id={concept.id}
                                        className="flex flex-col  items-center gap-3 px-6 sm:px-8 opacity-0"
                                    >
                                        <concept.Icon size={32} className="text-[var(--color-secondary)]" aria-hidden="true" />
                                        <h3 className="font-redwing text-base text-md sm:text-xl tracking-[0.18em]">
                                            {concept.label}
                                        </h3>
                                        <p className="text-[var(--color-secondary)] font-redwing text-xs sm:text-sm text-center max-w-[130px]">
                                            {concept.desc}
                                        </p>
                                    </div>

                                    {i < CONCEPTS.length - 1 && (
                                        <span className="hidden sm:block text-[var(--color-secondary)] text-lg select-none">
                                            →
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll spacer — 300vh = 5 concepts × ~60vh each */}
                <div className="h-[300vh]" aria-hidden="true" />
            </section>

            {/* ── Section 3: Product Preview ────────────────────────── */}
            <section className="px-6 py-28 max-w-6xl mx-auto overflow-x-hidden">
                <p className="font-redwing text-[10px] tracking-[0.35em] text-[var(--color-secondary)] uppercase mb-4">
                    The product
                </p>
                <h2 className="font-redwing text-3xl sm:text-4xl mb-20 max-w-lg leading-snug">
                    Saved Neighborhood and AI insights.
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/8">
                    {/* Saved Area Card */}
                    <div
                        id="product-card"
                        className="p-10 lg:p-12 flex flex-col gap-10 border-b lg:border-b-0 lg:border-r border-white/8 opacity-0"
                    >
                        <div>
                            <p className="font-redwing text-[10px] tracking-[0.3em] text-[var(--color-secondary)] uppercase mb-3">
                                Saved area
                            </p>
                            <h3 className="font-redwing text-5xl tracking-wide">KISTA</h3>
                        </div>

                        <div>
                            <p className="font-redwing text-[10px] tracking-[0.25em] text-[var(--color-secondary)] uppercase mb-4">
                                Recent activity
                            </p>
                            <div className="flex items-baseline gap-4">
                                <span className="font-redwing text-7xl leading-none">7</span>
                                <span className="text-white/35 text-sm leading-snug">
                                    incidents<br />in the last 7 days
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-8 border-t border-white/8">
                            <span className="font-redwing text-2xl text-green-400">↓ 12%</span>
                            <span className="text-white/30 text-sm">compared with previous period</span>
                        </div>
                    </div>

                    {/* Map */}
                    <div
                        id="product-map"
                        className="relative min-h-[320px] lg:min-h-0 opacity-0"
                    >
                        <MapPlaceholder />
                    </div>
                </div>
            </section>

            {/* ── Section 4: Final CTA ──────────────────────────────── */}
            <section className="min-h-[55vh] flex flex-col items-center justify-center px-6 text-center border-t border-white/8 overflow-x-hidden">
                <h2
                    id="cta-heading"
                    className="font-redwing text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight opacity-0"
                >
                    Your neighborhood. Your awareness.
                </h2>

                <p
                    id="cta-subtext"
                    className="text-white max-w-sm font-redwing mb-12 leading-relaxed text-md opacity-0"
                >
                    Create your personal safety profile and start exploring Safe Sweden.
                </p>

                <Link to="/auth/register">
                    <button
                        id="cta-button"
                        className="font-redwing border border-[var(--color-secondary)]/60 text-[var(--color-secondary)] px-12 py-4 text-xs tracking-[0.25em] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-500 opacity-0"
                    >
                        GET STARTED
                    </button>
                </Link>
            </section>

            {showLoginDiv && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
                    <div className="mx-auto mt-24 w-full max-w-md rounded-lg p-6">
                        <LoginForm onClose={() => setIsLoginOpen(false)} />
                    </div>
                </div>
            )}

        </main>
    );
}

export default HomePage;