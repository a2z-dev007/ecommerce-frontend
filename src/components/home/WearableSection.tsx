"use client"
import React from 'react';
import { Check, Play } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';

const WearableSection: React.FC = () => {
  const { isOpen, images, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

  return (
    <section className="bg-brand-beige py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-[#F2EFE9] shadow-lg rounded-[40px] p-12 flex flex-col justify-between items-start min-h-[500px]">
          <div>
            <div className="flex items-center w-max gap-2 mb-8 bg-[#D4CEC4] px-4 py-2 rounded-lg">
              <div className="w-1.5 h-1.5 bg-[#6B4A2D] rounded-full"></div>
              <span className="text-[11px] font-medium tracking-wide brand-primary uppercase">Why Kangpack</span>
            </div>
            <h2 className="text-[clamp(1.5rem,5vw,4.5rem)] leading-[1.1] mb-8 tracking-tight">
              <span className="text-[#B8AFA1] font-bold block">Wearable</span>
              <span className="text-[#6B4A2D] font-bold block">Workstation</span>
            </h2>
            <p className="light-text mb-12 max-w-sm leading-relaxed">A smarter way to work on the move. Kangpack combines comfort, mobility, and smart design for everyday productivity.</p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest"><div className="w-4 h-4 rounded-full bg-brand-beige flex items-center justify-center"><Check className="w-2 h-2" /></div> Hands Free Working</li>
              <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest"><div className="w-4 h-4 rounded-full bg-brand-beige flex items-center justify-center"><Check className="w-2 h-2" /></div> Ergonomic Fit</li>
              <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest"><div className="w-4 h-4 rounded-full bg-brand-beige flex items-center justify-center"><Check className="w-2 h-2" /></div> Quick Access Setup</li>
            </ul>
          </div>

          <button className="flex items-center gap-3 bg-brand-brown text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all shadow-lg mt-12">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><Play className="w-3 h-3 fill-current" /></div>
            <span className="text-xs font-bold uppercase tracking-wider">Shop Now</span>
          </button>
        </div>

        <div
          className="flex-1 rounded-[40px] overflow-hidden cursor-pointer group"
          onClick={() => openLightbox([ASSETS.TICKERS.MAIN], 0)}
        >
          <img src={ASSETS.TICKERS.MAIN} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Wearable" />
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

export default WearableSection;
