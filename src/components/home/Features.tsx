
"use client"
import Link from 'next/link';
import Image from 'next/image';
import side2 from '@/assets/side2.png';
import { Laptop, Briefcase, User, Zap, ArrowUpRight } from 'lucide-react';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';

const Features: React.FC = () => {
  const { isOpen, images, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox();

  const features = [
    {
      icon: <Laptop className="w-5 h-5 text-brand-brown" />,
      title: "Hands free work",
      desc: "Work comfortably without needing a desk or table"
    },
    {
      icon: <Briefcase className="w-5 h-5 text-brand-brown" />,
      title: "Built for mobility",
      desc: "Designed for commuting, travel & public spaces"
    },
    {
      icon: <User className="w-5 h-5 text-brand-brown" />,
      title: "Ergonomic Design",
      desc: "Balanced support for stability, comfort & posture."
    },
    {
      icon: <Zap className="w-5 h-5 text-brand-brown" />,
      title: "Instant Access",
      desc: "Open, work & move without setup or friction"
    }
  ];

  return (
    <section className="bg-brand-beige pt-10 pb-16 px-6 md:px-16 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[60%] bg-[#E8E2DA] rounded-full blur-[100px] transform -rotate-12"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#E8E2DA] rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:justify-center mb-20">
          {/* About Tag - Left Column */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <div className="inline-flex items-center gap-2 bg-[#D4CEC4] px-4 py-2 rounded-lg">
              <div className="w-1.5 h-1.5 bg-[#6B4A2D] rounded-full"></div>
              <span className="text-[11px] font-medium tracking-wide brand-primary uppercase">
                About Kangpack
              </span>
            </div>
          </div>

          {/* Dynamic Headline - Right Column */}
          <div className="w-full ">
            <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] leading-[1.05] tracking-tight">
              <span className="text-[#6B4A2D] font-bold">We turn mobility into productivity, redefining how modern professionals work on the move.</span>
              <span className="text-[#B8AFA1] font-bold"> A wearable workstation designed for comfort, focus, and freedom anywhere.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch bg-[#EEEAE2] p-2 rounded-[24px]">
          {/* Feature List Column */}
          <div className="flex-1 flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-6 hover:bg-white/80 transition-all cursor-default group border border-white/20 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                  <div className="text-brand-brown">{f.icon}</div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown mb-0.5 text-lg">{f.title}</h4>
                  <p className="text-brand-brown/40 text-[13px] font-medium leading-tight">{f.desc}</p>
                </div>
              </div>
            ))}
            {/* More About Us Button */}
            <button className="bg-brand-brown/80 hover:bg-brand-brown text-white p-7 rounded-2xl flex items-center justify-between group transition-all mt-1 shadow-xl">
              <span className="font-bold text-base tracking-wide uppercase">More about us</span>
              <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Large Image Column */}
          <div
            className="lg:w-[48%] rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer"
            onClick={() => openLightbox([side2.src], 0)}
          >
            <Image
              src={side2}
              alt="Person using Kangpack"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
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

export default Features;
