import { ShieldUser } from 'lucide-react'
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection/HeroSection';
import { useAuth } from '../context/useAuth';
import { useState } from 'react';
import ReportingForm  from '../components/ReportingForm';

function HomePage() {
    const { user, role } = useAuth();
    const isCrimeReporter = role === 'crime_reporter';
    const [isUpdating, setIsUpdating] = useState(false);

    return (
        <>
            <HeroSection />
            { !user && (
                <section className="bg-[var(--color-primary)] w-full px-4 sm:px-0 py-24 flex flex-col items-center gap-6">
                    <h2 className="text-white text-2xl sm:text-4xl text-center">Create a free account or login to track crime trends in real time.</h2>
                    <p className="font-redwing text-[var(--color-secondary)] text-md sm:text-lg text-center max-w-xl">
                        As an Analyst you can save areas, set watchlists, and receive AI-generated summaries. As a Crime Reporter you can report crimes and contribute to the community's safety.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Link to="/auth/register">
                            <button className="bg-[var(--color-secondary)] text-[var(--color-primary)] font-redwing px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">
                                SIGN IN
                            </button>                        
                        </Link>
                        <Link to="/auth/register">
                            <button className="border border-[var(--color-secondary)] cursor-pointer hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] text-[var(--color-secondary)] font-redwing px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-lg">
                                CREATE ACCOUNT
                            </button>
                        </Link>
                    </div>
                </section>                
            )}
            {isCrimeReporter && (
                <section className="bg-black px-4 py-8 sm:px-8" aria-label="Crime reporter quick actions">
                    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 rounded-2xl bg-[var(--color-primary)]/90 p-5 mt-5 shadow-xl ring-1 ring-white/20 sm:p-7">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-redwing text-sm tracking-[0.12em] text-white/75">REPORTER MODE</p>
                                <h2 className="font-redwing text-2xl text-white text-lg sm:text-3xl">Submit a New Crime Report</h2>
                                <p className="mt-1 max-w-2xl text-xs sm:text-sm text-white/85 sm:text-base">
                                    Capture incident details quickly and help keep the community map accurate and up to date.
                                </p>
                            </div>
                            <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-redwing text-white/90">
                                Priority Workflow
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-white/80 sm:text-sm">
                            <span className="rounded-full border border-white/25 px-3 py-1">Verified role</span>
                            <span className="rounded-full border border-white/25 px-3 py-1">Geo-aware reporting</span>
                            <span className="rounded-full border border-white/25 px-3 py-1">Fast incident intake</span>
                        </div>

                        <div>
                            <button
                                onClick={() => setIsUpdating(true)}
                                disabled={isUpdating}
                                className={`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 sm:px-5 py-2 sm:py-3 font-redwing text-sm sm:text-lg text-[var(--color-primary)] transition-transform duration-300 ease-in-out hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ShieldUser size={22} />
                                Start Crime Report
                            </button>
                        </div>
                    </div>
                    {isUpdating && (
                        <ReportingForm onClose={() => setIsUpdating(false)} />
                        )}
                
                </section>

            )}
            <section className=" bg-[url('../images/stockholm-view-img3.jpg')] bg-cover bg-center w-full h-140">
                <div className=" z-10 flex flex-col justify-center items-center gap-8 mx-10 sm:mx-40 py-40">
                    <h2 className="text-2xl sm:text-4xl font-redwing text-white pt-40">UNDERSTAND THE CRIME TRENDS IN THE CAPITAL OF SWEDEN</h2>
                    <Link to="/statistics">
                        <button className="font-redwing bg-[var(--color-secondary)] px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:text-2xl text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">EXPLORE</button>
                    </Link>
                </div>
            </section>
            <section className="w-full h-100 sm:h-140 flex">
                <div className="relative bg-[url('../images/experts-analyzing.webp')] bg-cover bg-center w-1/2 h-full brightness-75 flex flex-col gap-4 justify-center items-center">
                    <div className="absolute inset-0" />
                        <h3 className="relative z-10 w-full px-4 text-center font-redwing text-lg text-white sm:text-3xl">STATISTICS & DASHBOARDS</h3>
                        <Link to="/statistics">
                            <button className="relative bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing z-10 hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">EXPLORE</button>
                        </Link>
                </div>
                <div className="relative bg-[url('../images/black-dressed-men.png')] bg-cover bg-center w-1/2 sm:h-full brightness-75 flex flex-col gap-4 justify-center items-center">
                    <div className="absolute inset-0"/>
                        <h3 className="relative z-10 w-full px-4 text-center font-redwing text-lg text-white sm:text-3xl">ZONES CONTROLLED BY NEIGHBORHOOD</h3>
                        <Link to="/zones">
                            <button className="relative bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing z-10 hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">EXPLORE</button>
                        </Link>
                </div>
            </section>
            { user && (
                <section className="bg-[var(--color-primary)] w-full py-24 flex flex-col px-6 sm:px-0 items-center gap-6">
                    <h2 className="text-white text-2xl sm:text-4xl text-center">Stay informed. Track crime trends in real time.</h2>
                    <p className="font-redwing text-[var(--color-secondary)] text-sm sm:text-lg text-center max-w-xl">
                        Subscribe your email to receive AI-generated summaries and watch lists of crime activity in your saved area.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <input type="email" placeholder="Enter your email" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]" />
                        <button className="bg-[var(--color-secondary)] text-[var(--color-primary)] font-redwing px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">
                            SUBSCRIBE
                        </button>
                    </div>
                </section> 
            )}
            <section className="relative bg-[var(--color-secondary)] py-14 lg:py-18">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-12 lg:items-center lg:px-10">
                    <div className="relative overflow-hidden rounded-2xl lg:col-span-7">
                        <img
                            src="../images/armed-officers-running.png"
                            alt="Officers running"
                            className="h-72 w-full object-cover object-[30%_center] sm:h-80 lg:h-[26rem]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,31,69,0.72)] via-transparent to-transparent" />
                        <p className="absolute bottom-5 left-5 rounded-full border border-white/40 bg-[rgba(4,31,69,0.72)] px-4 py-1 text-xs tracking-[0.14em] text-white font-redwing">
                            CIVIC TECH FOR PUBLIC SAFETY
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[var(--color-primary)] p-6 text-white shadow-xl lg:col-span-5 lg:p-8">
                        <h3 className="text-2xl sm:text-3xl font-redwing leading-tight">Who We Are</h3>
                        <p className="mt-4 text-sm sm:text-md text-base leading-relaxed text-white/90">
                            Safe Sweden is a civic-tech initiative focused on making public crime data clearer, more transparent, and easier to understand for everyone.
                        </p>
                        <p className="mt-3 text-base leading-relaxed hidden sm:flex text-white/80">
                            Explore our mission, values, and methodology, and see how data can support informed, safer communities.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 sm:gap-3">
                            <Link to="/about#our-mission" className="rounded-full hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300 border border-white/35 px-3 py-1.5 text-center font-redwing">Mission</Link>
                            <Link to="/about#methodology" className="rounded-full hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300 border border-white/35 px-3 py-1.5 text-center font-redwing">Methodology</Link>
                            <Link to="/about#our-values" className="rounded-full hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300 border border-white/35 px-3 py-1.5 text-center font-redwing">Values</Link>
                        </div>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/about"
                                className="rounded-lg bg-[var(--color-secondary)] px-5 py-3 text-center text-base font-redwing text-[var(--color-primary)] transition-colors duration-300 hover:bg-white"
                            >
                                LEARN MORE
                            </Link>
                            <a
                                href="mailto:contact@safesweden.ai"
                                className="rounded-lg border border-white px-5 py-3 text-center text-base font-redwing text-white transition-colors duration-300 hover:bg-white hover:text-[var(--color-primary)]"
                            >
                                CONTACT US
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default HomePage