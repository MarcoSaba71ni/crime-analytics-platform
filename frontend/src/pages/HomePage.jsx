import { Sparkles } from 'lucide-react'

function HomePage() {
    return (
        <>
            <section className="relative w-full h-140">
                <div className="absolute inset-0 bg-[url('../images/man-with-mask-cop.jpg')] bg-cover bg-center brightness-50" />
                <div className="relative z-10 mx-40 py-40 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-6xl">Safe Sweden</h1>
                        <h2 className="text-white text-2xl">Crime analytics platform designed to help users better understand public safety</h2>                        
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing">METHODOLOGY</button>
                        <button className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing">ZONES</button>
                    </div>
                    <div className="mt-16">
                        <a><h3 className="text-white text-xl font-redwing underline">“HOW DID SWEDEN GO FROM BEING THE SAFEST COUNTRY IN THE WORLD TO THE MOST DANGEROUS COUNTRY IN EUROPE?”</h3></a>
                    </div>
                    <div className="flex justify-center gap-2">
                        <button className="rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)] px-2 py-1">1</button>
                        <button className="rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)] px-2 py-1">2</button>
                        <button className="rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)] px-2 py-1">3</button>
                    </div>
                </div>
            </section>
            <section className="bg-black">
                <div className="flex flex-col gap-4 mx-40 py-20">
                    <h2 className="text-4xl font-redwing text-white">List of Crimes</h2>
                    <p className="text-gray-400 text-center">“Due to limited access to structured, incident-level crime data, this project combines real verified data with simulated dataset based on real statistical trends from Brottsförebyggande rådet. The dataset reflects observed developments such as declining overall crime rates and increasing levels of organized and financial crime.”</p>
                    <input className="bg-gray-800 text-white w-2/3 border border-gray-600 rounded-lg px-4 py-2 mt-4" placeholder="Search crimes..."></input>
                    <div className="flex gap-2 items-center">
                        <p className="text-white">All Categories:</p>
                        <button className="border px-3 py-2 rounded-full text-white">Murder</button>
                        <button className="border px-3 py-2 rounded-full text-white">Theft</button>
                        <button className="border px-3 py-2 rounded-full text-white">Assault</button>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-white">Severity:</p>
                        <button className="border px-3 py-2 rounded-full text-white">All</button>
                        <button className="border px-3 py-2 rounded-full text-white">Low</button>
                        <button className="border px-3 py-2 rounded-full text-white">Medium</button>
                        <button className="border px-3 py-2 rounded-full text-white">High</button>
                    </div>
                    <div id="crimes-wrapper">

                    </div>
                    <div>
                        <button className="bg-[#4073BA] text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <Sparkles size={18} />
                            AI Crime Analyzer
                        </button>
                    </div>                    
                    <div className="flex justify-center mt-4">
                        <button className="font-redwing text-2xl text-white">LOAD MORE</button>
                    </div>
                </div>
            </section>
            <section className=" bg-[url('../images/stockholm-view-img3.jpg')] bg-cover bg-center w-full h-140">
                <div className=" z-10 flex flex-col justify-center items-center gap-8 mx-40 py-40">
                    <h2 className="text-4xl font-redwing text-white pt-40">UNDERSTAND THE CRIME TRENDS IN THE CAPITAL OF SWEDEN</h2>
                    <button className="font-redwing bg-[var(--color-secondary)] px-4 py-2 rounded-lg text-2xl text-[var(--color-primary)]">EXPLORE</button>
                </div>
            </section>
            <section className="w-full h-140 flex">
                <div className="relative bg-[url('../images/experts-analyzing.webp')] bg-cover bg-center w-1/2 h-full brightness-75 flex flex-col gap-4 justify-center items-center">
                    <div className="absolute inset-0" />
                        <h3 className="relative font-redwing text-white text-3xl z-10">STATISTICS & DASHBOARDS</h3>
                        <button className="relative bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing z-10">EXPLORE</button>
                </div>
                <div className="bg-[url('../images/black-dressed-men.png')] bg-cover bg-center w-1/2 h-full brightness-75 flex flex-col gap-4 justify-center items-center">
                    <div className="absolute inset-0"/>
                        <h3 className="relative font-redwing text-white text-3xl z-10">ZONES CONTROLLED BY NEIGHBORHOOD</h3>
                        <button className="relative bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing z-10">EXPLORE</button>                
                </div>
            </section>

            <section className="bg-[var(--color-primary)] w-full py-24 flex flex-col items-center gap-6">
                <h2 className="text-white text-4xl text-center">Stay informed. Track crime trends in real time.</h2>
                <p className="font-redwing text-[var(--color-secondary)] text-lg text-center max-w-xl">
                    Create a free account to save areas, set watchlists, and receive AI-generated summaries of crime activity near you.
                </p>
                <div className="flex gap-4 mt-4">
                    <button className="bg-[var(--color-secondary)] text-[var(--color-primary)] font-redwing px-8 py-3 rounded-lg text-lg">
                        SIGN IN
                    </button>
                    <button className="border border-[var(--color-secondary)] text-[var(--color-secondary)] font-redwing px-8 py-3 rounded-lg text-lg">
                        CREATE ACCOUNT
                    </button>
                </div>
            </section>
            <section className="bg-[var(--color-secondary)] w-full py-12 flex flex-row justify-center items-center gap-4">
                <div>
                   <img src="../images/armed-officers-running.png" alt="Officers running"
                   className="w-100 h-89 object-[30%_center] object-cover" />
                </div>
                <div className="flex flex-col justify-start gap-2">
                    <h3 className="text-white text-2xl font-redwing">Who We Are</h3>
                    <p className="text-white text-lg max-w-xl font-redwing">FIND WHO WE ARE AND THE MOTIVES BEHIND THIS PROJECT, THE MISSION, OUR GOAL AND VALUES</p>
                    <button className="bg-[var(--color-primary)] text-[var(--color-secondary)] font-redwing px-4 py-2 rounded-lg text-lg mt-4">
                        LEARN MORE
                    </button>
                    <button className="bg-white border border-white text-[var(--color-primary)] font-redwing px-4 py-2 rounded-lg text-lg">
                        CONTACT US
                    </button>   
                </div>

            </section>

        </>
    )
}
export default HomePage