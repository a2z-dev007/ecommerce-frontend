
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent px-4 pb-4">
      <div className="bg-[#F9F7F4] border-[1px] border-[#6B4A2D]/20 rounded-[40px] overflow-hidden">
        <div className="px-6 md:px-16 py-16">
          {/* Top Row: Logo & Support */}
          <div className="flex justify-between items-center mb-2">
            <img
              src="/assets/black-logo.svg"
              alt="Kangpack Logo"
              className="h-6 md:h-7"
            />
            <a href="mailto:support@kangpack.in" className="text-[#6B4A2D] text-[13px] md:text-[14px] font-medium hover:underline">
              support@kangpack.in
            </a>
          </div>

          {/* Tagline */}
          <div className="mb-20">
            <p className="text-[#8B7E6F] text-[14px]">Redefining mobile productivity</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 mb-24">
            {/* Company Column */}
            <div className="md:col-span-3">
              <h5 className="text-[#6B4A2D] font-bold text-[15px] mb-8">Company</h5>
              <ul className="space-y-4 text-[#B8AFA1] text-[14px]">
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Contact us</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="md:col-span-3">
              <h5 className="text-[#6B4A2D] font-bold text-[15px] mb-8">Legal</h5>
              <ul className="space-y-4 text-[#B8AFA1] text-[14px]">
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-6">
              <h5 className="text-[#6B4A2D] font-bold text-[15px] mb-8">Stay up to date</h5>
              <p className="text-[#B8AFA1] text-[14px] mb-8">Get the latest updates and exclusive discounts.</p>
              <div className="flex flex-col sm:flex-row gap-0">
                <input
                  type="email"
                  placeholder="jane@framer.com"
                  className="flex-grow bg-[#EAE5DC] px-6 py-4 rounded-l-2xl outline-none text-[#6B4A2D] placeholder-[#B8AFA1]"
                />
                <button className="bg-[#6B4A2D] text-white px-12 py-4 rounded-r-2xl font-medium text-[15px] hover:bg-[#5A3E25] transition-all">
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Utility Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 items-start">
            <div className="md:col-span-3">
              <p className="text-[#B8AFA1] text-[13px]">© 2026. All rights reserved. Kangpack</p>
            </div>

            <div className="md:col-span-3">
              <h5 className="text-[#6B4A2D] font-bold text-[15px] mb-4">Legal</h5>
              <ul className="space-y-2 text-[#B8AFA1] text-[13px]">
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h5 className="text-[#6B4A2D] font-bold text-[15px] mb-4">Legal</h5>
              <ul className="space-y-2 text-[#B8AFA1] text-[13px]">
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#6B4A2D] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 md:text-right">
              <a href="#" className="text-[#6B4A2D] text-[14px] font-bold hover:underline">@kangpack</a>
            </div>
          </div>
        </div>

        {/* Massive Branding Background Text */}
        <div className="relative select-none pointer-events-none mt-4 flex justify-center items-end overflow-hidden h-[14vw]">
          <h1 className="w-full text-[18.5vw] font-sans font-bold text-center leading-none tracking-tighter uppercase whitespace-nowrap text-[#6B4A2D] opacity-10 translate-y-[2.5vw]">
            KANGPACK
          </h1>
          {/* Bottom fade gradient to match background */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#F9F7F4] to-transparent z-10" />
        </div>
      </div>
    </footer>
  );
};



