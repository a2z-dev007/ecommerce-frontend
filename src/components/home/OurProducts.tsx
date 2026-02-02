"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ASSETS } from "@/constants/assets";
import ScrollSection, {
  ParallaxImage,
} from "@/components/common/ScrollSection";
import PrimaryButton from "@/components/common/PrimaryButton";

const products = [
  {
    id: 1,
    title: "Kangpack New Edition",
    category: "Flagship",
    price: "$199.00",
    description:
      "The ultimate wearable workstation for the modern professional.",
    image: ASSETS.TICKERS.MAIN,
    tags: ["New", "Best Seller"],
  },
  {
    id: 2,
    title: "Kangpack Classic",
    category: "Original",
    price: "$149.00",
    description: "The original design that started the mobile desk revolution.",
    image: ASSETS.TICKERS.FIRST,
    tags: ["Classic"],
  },
  {
    id: 3,
    title: "Kangpack Lite",
    category: "Travel",
    price: "$129.00",
    description: "Lightweight and compact for quick trips and easy carry.",
    image: ASSETS.TICKERS.IMG_354A7762,
    tags: ["Lightweight"],
  },
];

const ProductCard: React.FC<{
  product: (typeof products)[0];
  index: number;
}> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden bg-brand-beige/20">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-brand-brown rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
          <ParallaxImage
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay Action */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-brand-brown px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-brand-brown/40 uppercase tracking-widest">
            {product.category}
          </span>
          <span className="text-brand-brown font-bold text-lg">
            {product.price}
          </span>
        </div>
        <h3 className="text-xl font-bold text-brand-brown mb-2 group-hover:text-brand-accent transition-colors">
          {product.title}
        </h3>
        <p className="text-brand-brown/60 text-sm leading-relaxed mb-4">
          {product.description}
        </p>
        <div className="pt-4 border-t border-brand-brown/5 flex items-center justify-between">
          <div className="flex gap-1 text-[#D4CEC4]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <button className="p-2 rounded-full hover:bg-brand-beige transition-colors text-brand-brown">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const OurProducts: React.FC = () => {
  return (
    <section
      id="products"
      className="py-24 md:py-32 bg-brand-beige/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#D4CEC4]/10 to-transparent -z-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#D4CEC4] px-4 py-2 rounded-lg mb-6"
            >
              <div className="w-1.5 h-1.5 bg-[#6B4A2D] rounded-full"></div>
              <span className="text-[11px] font-medium tracking-wide text-[#6B4A2D] uppercase">
                Collection
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-[#6B4A2D] tracking-tighter mb-4"
            >
              Explore Our <span className="text-brand-brown/40">Products.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#8B7E6F] text-lg max-w-lg"
            >
              Thoughtfully designed gear to elevate your workflow, wherever life
              takes you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/products" className="hidden md:flex">
              <PrimaryButton>View All Products</PrimaryButton>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center md:hidden"
        >
          <Link href="/products">
            <PrimaryButton>View All Products</PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurProducts;
