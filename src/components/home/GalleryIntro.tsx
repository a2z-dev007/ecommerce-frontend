
"use client"
import { ASSETS } from '@/constants/assets';
import React from 'react';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';

const GalleryIntro: React.FC = () => {
  const images = [
    ASSETS.TICKERS.SECOND,
    ASSETS.TICKERS.MAIN2,
    ASSETS.TICKERS.SIDE,
  ];

  const { isOpen, images: lightboxImages, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

  return (
    <section className="bg-brand-beige py-12 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="aspect-[16/9] md:aspect-[4/3] overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(images, 0)}
        >
          <img
            src={ASSETS.TICKERS.SECOND}
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            alt="Bag Close-up"
            onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/kang-detail1/800/600")}
          />
        </div>
        <div
          className="aspect-[16/9] md:aspect-[4/3] overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(images, 1)}
        >
          <img
            src={ASSETS.TICKERS.MAIN2}
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            alt="Harness Close-up"
            onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/kang-detail2/800/600")}
          />
        </div>
        <div
          className="aspect-[16/9] md:aspect-[4/3] overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(images, 2)}
        >
          <img
            src={ASSETS.TICKERS.SIDE}
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            alt="Side Close-up"
            onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/kang-detail3/800/600")}
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
