"use client";
import React from "react";
import SlotCounter from "react-slot-counter";
import { motion } from "framer-motion";

const Stats: React.FC = () => {
  const statsData = [
    {
      value: "3",
      suffix: "+",
      label: "Ways to Wear",
      description: "Backpack • Sling • Workstation",
    },
    {
      value: "95",
      suffix: "%",
      label: "Posture Stability",
      description: "Ergonomic weight balance",
    },
    {
      value: "200",
      suffix: "%",
      label: "Satisfied Clients",
      description: "With a great experience and results.",
    },
  ];

  return (
    <section className="bg-[#F8F5F1] py-16 md:py-32 lg:py-6 xl:py-2 2xl:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 xl:gap-8 2xl:gap-24 mb-16 md:mb-24 lg:mb-8 xl:mb-2 2xl:mb-32">
          {/* Badge Column */}
          <div className="w-full lg:w-1/4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-2.5 h-2.5 bg-brand-premium rounded-[2px]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B4A2D]/60 mt-0.5">
                Stats & Facts
              </span>
            </motion.div>
          </div>

          {/* Heading Column */}
          <div className="w-full lg:w-3/4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(1.6rem,4.5vw,3.2rem)] lg:text-[1.2rem] xl:text-[1.1rem] 2xl:text-[3.2rem] leading-[1.1] tracking-tight text-left max-w-4xl"
            >
              <span className="heading-gradient font-bold underline decoration-primary/20 underline-offset-8">
                We engineer freedom for modern professionals where mobility
                meets real productivity.{" "}
              </span>
              <span className="text-[#B8AFA1] font-bold">
                Every detail is designed to remove friction, boost comfort, and
                keep you moving without slowing down.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 lg:gap-20 xl:gap-4 2xl:gap-20">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`group ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Number and Suffix */}
              <div className="text-[clamp(3.5rem,12vw,8rem)] lg:text-[2.8rem] xl:text-[2.2rem] 2xl:text-[9.5rem] font-black text-[#6B4A2D] leading-[0.8] mb-4 md:mb-6 lg:mb-4 xl:mb-2 flex items-baseline">
                <SlotCounter
                  value={stat.value}
                  duration={2}
                  animateOnVisible={{
                    triggerOnce: true,
                    rootMargin: "0px 0px -100px 0px",
                  }}
                />
                <span className="ml-[1px] md:ml-[2px]">{stat.suffix}</span>
              </div>

              {/* Divider Line */}
              <div className="w-full h-[1px] bg-[#6B4A2D]/10 mb-6 lg:mb-4 xl:mb-2" />

              {/* Label and Description */}
              <h4 className="text-[18px] md:text-[20px] lg:text-base xl:text-sm font-bold text-[#6B4A2D] mb-2 xl:mb-1 tracking-tight">
                {stat.label}
              </h4>
              <p className="text-[14px] md:text-[15px] lg:text-sm xl:text-xs text-[#B8AFA1] font-medium leading-relaxed max-w-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
