
"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "#" },
    { name: "Our Products", href: "#" },
    { name: "Kangpack Variants", href: "#" },
    { name: "FAQ's", href: "#" },
    { name: "Social Media", href: "#" },
  ];

  return (
    <nav className="absolute top-0 w-full z-50 px-6 md:px-16 py-10 flex justify-between items-center bg-transparent">
      {/* Logo (Left aligned) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="relative">
          <span className="text-white text-2xl font-black tracking-tighter uppercase flex items-center gap-1">
            ka<span className="text-white/40 italic">_</span>gpack
          </span>
          <div className="absolute -top-1 left-7 w-3 h-3 bg-white/20 rounded-full blur-[2px]"></div>
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="md:hidden"
      >
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.div>

      {/* Desktop Navigation Links (Right aligned) */}
      <div className="hidden md:flex gap-12 text-[11px] font-[900] uppercase tracking-[0.25em] text-white/90">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1 + index * 0.1,
              ease: "easeOut"
            }}
            className="hover:text-white transition-all  text-base transform hover:scale-105"
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-brand-brown z-[100] p-10 flex flex-col items-center justify-center gap-8 md:hidden">
          <button onClick={() => setIsOpen(false)} className="absolute top-8 left-8 text-white"><X /></button>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className=" font-bold text-white uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
