"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS } from '@/constants/assets';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';

const GalleryThree: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const images = [
        ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_1,
        ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_2,
        ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_3,
    ];

    const { isOpen, images: lightboxImages, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

    // Scroll progress for the pinned section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Text color animations - progressive color change synchronized with image reveals
    const frontColor = useTransform(
        scrollYProgress,
        [0, 0.15, 0.30],
        ["#b7ad9f", "#b7ad9f", "#6B4A2D"]
    );
    
    const backColor = useTransform(
        scrollYProgress,
        [0, 0.3, 0.45, 0.6],
        ["#b7ad9f", "#b7ad9f", "#b7ad9f", "#6B4A2D"]
    );
    
    const sidewaysColor = useTransform(
        scrollYProgress,
        [0, 0.6, 0.75, 0.85],
        ["#b7ad9f", "#b7ad9f", "#b7ad9f", "#6B4A2D"]
    );

    // Image 1 (Front) - Starts CENTER, then moves LEFT when Image 2 appears
    const image1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.25], [0, 0, 1]);
    const image1Scale = useTransform(scrollYProgress, [0, 0.05, 0.25], [0.75, 0.75, 1]);
    const image1Y = useTransform(scrollYProgress, [0, 0.05, 0.25], [120, 120, 0]);
    const image1X = useTransform(scrollYProgress, [0.30, 0.5], [-120, -450]); // Moves further LEFT
    const image1RotateX = useTransform(scrollYProgress, [0.05, 0.25], [0, 0]);
    const image1RotateY = useTransform(scrollYProgress, [0.05, 0.25, 0.4], [0, 0, 30]); // Tilts left
    const image1RotateZ = useTransform(scrollYProgress, [0.25, 0.4], [0, 0]); // Rotates left

    // Image 2 (Back) - Appears CENTER-RIGHT, pushes Image 1 to the left
    const image2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 1]);
    const image2Scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.75, 0.85, 1]);
    const image2Y = useTransform(scrollYProgress, [0, 0.3, 0.5], [120, 120, 0]);
    const image2X = useTransform(scrollYProgress, [0.3, 0.5, 0.65], [100, 0, -250]); // Moves LEFT for image 3
    const image2RotateX = useTransform(scrollYProgress, [0.3, 0.5], [0, 0]);
    const image2RotateY = useTransform(scrollYProgress, [0.3, 0.5, 0.65], [0, 20, 30]); // Tilts left
    const image2RotateZ = useTransform(scrollYProgress, [0.5, 0.65], [0, 0]); // Rotates left

    // Image 3 (Sideways) - Appears CENTER-RIGHT, pushes others aside
    const image3Opacity = useTransform(scrollYProgress, [0, 0.55, 0.75], [0, 0, 1]);
    const image3Scale = useTransform(scrollYProgress, [0, 0.55, 0.75], [0.75, 0.75, 1]);
    const image3Y = useTransform(scrollYProgress, [0, 0.55, 0.75], [120, 120, 0]);
    const image3X = useTransform(scrollYProgress, [0.55, 0.75], [120, 0]); // Stays slightly right of center
    const image3RotateX = useTransform(scrollYProgress, [0.55, 0.75], [0, 0]);
    const image3RotateY = useTransform(scrollYProgress, [0.55, 0.75], [15, 25]); // Slight right tilt
    const image3RotateZ = useTransform(scrollYProgress, [0.55, 0.75], [0, 0]); // Rotates right

    return (
        // Wrapper with extra height to create scroll distance for pinning effect
        // Increased to 400vh for longer hold time at the end
        <div ref={containerRef} className="relative" style={{ height: '400vh' }}>
            {/* Sticky container that stays fixed while scrolling */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <section className="w-full py-20 md:py-32 px-6">
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

                            {/* Animated Heading with Progressive Color Change */}
                            <h2 className="text-[clamp(2rem,6vw,4.5rem)] leading-[1.1] mb-4 tracking-tight font-bold">
                                <motion.span style={{ color: frontColor }}>Front. </motion.span>
                                <motion.span style={{ color: backColor }}>Back. </motion.span>
                                <motion.span style={{ color: sidewaysColor }}>Sideways.</motion.span>
                            </h2>

                            {/* Description */}
                            <p className="text-[#8B7E6F] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                                One bag. Three ways to wear it.
                            </p>
                        </div>

                        {/* Images Grid - Cinematic 3D Choreographed Animation */}
                        <div className="relative flex items-center justify-center max-w-6xl mx-auto h-[350px] md:h-[450px]" style={{ perspective: '1500px' }}>
                            {/* Image 1 - Front - Starts CENTER, moves LEFT when Image 2 appears */}
                            <motion.div
                                style={{
                                    opacity: image1Opacity,
                                    scale: image1Scale,
                                    y: image1Y,
                                    x: image1X,
                                    rotateX: image1RotateX,
                                    rotateY: image1RotateY,
                                    rotateZ: image1RotateZ,
                                    transformStyle: 'preserve-3d',
                                }}
                                className="absolute left-1/2 -translate-x-1/2 w-[32%] md:w-[500px] h-[75%] md:h-[340px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.2)] z-10 cursor-pointer will-change-transform"
                                onClick={() => openLightbox(images, 0)}
                            >
                                <img
                                    src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_1}
                                    className="w-full h-full object-cover"
                                    alt="Front carry"
                                />
                            </motion.div>

                            {/* Image 2 - Back - Appears CENTER-RIGHT, pushes Image 1 left */}
                            <motion.div
                                style={{
                                    opacity: image2Opacity,
                                    scale: image2Scale,
                                    y: image2Y,
                                    x: image2X,
                                    rotateX: image2RotateX,
                                    rotateY: image2RotateY,
                                    rotateZ: image2RotateZ,
                                    transformStyle: 'preserve-3d',
                                }}
                                className="absolute left-1/2 -translate-x-1/2 w-[40%] md:w-[520px] h-[82%] md:h-[370px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] z-20 cursor-pointer will-change-transform"
                                onClick={() => openLightbox(images, 1)}
                            >
                                <img
                                    src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_2}
                                    className="w-full h-full object-cover"
                                    alt="Back carry"
                                />
                            </motion.div>

                            {/* Image 3 - Sideways - Appears CENTER-RIGHT, pushes others aside */}
                            <motion.div
                                style={{
                                    opacity: image3Opacity,
                                    scale: image3Scale,
                                    y: image3Y,
                                    x: image3X,
                                    rotateX: image3RotateX,
                                    rotateY: image3RotateY,
                                    rotateZ: image3RotateZ,
                                    transformStyle: 'preserve-3d',
                                }}
                                className="absolute left-1/2 -translate-x-1/2 w-[48%] md:w-[540px] h-[92%] md:h-[410px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_35px_90px_rgba(0,0,0,0.3)] z-30 cursor-pointer will-change-transform"
                                onClick={() => openLightbox(images, 2)}
                            >
                                <img
                                    src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_3}
                                    className="w-full h-full object-cover"
                                    alt="Sideways carry"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>

            <Lightbox
                isOpen={isOpen}
                images={lightboxImages}
                currentIndex={currentIndex}
                onClose={closeLightbox}
                onIndexChange={setIndex}
            />
        </div>
    );
};

export default GalleryThree;
