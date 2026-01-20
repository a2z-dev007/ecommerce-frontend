
import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="bg-brand-beige py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-brown"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40">Stats & Facts</span>
          </div>
          <h2 className="text-3xl md:text-5xl max-w-4xl">
            We engineer freedom for modern professionals where <span className="italic">mobility meets real productivity.</span> Every detail is designed to remove friction, boost comfort, and keep you moving without slowing down.
          </h2>
        </div> */}
        <div className="text-center mb-16 md:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#D4CEC4] px-4 py-2 rounded-lg mb-6">
            <div className="w-1.5 h-1.5 bg-[#6B4A2D] rounded-full"></div>
            <span className="text-[11px] font-medium tracking-wide brand-primary uppercase">
              Stats & Facts
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight max-w-5xl mx-auto">
            <span className="text-[#6B4A2D] font-bold">We engineer freedom for modern professionals where mobility meets real productivity. </span>
            <span className="text-[#B8AFA1] font-bold">Every detail is designed to remove friction, boost comfort, and keep you moving without slowing down.</span>
          </h2>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-7xl md:text-9xl text-brand-brown leading-none mb-4">2+</h3>
            <h4 className="text-xl font-bold mb-2">Ways to Wear</h4>
            <p className="text-brand-brown/60 text-sm">Backpack • Sling • Workstation</p>
          </div>
          <div>
            <h3 className="text-7xl md:text-9xl text-brand-brown leading-none mb-4">69%</h3>
            <h4 className="text-xl font-bold mb-2">Posture Stability</h4>
            <p className="text-brand-brown/60 text-sm">Ergonomic weight balance</p>
          </div>
          <div>
            <h3 className="text-7xl md:text-9xl text-brand-brown leading-none mb-4">146%</h3>
            <h4 className="text-xl font-bold mb-2">Satisfied Clients</h4>
            <p className="text-brand-brown/60 text-sm">With a great experience and results.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
