
"use client"
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Mouse position tracking for bag interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Map mouse movement to subtle rotation and translation
  const bagRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const bagRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const bagMoveX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const bagMoveY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  // Scroll detection for floating video button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize coordinates to -0.5 to 0.5
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Background parallax: subtle downward drift to create deep space
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);

  // Heading reveal: rises from below the bag
  const textTranslateY = useTransform(scrollY, [0, 500], [50, -150]);
  const textScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textOpacity = useTransform(scrollY, [0, 300], [0.8, 1]);

  // Product bag: very subtle parallax to feel like it's in a different plane
  const bagParallax = useTransform(scrollY, [0, 600], [0, -50]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a]"
    >
      {/* Background Image Layer (Parallax) */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/assets/hero-bg.png"
          alt="Nature background"
          className="w-full h-full object-cover brightness-[0.9] scale-115"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
      </motion.div>

      {/* Top Text: "A wearable workstation" (Centered above everything) */}
      <div className="absolute top-32 md:top-[30%] z-30 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white text-lg md:text-[2.5vw] opacity-100"
        >
          A wearable workstation
        </motion.p>
      </div>

      {/* Monolithic Background Text: ANYWHERE */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.h1
          style={{
            y: textTranslateY,
            scale: textScale,
            opacity: textOpacity
          }}
          initial={{ opacity: 0, scale: 0.94, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-[18vw] font-[1000] text-brand-beige leading-none tracking-[-0.06em] select-none uppercase text-center"
        >
          ANYWHERE
        </motion.h1>
      </div>

      {/* Main Product Container (Grounded Bag) */}
      <div className="relative z-20 w-full max-w-7xl px-4 flex flex-col items-center mt-auto pb-10 perspective-[1000px]">
        <motion.div
          style={{ y: bagParallax }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex justify-center -translate-y-16"
        >
          {/* Wrapper for floating animation */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2
            }}
            className="w-full flex justify-center"
          >
            {/* Inner image for mouse-driven tilt and shift */}
            <motion.img
              src="/assets/bag.png"
              alt="Kangpack Product"
              className="w-[95%] md:w-[85%] lg:w-[75%] h-auto object-contain drop-shadow-[0_80px_60px_rgba(0,0,0,0.5)]"
              style={{
                rotateX: bagRotateX,
                rotateY: bagRotateY,
                x: bagMoveX,
                y: bagMoveY
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Interface Elements */}
      <div className="absolute bottom-12 left-0 right-0 z-40 px-10 md:px-20 flex items-end justify-between pointer-events-none">
        {/* Left Side: Shop CTA */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-5 pointer-events-auto"
        >
          <p className="text-white text-[15px] font-normal tracking-tight opacity-90">Work without limits</p>
          <button className="flex items-center gap-4 bg-white px-2 py-2 pr-10 rounded-full hover:shadow-2xl transition-all group scale-110 origin-left">
            <div className="w-11 h-11 bg-brand-brown rounded-full flex items-center justify-center text-white group-hover:bg-brand-brown/90 transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-brand-brown font-[900] text-sm tracking-wider uppercase">Shop Now</span>
          </button>
        </motion.div>

        {/* Right Side: Video Preview - Original Position */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-4 group cursor-pointer pointer-events-auto"
            >
              <div className="relative w-52 md:w-64 aspect-video rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-white/40 transition-all">
                <img
                  src="https://picsum.photos/seed/kang-action/500/300"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[0.8]"
                  alt="Video thumbnail"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center ring-1 ring-white/30 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.5em] opacity-70 group-hover:opacity-100 transition-all">WATCH VIDEO</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Circular Video Button - Appears on Scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-50 cursor-pointer group"
          >
            {/* Main Circular Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_40px_rgba(0,0,0,0.4)] group-hover:border-white/90 transition-all z-10"
            >
              {/* Pulse Animation Rings - Behind the button */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-white/40"
                />
                <motion.div
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-0 rounded-full bg-white/30"
                />
              </div>
              <img
                src="https://picsum.photos/seed/kang-action/500/300"
                className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.9] transition-all"
                alt="Video thumbnail"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center ring-2 ring-white/50 group-hover:bg-white/30 transition-all">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white ml-0.5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;

