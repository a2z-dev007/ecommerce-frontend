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
        [0, 0.2, 0.35],
        ["#b7ad9f", "#b7ad9f", "#6B4A2D"]
    );
    
    const backColor = useTransform(
        scrollYProgress,
        [0, 0.35, 0.5, 0.65],
        ["#b7ad9f", "#b7ad9f", "#b7ad9f", "#6B4A2D"]
    );
    
    const sidewaysColor = useTransform(
        scrollYProgress,
        [0, 0.65, 0.8, 1],
        ["#b7ad9f", "#b7ad9f", "#b7ad9f", "#6B4A2D"]
    );

    // Image 1 (Front) - Appears first with 3D perspective
    const image1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 0, 1]);
    const image1Scale = useTransform(scrollYProgress, [0, 0.1, 0.35], [0.8, 0.8, 1]);
    const image1Y = useTransform(scrollYProgress, [0, 0.1, 0.35], [120, 120, 0]);
    const image1RotateX = useTransform(scrollYProgress, [0.1, 0.35], [25, 0]); // 3D tilt
    const image1RotateY = useTransform(scrollYProgress, [0.1, 0.35], [-8, 0]); // 3D rotation

    // Image 2 (Back) - Appears second with 3D perspective and slide
    const image2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, 1]);
    const image2Scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.8, 0.8, 1]);
    const image2Y = useTransform(scrollYProgress, [0, 0.3, 0.6], [120, 120, 0]);
    const image2X = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
    const image2RotateX = useTransform(scrollYProgress, [0.3, 0.6], [20, 0]); // 3D tilt
    const image2RotateY = useTransform(scrollYProgress, [0.3, 0.6], [10, 0]); // 3D rotation

    // Image 3 (Sideways) - Appears last with 3D perspective
    const image3Opacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [0, 0, 1]);
    const image3Scale = useTransform(scrollYProgress, [0, 0.55, 0.85], [0.8, 0.8, 1]);
    const image3Y = useTransform(scrollYProgress, [0, 0.55, 0.85], [120, 120, 0]);
    const image3X = useTransform(scrollYProgress, [0.55, 0.85], [100, 0]);
    const image3RotateX = useTransform(scrollYProgress, [0.55, 0.85], [20, 0]); // 3D tilt
    const image3RotateY = useTransform(scrollYProgress, [0.55, 0.85], [12, 0]); // 3D rotation

    return (
        // Wrapper with extra height to create scroll distance for pinning effect
        <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
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

                        {/* Images Grid - Cinematic 3D Scroll Animation */}
                        <div className="relative flex items-center justify-center max-w-6xl mx-auto h-[350px] md:h-[450px]" style={{ perspective: '1200px' }}>
                            {/* Image 1 - Front (Left) - Smallest, Appears First with 3D Tilt */}
                            <motion.div
                                style={{
                                    opacity: image1Opacity,
                                    scale: image1Scale,
                                    y: image1Y,
                                    rotateX: image1RotateX,
                                    rotateY: image1RotateY,
                                    transformStyle: 'preserve-3d',
                                }}
                                className="absolute left-[5%] md:left-[15%] w-[32%] md:w-[340px] h-[75%] md:h-[340px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.2)] z-10 cursor-pointer will-change-transform"
                                onClick={() => openLightbox(images, 0)}
                            >
                                <img
                                    src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_1}
                                    className="w-full h-full object-cover"
                                    alt="Front carry"
                                />
                            </motion.div>

                            {/* Image 2 - Back (Center) - Medium, Appears Second, Overlaps Image 1 */}
                            <motion.div
                                style={{
                                    opacity: image2Opacity,
                                    scale: image2Scale,
                                    y: image2Y,
                                    x: image2X,
                                    rotateX: image2RotateX,
                                    rotateY: image2RotateY,
                                    transformStyle: 'preserve-3d',
                                }}
                                className="absolute left-[25%] md:left-[32%] w-[40%] md:w-[420px] h-[82%] md:h-[370px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] z-20 cursor-pointer will-change-transform"
                                onClick={() => openLightbox(images, 1)}
                            >
                                <img
                                    src={ASSETS.FRONT_BACK_SIDEWAYS.IMAGE_2}
                                    className="w-full h-full object-cover"
                                    alt="Back carry"
                                />
                            </motion.div>

                            {/* Image 3 - Sideways (Right) - Largest, Appears Last, Overlaps Image 2 */}
                            <motion.div
                                style={{
                                    opacity: image3Opacity,
                                    scale: image3Scale,
                                    y: image3Y,
                                    x: image3X,
                                    rotateX: image3RotateX,
                                    rotateY: image3RotateY,
                                    transformStyle: 'preserve-3d',
                                }}
                                className="absolute left-[45%] md:left-[48%] w-[48%] md:w-[480px] h-[92%] md:h-[410px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_35px_90px_rgba(0,0,0,0.3)] z-30 cursor-pointer will-change-transform"
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
