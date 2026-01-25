
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronRight, Play, Star, MapPin,
  Briefcase, Shield, Zap, Laptop, Globe, User,
  ArrowRight, Check, Plus, Minus
} from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import GalleryIntro from '@/components/home/GalleryIntro';
import Features from '@/components/home/Features';
import DesignedToMove from '@/components/home/DesignedToMove';
import InAction from '@/components/home/InAction';
import WhyChoose from '@/components/home/WhyChoose';
import Stats from '@/components/home/Stats';
import WearableSection from '@/components/home/WearableSection';
import GalleryThree from '@/components/home/GalleryThree';
import OfficeAnywhere from '@/components/home/OfficeAnywhere';
import Testimonials from '@/components/home/Testimonials';
import TechSpecs from '@/components/home/TechSpecs';
import RealMoments from '@/components/home/RealMoments';
import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import SectionDivider from '@/components/common/SectionDivider';
import { Footer } from '@/components/layout/footer';
import { ASSETS } from '@/constants/assets';
import PrimaryButton from '@/components/common/PrimaryButton';


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-beige">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <SectionDivider />
        <GalleryIntro />
        <SectionDivider />
        <Features />
        <DesignedToMove />
        <InAction />
        <SectionDivider />
        <WhyChoose />
        <SectionDivider />
        <Stats />
        <SectionDivider />
        <WearableSection />
        <SectionDivider />
        <GalleryThree />
        <SectionDivider />
        <OfficeAnywhere />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <TechSpecs />
        <SectionDivider />
        <RealMoments />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <FAQ />
        <SectionDivider />

        {/* Large Product Reveal */}
        <div className="w-full h-[60vh] md:h-screen relative overflow-hidden">
          <img src={ASSETS.TICKERS.MAIN2} className="w-full h-full object-cover" alt="Detail View" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Other Products Section */}
        <section className="py-24 md:py-32 bg-transparent px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            {/* Header */}
            <div className="text-center flex flex-col items-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#D4CEC4]/40 px-4 py-2 rounded-lg mb-8">
                <Globe className="w-3.5 h-3.5 text-[#8B7E6F]" />
                <span className="text-[11px] font-medium tracking-widest uppercase text-[#8B7E6F]">
                  Our Products
                </span>
              </div>

              <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] font-semibold mb-6 tracking-tight">
                <span className="text-[#6B4A2D]">Our Other </span>
                <span className="text-[#B8AFA1]">Products</span>
              </h2>

              <p className="text-[#B8AFA1] text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
                Explore more thoughtfully designed products crafted to complement your everyday carry and work style.
              </p>

              <PrimaryButton>View products</PrimaryButton>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {[
                {
                  title: "Kangpack New Edition",
                  date: "Mar 12, 2025",
                  tag: "Launch Event",
                  img: ASSETS.TICKERS.MAIN
                },
                {
                  title: "New Brown Bag",
                  date: "Apr 1, 2024",
                  tag: "Classic",
                  img: ASSETS.TICKERS.FIRST
                },
                {
                  title: "Portable Bag",
                  date: "Sep 14, 2024",
                  tag: "Photography",
                  img: ASSETS.TICKERS.IMG_354A7762
                }
              ].map((product, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-[20px] mb-6 aspect-[1.4/1]">
                    <img
                      src={product.img}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={product.title}
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[17px] font-bold text-[#2D241E] mb-1">{product.title}</h3>
                      <p className="text-[#B8AFA1] text-[13px]">{product.date}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EAE5DC] text-[#6B4A2D] px-4 py-2 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
