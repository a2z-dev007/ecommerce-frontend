"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import PrimaryButton from "../common/PrimaryButton";
import Link from "next/link";

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
  const bagRotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const bagRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const bagMoveX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const bagMoveY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  // Scroll detection for floating video button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Background parallax: moves faster than scroll
  const bgY = useTransform(scrollY, [0, 1000], [0, 400]);

  // Heading reveal: moves with scroll
  const textTranslateY = useTransform(scrollY, [0, 500], [0, -200]);
  const textScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  // Product bag: Stays more fixed (moves very slowly) - TRUE PARALLAX
  const bagParallax = useTransform(scrollY, [0, 1000], [0, 350]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a]"
    >
      {/* Background Image Layer (Parallax) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg.png"
          alt="Nature background"
          className="w-full h-full object-cover brightness-[0.9] scale-115"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
      </motion.div>

      {/* Top Text: "A wearable workstation" (Centered above everything) */}
      <div className="absolute top-[30%] md:top-[20%] z-30 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white text-base md:text-xl lg:text-[2vw] font-normal tracking-normal"
        >
          A wearable workstation
        </motion.p>
      </div>

      {/* Monolithic Background Text: ANYWHERE */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h1
          style={{
            y: textTranslateY,
            scale: textScale,
            opacity: textOpacity,
          }}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-[15vw] pb-[8rem] md:pb-[12.5rem] md:text-[18vw] lg:text-[15vw] font-black text-[#F2EFE9] leading-none tracking-[-0.04em] select-none uppercase text-center"
        >
          ANYWHERE
        </motion.h1>
      </div>

      {/* Main Product Container (Grounded Bag) with Parallax */}
      <div className="relative z-20 w-full max-w-7xl px-4 flex flex-col items-center md:mt-auto mt-64 xl:pt-[10rem] perspective-[1200px]">
        <motion.div
          style={{ y: bagParallax }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-col md:flex-row justify-center items-center -translate-y-20 md:-translate-y-12"
        >
          {/* Wrapper for floating animation */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="w-full flex justify-center"
          >
            {/* Inner image for mouse-driven tilt and shift */}
            <motion.img
              src="/assets/bag.png"
              alt="Kangpack Product"
              className="w-[90%] md:w-[88%] lg:w-[93%] xl:w-[98%] h-auto object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.6)]"
              style={{
                rotateX: bagRotateX,
                rotateY: bagRotateY,
                x: bagMoveX,
                y: bagMoveY,
              }}
            />
          </motion.div>

          {/* Mobile Only: CTA Button (Stacked below bag) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex md:hidden flex-col items-center gap-4 mt-2"
          >
            <p className="text-white text-sm font-normal tracking-normal">
              Work without limits
            </p>
            <Link href="/products">
              <button className="flex items-center gap-3 bg-white px-1.5 py-1.5 pr-8 rounded-full shadow-lg">
                <div className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center text-white">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-brand-brown font-bold text-xs tracking-wide uppercase">
                  Shop Now
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Interface Elements (Desktop Only) */}
      <div className="hidden md:flex absolute bottom-8 md:bottom-12 left-0 right-0 z-40 px-6 md:px-12 lg:px-16 flex-row items-end justify-between pointer-events-none">
        {/* Left Side: Shop CTA */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3 md:gap-4 pointer-events-auto mb-10 md:mb-0"
        >
          <p className="text-white text-sm md:text-base font-normal tracking-normal hidden md:block">
            Work without limits
          </p>
          <Link href="/products">
            <PrimaryButton>Shop Now</PrimaryButton>
          </Link>
        </motion.div>

        {/* Right Side: Video Preview - Original Position */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1 }}
              className="hidden md:flex flex-col items-center gap-3 group cursor-pointer pointer-events-auto"
            >
              <div className="relative w-44 md:w-52 lg:w-56 aspect-video rounded-2xl md:rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-white/40 transition-all">
                <img
                  src="https://picsum.photos/seed/kang-action/500/300"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[0.75]"
                  alt="Video thumbnail"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center ring-1 ring-white/30 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                  </div>
                </div>
              </div>
              <p className="text-[9px] md:text-[10px] font-extrabold text-white uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-all">
                WATCH VIDEO
              </p>
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
              className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_40px_rgba(0,0,0,0.4)] group-hover:border-white/90 transition-all z-10"
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
