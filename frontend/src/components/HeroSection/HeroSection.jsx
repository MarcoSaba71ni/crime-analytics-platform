import { Link } from 'react-router-dom';
import { ArrowRight , ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import slides from './slides';

function HeroSection() {

    const [currentSlide, setCurrentSlide] = useState(0);

    function nextSlide() {
        if ( currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if ( currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    }


    const slide = slides[currentSlide];
    const isFirstSlide = currentSlide === 0;
    const isLastSlide = currentSlide === slides.length - 1;

    return (
            <section className="relative w-full h-140" key={slide.id}>
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-50"
                    style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="relative z-10 mx-10 sm:mx-40 py-40 flex flex-col gap-8">
                    {/* Hero Section Content */}
                    <div className='flex flex-col sm:flex-row justify-between items-center'>
                        <div className='flex flex-col gap-8'>
                            <div className="flex flex-col gap-2">
                                <p className="inline-flex w-fit rounded-full border border-[var(--color-secondary)]/70 bg-[#041F45A6] px-4 py-1 text-xs tracking-[0.18em] text-[var(--color-secondary)] font-redwing">
                                    PUBLIC SAFETY INTELLIGENCE
                                </p>
                                <h1 className="text-white text-4xl sm:text-6xl">Safe Sweden</h1>
                                <h2 className="text-white text-md sm:text-2xl">Crime analytics platform designed to help users better understand public safety</h2>                        
                            </div>
                            <div className="flex gap-2">
                                <Link to="/about#methodology">
                                <button className="bg-[var(--color-secondary)] text-[var(--color-primary)] text px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-redwing hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">METHODOLOGY</button>
                                </Link>
                                <Link to="/zones">
                                <button className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-redwing hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300 ease-in-out">ZONES</button>
                                </Link>
                            </div>
                            <div className=" mt-4 sm:mt-16 md:mt-0">
                                <Link to="/crime-history">
                                    <h3 className="text-white text-sm sm:text-xl transition-transform duration-300 hover:scale-102 font-redwing underline">{slide.title}</h3></Link>
                            </div>
                        </div>
                        <div className=' hidden sm:flex gap-2'>
                            <div className="flex items-center">
                                <button
                                    onClick={() => prevSlide()}
                                    disabled={isFirstSlide}
                                    className={`h-10 w-10 rounded-full flex items-center justify-center border transition-colors duration-300 ease-in-out ${isFirstSlide ? 'bg-[var(--color-primary)] text-[var(--color-secondary)] border-[var(--color-secondary)] cursor-not-allowed' : 'bg-[var(--color-secondary)] text-[var(--color-primary)] border-transparent hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] cursor-pointer'}`}
                                >
                                    <ArrowLeft size={18} />
                                </button>
                            </div>                  
                            <div className="flex items-center">
                                <button
                                    onClick={() => nextSlide()}
                                    disabled={isLastSlide}
                                    className={`h-10 w-10 rounded-full flex items-center justify-center border transition-colors duration-300 ease-in-out ${isLastSlide ? 'bg-[var(--color-primary)] text-[var(--color-secondary)] border-[var(--color-secondary)] cursor-not-allowed' : 'bg-[var(--color-secondary)] text-[var(--color-primary)] border-transparent hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] cursor-pointer'}`}
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </div>                                         
                        </div>
                    </div>

                    <div className="font-redwing flex justify-center gap-2">
                        <button onClick={() => setCurrentSlide(0)} 
                        className={`rounded-md px-2 py-1 cursor-pointer transition-colors duration-300 ease-in-out 
                        ${currentSlide === 0 ? 'bg-[var(--color-primary)] text-[var(--color-secondary)]' : 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]'}`}>1</button>
                        <button onClick={() => setCurrentSlide(1)} 
                        className={`rounded-md px-2 py-1 cursor-pointer transition-colors duration-300 ease-in-out 
                        ${currentSlide === 1 ? 'bg-[var(--color-primary)] text-[var(--color-secondary)]' : 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]'}`}>2</button>
                        <button onClick={() => setCurrentSlide(2)} 
                        className={`rounded-md px-2 py-1 cursor-pointer transition-colors duration-300 ease-in-out 
                        ${currentSlide === 2 ? 'bg-[var(--color-primary)] text-[var(--color-secondary)]' : 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]'}`}>3</button>
                    </div>
                </div>
            </section>
        );  
}
export default HeroSection;