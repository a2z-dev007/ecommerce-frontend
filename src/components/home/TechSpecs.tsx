"use client"
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';

const TechSpecs: React.FC = () => {
  const { isOpen, images, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

  const specs = [
    { label: "Tray Size (Unfolded)", value: "16\" × 11\" × 0.5\"" },
    { label: "Tray Size (Folded)", value: "11\" × 8\" × 2\"" },
    { label: "Weight", value: "820 g (1.8 lbs)" },
    { label: "Load Capacity", value: "Up to 3.6 kg" },
    { label: "Laptop Fit", value: "13\" – 15.6\"" },
    { label: "Chest Fit", value: "32\" – 48\"", fullRow: true },
    { label: "Exterior", value: "Full-grain leather" },
    { label: "Frame", value: "Aluminum alloy" },
    { label: "Adjustability", value: "Fully adjustable" },
    { label: "Exterior", value: "Full-grain leather" },
    { label: "Frame", value: "Aluminum alloy" },
    { label: "Grip Pads", value: "Silicone anti-slip" },
    { label: "Cleaning", value: "Damp cloth", fullRow: true },
    { label: "Storage", value: "Cool & dry place" }
  ];

  return (
    <section className="bg-transparent py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Column: Image & Intro */}
        <div className="flex-1 w-full lg:sticky lg:top-24">
          <div
            className="rounded-[32px] overflow-hidden shadow-xl mb-10 h-[600px] cursor-pointer group"
            onClick={() => openLightbox([ASSETS.TICKERS.FIRST], 0)}
          >
            <img
              src={ASSETS.TICKERS.FIRST}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Technical Details"
            />
          </div>
          <div className="max-w-lg">
            <h3 className="text-[1.87rem] leading-[1.3] text-[#6B4A2D] font-normal">
              <span className="font-bold">Designed for</span> <span className="text-[#8B7E6F]">work anywhere.</span>
              {" "}Built for <span className="font-bold">comfort</span>, <span className="font-bold">balance</span>, and
              {" "}<span className="font-bold">productivity</span> <span className="text-[#8B7E6F]">on the move.</span>
            </h3>
            <div className="mt-8">
              <PrimaryButton>Buy Now</PrimaryButton>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications */}
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="mb-12 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#D4CEC4] px-4 py-2 rounded-lg mb-6">
              <div className="w-1.5 h-1.5 bg-[#6B4A2D] rounded-full"></div>
              <span className="text-[11px] font-medium tracking-wide brand-primary uppercase">
                Technical Detail
              </span>
            </div>

            <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight flex flex-col">
              <span className="text-[#6B4A2D] font-bold">Technical</span>
              <span className="text-[#B8AFA1] font-bold">Specifications</span>
            </h2>
          </div>

          <div className="w-full space-y-0 text-[13px] md:text-[14px]">
            {specs.map((s, i) => (
              <div
                key={i}
                className={`flex ${s.fullRow ? 'flex-col py-6' : 'justify-between items-center py-5'} border-b border-[#6B4A2D]/10`}
              >
                <span className={`text-[#8B7E6F] font-normal ${s.fullRow ? 'mb-4 text-left' : ''}`}>
                  {s.label}
                </span>
                <span
                  className={`text-[#6B4A2D] font-medium transition-colors ${s.fullRow
                    ? 'text-center w-full block text-base md:text-lg tracking-wide'
                    : 'text-right ml-4'
                    }`}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
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

export default TechSpecs;
