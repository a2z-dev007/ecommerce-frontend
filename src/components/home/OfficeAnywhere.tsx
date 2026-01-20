"use client"
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';

const OfficeAnywhere: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

    // All images from the tickers folder
    const carouselImages = [
        ASSETS.TICKERS.MAIN,
        ASSETS.TICKERS.IMG_354A7762,
        ASSETS.TICKERS.IMG_354A7767,
        ASSETS.TICKERS.IMG_354A7756,
        ASSETS.TICKERS.IMG_354A7724,
        ASSETS.TICKERS.IMG_354A7751,
        ASSETS.TICKERS.MAIN2,
        ASSETS.TICKERS.FIRST,
        ASSETS.TICKERS.SECOND,
        ASSETS.TICKERS.SIDE,
    ];

    const { isOpen, images, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

    useEffect(() => {
        const updateConstraints = () => {
            if (scrollContainerRef.current) {
                const scrollWidth = scrollContainerRef.current.scrollWidth;
                const clientWidth = scrollContainerRef.current.clientWidth;
                setDragConstraints({
                    left: -(scrollWidth - clientWidth),
                    right: 0
                });
            }
        };

        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        return () => window.removeEventListener('resize', updateConstraints);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400; // Adjust based on card width + gap
            const newScrollPosition = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className=" py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#D4CEC4] px-4 py-2 rounded-lg mb-6">
                        <ImageIcon className="w-3 h-3 brand-primary" />
                        <span className="text-[11px] font-medium tracking-wide brand-primary uppercase">
                            The Experience
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.1] mb-4 tracking-tight">
                        <span className="text-[#6B4A2D] font-bold">Your Office </span>
                        <span className="text-[#B8AFA1] font-bold">Anywhere</span>
                    </h2>

                    {/* Description */}
                    <p className="light-text text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Turn any space into productive workspace instantly, comfortably, effortlessly.
                    </p>
                </div>
            </div>

            {/* Carousel - Centered with draggable */}
            <div className="relative group">
                {/* Previous Button */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    aria-label="Previous"
                >
                    <ChevronLeft className="w-6 h-6 text-[#6B5D4F]" />
                </button>

                {/* Next Button */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    aria-label="Next"
                >
                    <ChevronRight className="w-6 h-6 text-[#6B5D4F]" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="overflow-hidden cursor-grab active:cursor-grabbing"
                >
                    <motion.div
                        drag="x"
                        dragConstraints={dragConstraints}
                        dragElastic={0.1}
                        dragMomentum={true}
                        className="flex gap-4 md:gap-6 py-4"
                        style={{
                            width: 'max-content',
                        }}
                    >
                        {carouselImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 w-[280px] md:w-[350px] h-[200px] md:h-[240px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-shadow duration-300 cursor-pointer"
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => openLightbox(carouselImages, index)}
                            >
                                <img
                                    src={image}
                                    className="w-full h-full object-cover pointer-events-none"
                                    alt={`Office scene ${index + 1}`}
                                    draggable={false}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <Lightbox
                isOpen={isOpen}
                images={images}
                currentIndex={currentIndex}
                onClose={closeLightbox}
                onIndexChange={setIndex}
            />
        </section>
    );
};

export default OfficeAnywhere;
