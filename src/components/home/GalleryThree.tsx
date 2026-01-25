"use client"
import React from 'react';
import { ASSETS } from '@/constants/assets';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';

const GalleryThree: React.FC = () => {
    const images = [
        ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_1,
        ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_2,
        ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_3,
    ];

    const { isOpen, images: lightboxImages, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

    return (
        <section className=" py-20 md:py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20 flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#D4CEC4] px-4 py-2 rounded-lg mb-6">
                        <div className="w-1.5 h-1.5 bg-[#6B4A2D] rounded-full"></div>
                        <span className="text-[11px] font-medium tracking-wide brand-primary uppercase">
                            Versatility
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] leading-[1.1] mb-4 tracking-tight">
                        <span className="text-[#6B4A2D] font-bold">Front. Back. </span>
                        <span className="text-[#B8AFA1] font-bold">Sideways.</span>
                    </h2>

                    {/* Description */}
                    <p className="light-text text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        One bag. Three ways to wear it.
                    </p>
                </div>

                {/* Images Grid */}
                <div className="relative flex items-end justify-center gap-0 max-w-5xl mx-auto h-[400px] md:h-[500px]">
                    {/* Left Image - Front */}
                    <div
                        className="absolute left-0 md:left-[5%] bottom-0 w-[28%] md:w-[280px] h-[75%] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-10 cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openLightbox(images, 0)}
                    >
                        <img
                            src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_1}
                            className="w-full h-full object-cover"
                            alt="Front carry"
                        />
                    </div>

                    {/* Center Image - Back (Largest) */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[42%] md:w-[420px] h-[90%] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)] z-20 cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openLightbox(images, 1)}
                    >
                        <img
                            src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_2}
                            className="w-full h-full object-cover"
                            alt="Back carry"
                        />
                    </div>

                    {/* Right Image - Sideways (Tallest) */}
                    <div
                        className="absolute right-0 md:right-[5%] bottom-0 w-[35%] md:w-[350px] h-full md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.18)] z-15 cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openLightbox(images, 2)}
                    >
                        <img
                            src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_3}
                            className="w-full h-full object-cover"
                            alt="Sideways carry"
                        />
                    </div>
                </div>
            </div>

            <Lightbox
                isOpen={isOpen}
                images={lightboxImages}
                currentIndex={currentIndex}
                onClose={closeLightbox}
                onIndexChange={setIndex}
            />
        </section>
    );
};

export default GalleryThree;
