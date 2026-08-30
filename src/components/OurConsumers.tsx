"use client"
import { FunctionComponent, useEffect, useRef } from "react";
import { Language } from "../types";
import Image from 'next/image';
interface AboutSectionProps {
    lang: Language;
}



const industries = [
    {
        title: 'Furniture',
        description: 'Technologies for companies and enterprises that make both functional and decorative objects used in living contexts',
        imageUrl: 'https://images.ctfassets.net/bdj0rlksezwc/4jsQEr5ZjvYqYSeDrACtIi/97a4f9cfb47e715b1c9407f190674706/Immagine_Forniture.png',
        alt: 'Furniture',
        width: 378,
        height: 539,
    },
    {
        title: 'Construction',
        description: 'Technologies for companies involved in the construction of buildings, infrastructure and industrial plants',
        imageUrl: 'https://images.ctfassets.net/bdj0rlksezwc/6ukbRKHprpHv8Woy4sGulM/ed0cbbe538d1ad7aeb93cca254d1de0d/image_11.png',
        alt: 'Construction',
        width: 378,
        height: 539,
    },
    {
        title: 'Automotive',
        description: 'Technologies for companies involved in the design, development, manufacture, repair and modification of motor vehicles',
        imageUrl: 'https://images.ctfassets.net/bdj0rlksezwc/239ptN8rRogEflGCu4V30d/dd5ccb394a3c51c61cd7340d5518312f/clayton-cardinalli-hkJNx0EDbjE-unsplash.jpg',
        alt: 'Automotive',
        width: 400,
        height: 600,
    },
    {
        title: 'Aerospace',
        description: 'Solutions for high-tech companies that manufacture aircraft, spacecraft, aeronautical engines and related parts',
        imageUrl: 'https://images.ctfassets.net/bdj0rlksezwc/7AtmYfzL77F98TCcLoY29l/9643b18994bbdf30b0f34d9b32552189/luka-slapnicar-yqeXLR81Uj0-unsplash.jpg',
        alt: 'Aerospace',
        width: 400,
        height: 600,
    },
];



const OurConsumers: React.FC<AboutSectionProps> = ({ lang }) => {
    const isFa = lang === 'fa';

    const scrollContainerRef = useRef<HTMLDivElement>(null);


    const initScrollBtn = () => {
        const rightArrow = document.getElementById('rightIcon');
        const leftArrow = document.getElementById('leftIcon');

        if (window.innerWidth < (scrollContainerRef.current?.scrollWidth ?? 0)) {

            if (isFa) {
                rightArrow?.classList.add('hidden');
                leftArrow?.classList.remove('hidden');
            } else {
                rightArrow?.classList.remove('hidden');
                leftArrow?.classList.add('hidden');
            }
        } else {
            rightArrow?.classList.add('hidden');
            leftArrow?.classList.add('hidden');

        }
    }

    useEffect(() => {
        handleScroll();
        window.onresize = function (event) {
            initScrollBtn();
        };
        return () => {
            scrollContainerRef.current?.removeEventListener('scroll', () => { });
        }

    }, [])

    const handleScroll = () => {
        const rightArrow = document.getElementById('rightIcon');
        const leftArrow = document.getElementById('leftIcon');

        initScrollBtn();


        scrollContainerRef.current?.addEventListener('scroll', (scroll) => {
            if (scrollContainerRef.current?.scrollLeft === 0) {
                if (isFa) {
                    rightArrow?.classList.add('hidden');
                } else {
                    leftArrow?.classList.add('hidden');
                }
            } else {
                if (isFa) {
                    rightArrow?.classList.remove('hidden');
                } else {
                    leftArrow?.classList.remove('hidden');
                }

            }
        });
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = isFa
                ? (direction === 'left' ? -200 : 200)
                : (direction === 'left' ? -200 : 200);
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full relative">
            <div className="bg-neutral  w-full overflow-hidden flex flex-col items-start justify-center px-8 py-10 lg:px-20 lg:py-10">
                {/* Header */}
                <div className="flex flex-col w-full justify-between items-start md:items-center my-8  gap-6 transition-all md:flex-row">
                    <h2 className="text-4xl 2xl:text-6xl font-medium md:font-bold text-primary">
                        {isFa ? "همکاران ما" : "Our customers' industries"}
                    </h2>
                    <div className="text-lg xl:text-xl 2xl:text-2xl md:hidden text-dark"></div>
                    <div className="hidden md:block"></div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}

                    className={`flex gap-18 ${isFa ? "" : ""} ${isFa ? "pl-32" : "pr-32"}  overflow-x-auto scrollbar-none snap-x snap-mandatory pb-10 pt-12 transition-all w-screen overflow-visible relative`}>
                    {industries.map((industry, index) => (
                        <div
                            key={index}

                            className="pointer-events-auto "
                            style={{
                                // opacity: 1,
                                zIndex: industries.length - index,
                                // transform: 'translateX(calc(0% + 0px)) translateY(0px) scale(1) translateZ(0px)',
                            }}                        >
                            <div className="relative rounded-2xl overflow-hidden aspect-3/4   group h-full w-80 lg:aspect-auto lg:h-136">
                                {/* Gradient Overlay */}
                                <div className="absolute z-10  h-full w-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]"></div>

                                {/* Content */}
                                <div className="absolute z-20 bottom-0 w-full transition-opacity flex flex-col gap-3">
                                    <div className="relative px-8 py-10">
                                        <span className="absolute bottom-0 left-0 transition-all group-hover:h-full w-full h-3 -z-10 bg-primary"></span>
                                        <div className="text-white">
                                            <h3 className="font-medium text-4xl mb-2 z-10">
                                                {industry.title}
                                            </h3>
                                            <div className="rich-text whitespace-break-spaces font-light text-xl line-clamp-[9]">
                                                <p>{industry.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="relative w-full h-full top-0">
                                    <Image
                                        src={industry.imageUrl}
                                        alt={industry.alt}
                                        width={800}
                                        height={800}
                                        loading="lazy"
                                        decoding="async"
                                        className="max-h-[65vh] w-full h-full object-cover  drop-shadow-2xl"
                                    />
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
                {/* Navigation Button */}
                <div >
                    <button
                        id="rightIcon"
                        onClick={() => scroll('right')}
                        className="transition-all  rounded-full flex items-center justify-center transition-all active:scale-95 w-11 h-11 bg-white shadow-md text-primary hover:shadow-lg absolute right-8 translate-x-[50%] z-30 top-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="28" height="28">
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="m16.8 19.4 6.8-6.8-6.8-6.8M23.7 12.8H2"
                            />
                        </svg>
                    </button>
                </div>
                <div >
                    <button
                        id="leftIcon"
                        onClick={() => scroll('left')}
                        className="transition-all rounded-full flex items-center justify-center transition-all active:scale-95 w-11 h-11 bg-white shadow-md text-primary hover:shadow-lg absolute left-0  translate-x-[50%] z-30 top-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 26 26"
                            width="28"
                            height="28"
                            className=""
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M9.2 19.4 2.4 12.6l6.8-6.8M2.3 12.8h21.7"
                            ></path>
                        </svg>
                    </button>
                </div>
                {/* Mobile Pagination Dots */}
                <div className="md:hidden flex justify-center w-full mt-3"></div>
            </div>

            <div className="text-2xl text-center text-current flex flex-col w-full justify-center items-center md:items-center my-8  gap-6  ">
                {/* Header */}
                <div className="transition-all md:flex-row">
                    <h2 className="text-4xl 2xl:text-6xl font-medium md:font-bold text-primary mb-8">
                        {isFa ? "مواد را می‌شناسیم، الهام می‌بخشیم" : "Master of materials' industries"}
                    </h2>
                    <div className="text-lg xl:text-xl 2xl:text-2xl  text-dark px-8">
                        <p>
                            {isFa ? "ما با بهره‌گیری از دانش و تجربه ۴,۴۰۰ نیروی متخصص خود، الهام‌بخش شرکت‌های برتر در صنایع خود و دنیای طراحی هستیم و به آنها کمک می‌کنیم تا قابلیت‌های بی‌پایان پنهان در مواد را شکوفا سازند." : "Drawing on the expertise of our 4,400 employees, we fire the imagination of leading companies in their fields and in the world of design, enabling them to enhance the infinite potential inherent in materials. "}
                        </p>

                    </div>
                    <div className="hidden md:block"></div>
                </div>
            </div>
        </div>
    );
}

export default OurConsumers;