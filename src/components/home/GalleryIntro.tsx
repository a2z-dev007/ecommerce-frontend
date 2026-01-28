"use client"
import { ASSETS } from '@/constants/assets';
import React from 'react';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';
import { ParallaxImage } from '@/components/common/ScrollSection';

const GalleryIntro: React.FC = () => {
  const images = [
    ASSETS.TICKERS.SECOND,
    ASSETS.TICKERS.MAIN2,
    ASSETS.TICKERS.SIDE,
  ];

  const { isOpen, images: lightboxImages, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

  return (
    <section className="bg-brand-beige py-12 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
          onClick={() => openLightbox(images, 0)}
        >
          <ParallaxImage
            src={ASSETS.TICKERS.SECOND}
            className="w-full h-full"
            alt="Bag Close-up"
          />
        </div>
        <div
          className="aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
          onClick={() => openLightbox(images, 1)}
        >
          <ParallaxImage
            src={ASSETS.TICKERS.MAIN2}
            className="w-full h-full"
            alt="Harness Close-up"
          />
        </div>
        <div
          className="aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
          onClick={() => openLightbox(images, 2)}
        >
          <ParallaxImage
            src={ASSETS.TICKERS.SIDE}
            className="w-full h-full"
            alt="Side Close-up"
          />
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

export default GalleryIntro;
