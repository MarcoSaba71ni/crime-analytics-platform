import videoTraffic from '../../images/video-Stockholm_traffic.webm';
import { CircleChevronDown, CircleChevronUp , TriangleAlert, Combine , BrainCircuit , Map} from 'lucide-react';
import { useState } from 'react';


function About() {
    const [fullMission, setFullMission] = useState(false);
    const [fullValues, setFullValues] = useState(false);
    const [fullGoals, setFullGoals] = useState(false);

    const toggleMission = () => setFullMission(!fullMission);
    const toggleValues = () => setFullValues(!fullValues);
    const toggleGoals = () => setFullGoals(!fullGoals);

    return (
        <main className="bg-[var(--color-primary)] text-white">
            <section className="relative min-h-screen overflow-hidden">
                <video
                    className="absolute brightness-75 inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"

                >
                    <source src={videoTraffic} type="video/webm" />
                </video>


                <div className="relative mx-auto pt-16 flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-12">
                    <div className="max-w-3xl mt-30">
                        <p className="inline-flex rounded-full border border-[var(--color-secondary)]/60 bg-[rgba(4,31,69,0.55)] px-4 py-1 text-xs tracking-[0.18em] text-[var(--color-secondary)] font-redwing">
                            ABOUT SAFE SWEDEN
                        </p>
                        <h1 className="mt-6 text-4xl font-semibold text-center leading-tight sm:text-5xl lg:text-6xl">
                            Crime intelligence built for public awareness and civic trust.
                        </h1>
                        <div className=" flex justify-center mt-4">
                            <button className="bg-[var(--color-secondary)] mx-auto text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">WHO WE ARE</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 bg-[var(--color-primary)] px-6 py-20 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-5">
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)] font-redwing">ABOUT US</p>
                        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A civic-tech project focused on clarity, context, and responsibility.</h2>
                    </div>

                    <div className="space-y-5 text-base leading-relaxed text-white/85 lg:col-span-7">
                        <p>
                            Safe Sweden is designed to make crime data easier to understand without losing nuance. We believe people deserve information that is transparent, contextualized, and useful for daily awareness and community decisions.
                        </p>
                        <p>
                            Our platform combines aggregated public data, visual analysis, and plain-language summaries to help users follow local patterns over time. We avoid raw-record exposure and keep the focus on aggregated trends that protect privacy while improving understanding.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[rgba(255,255,255,0.03)] px-6 py-20 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)] font-redwing">Our Values</p>
                        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The principles that shape every page and every chart.</h2>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <article className="rounded-2xl border border-white/10 bg-[rgba(4,31,69,0.55)] p-6 shadow-xl backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-[var(--color-secondary)]">Our Mission</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/80">
                                We show how information is gathered, what it means, and where its limits are so users can interpret trends with confidence.
                            </p>
                            {fullMission && (
                                <div className="mt-4 text-sm leading-relaxed text-white/80">
                                    We are committed to responsible data use, prioritizing aggregated insights over individual incidents to respect privacy and promote informed awareness. Our mission is to empower users with clear, contextualized information that fosters understanding and supports safer communities.
                                </div>
                            )}                            
                            <div className="flex justify-center mt-4 items-end">
                                <button onClick={toggleMission}>{fullMission ? <CircleChevronUp className="cursor-pointer w-6 h-6 text-[var(--color-secondary)]"/> : <CircleChevronDown className="cursor-pointer w-6 h-6 text-[var(--color-secondary)]"/>}</button>
                            </div>

                        </article>

                        <article className="rounded-2xl border border-white/10 bg-[rgba(4,31,69,0.55)] p-6 shadow-xl backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-[var(--color-secondary)]">Our Values</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/80">
                                Every feature is built to support informed communities, not to sensationalize incidents or expose sensitive details.
                            </p>
                            {fullValues && (
                                <div className="mt-4 text-sm leading-relaxed text-white/80">
                                    Our values are centered around transparency, integrity, and respect for privacy. We strive to provide accurate, meaningful insights while safeguarding the trust of our users and the communities we serve.
                                </div>
                            )}                            
                            <div className="flex justify-center mt-4 items-end">
                                <button onClick={toggleValues}>{fullValues ? <CircleChevronUp className="cursor-pointer w-6 h-6 text-[var(--color-secondary)]"/> : <CircleChevronDown className="cursor-pointer w-6 h-6 text-[var(--color-secondary)]"/>}</button>
                            </div>
                        </article>

                        <article className="rounded-2xl border border-white/10 bg-[rgba(4,31,69,0.55)] p-6 shadow-xl backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-[var(--color-secondary)]">Our Goals</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/80">
                                We pair maps and metrics with plain language so users can understand what is changing, where, and why it matters.
                            </p>
                            {fullGoals && (
                                <div className="mt-4 text-sm leading-relaxed text-white/80">
                                    Our goals are to provide actionable insights, foster community engagement, and support data-driven decision-making for safer and more informed communities.
                                </div>
                            )}                            
                            <div className="flex justify-center mt-4 items-end">
                                <button onClick={toggleGoals}>{fullGoals ? <CircleChevronUp className="cursor-pointer w-6 h-6 text-[var(--color-secondary)]"/> : <CircleChevronDown className="cursor-pointer w-6 h-6 text-[var(--color-secondary)]"/>}</button>
                            </div>

                        </article>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)] font-redwing">Methodology</p>
                        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">How we turn data into insights.</h2>
                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                            Our methodology combines rigorous data analysis with community engagement to ensure that our insights are both accurate and actionable.
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                            We start by collecting and aggregating crime data from public sources, ensuring that we respect privacy and focus on trends rather than individual incidents. Our team of data scientists and analysts then apply advanced techniques to identify patterns, correlations, and emerging trends in the data.
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                            Finally, we present our findings through intuitive visualizations and plain-language summaries, making it easy for users to understand the context and implications of the data. Our goal is to empower communities with the information they need to make informed decisions and foster safer environments.
                        </p>
                    </div>
                </div>
            </section>
            <section className="relative min-h-screen overflow-hidden">
                <video
                    className="absolute brightness-75 inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/stockholm-view.webp"
                >
                    <source src={videoTraffic} type="video/webm" />
                </video>
                <div className="relative mx-auto pt-16 flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-12">
                    <div className="max-w-3xl mt-30">
                        <p className="inline-flex rounded-full border border-[var(--color-secondary)]/60 bg-[rgba(4,31,69,0.55)] px-4 py-1 text-xs tracking-[0.18em] text-[var(--color-secondary)] font-redwing">
                            OUR COMMITMENT
                        </p>
                        <h1 className="mt-6 text-4xl font-semibold text-center leading-tight sm:text-5xl lg:text-6xl">
                            We are dedicated to providing clear, contextualized crime insights that empower communities and foster trust.
                        </h1>
                    </div>
                </div>
            </section>
            <section className="border-t border-white/10 bg-[var(--color-primary)] px-6 py-20 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-5">
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)] font-redwing">WE ARE NOT DONE YET</p>
                        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">This platform is continuously evolving and has more features and improvements on the way.</h2>
                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                            We are committed to ongoing development and improvement, with new features and enhancements planned for the future. <span className="font-semibold bg-[var(--color-secondary)] text-[var(--color-primary)]"> In order to achieve these goals we are actively searching for sponsors and partners to support our mission. </span> 
                        </p>
                        <div className="flex justify-center mt-4">
                            <button className="bg-[var(--color-secondary)] mt-4 text-[var(--color-primary)] px-4 py-2 rounded-lg font-redwing hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">CONTACT US</button>
                        </div>
                    </div>
                    <div className="space-y-5 text-base leading-relaxed text-white/85 lg:col-span-7">
                        <div className="flex flex-col items-start border border-white/10 rounded-2xl bg-[rgba(4,31,69,0.55)] p-6 shadow-xl backdrop-blur-sm">
                            <TriangleAlert />
                            <h3 className="text-xl font-redwing font-semibold">LIVE ALERTS</h3>
                            <p className="text-white/80">Real-time notifications about incidents and safety updates in your community.</p>
                        </div>
                        <div className="flex flex-col items-start border border-white/10 rounded-2xl bg-[rgba(4,31,69,0.55)] p-6 shadow-xl backdrop-blur-sm">
                            <Combine />
                            <h3 className="text-xl font-redwing font-semibold">COMMUNITY SAFETY SYSTEMS</h3>
                            <p className="text-white/80">Tools and resources to help communities stay informed and safe.</p>
                        </div>
                        <div className="flex flex-col items-start border border-white/10 rounded-2xl bg-[rgba(4,31,69,0.55)] p-6 shadow-xl backdrop-blur-sm">
                            <BrainCircuit />
                            <h3 className="text-xl font-redwing font-semibold">AI INFORMING</h3>
                            <p className="text-white/80">Leveraging artificial intelligence to provide actionable insights and predictions.</p>
                        </div>
                        <div className="flex flex-col items-start border border-white/10 rounded-2xl bg-[rgba(4,31,69,0.55)] p-6 shadow-xl backdrop-blur-sm">
                            <Map />
                            <h3 className="text-xl font-redwing font-semibold">MAP COVERAGE</h3>
                            <p className="text-white/80">Expanding our geographic coverage to provide insights for more communities across Sweden.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-[var(--color-secondary)]/70 px-6 py-20 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)] font-redwing">WHO I AM</p>
                        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">This project was designed, built, and implemented by a Full Stack Developer.</h2>
                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                            "With the scope of contributing with society and giving back to this country that has given me so much. I am a son of a police officer, I am an immigrant"
                        </p>
                        <div className="flex justify-center mt-4">
                            <button className="bg-[var(--color-secondary)] mt-4 text-[var(--color-primary
)] px-4 py-2 rounded-lg font-redwing hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">LIST OF CRIMES</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;