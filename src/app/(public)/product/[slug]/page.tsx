"use client";

import React, { useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/features/products/api";
import Navbar from "@/components/home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { QUERY_KEYS, ROUTES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronDown,
  Minus,
  Plus,
  Heart,
  Share2,
  Award,
  Zap,
  Layout,
} from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";
import ScrollSection from "@/components/common/ScrollSection";
import { cn } from "@/lib/utils";
import OurProducts from "@/components/home/OurProducts";

// --- Components ---

const ImageGallery = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      <motion.div
        className="aspect-[4/5] md:aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {images && images.length > 0 ? (
          <motion.img
            key={selectedIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={images[selectedIndex]}
            alt={`${title} - View ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}

        {/* Image Navigation Hints (Desktop) */}
        {images && images.length > 1 && (
          <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1,
                );
              }}
              className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center pointer-events-auto hover:bg-white transition-colors"
            >
              <ChevronDown className="w-6 h-6 rotate-90 text-brand-brown" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1,
                );
              }}
              className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center pointer-events-auto hover:bg-white transition-colors"
            >
              <ChevronDown className="w-6 h-6 -rotate-90 text-brand-brown" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative w-24 aspect-square rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border-2",
                selectedIndex === idx
                  ? "border-[#6B4A2D] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <img
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const QuantitySelector = ({
  quantity,
  setQuantity,
  max,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
  max: number;
}) => {
  return (
    <div className="flex items-center border border-[#6B4A2D]/20 rounded-full p-1 bg-white">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#6B4A2D]/5 text-[#6B4A2D] transition-colors"
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-12 text-center font-bold text-[#6B4A2D]">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity(Math.min(max, quantity + 1))}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#6B4A2D]/5 text-[#6B4A2D] transition-colors"
        disabled={quantity >= max}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

const AccordionItem = ({
  title,
  children,
  icon: Icon,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  icon?: any;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#6B4A2D]/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-[#6B4A2D]/60" />}
          <span className="text-lg font-bold text-[#6B4A2D] group-hover:text-[#6B4A2D]/80 transition-colors">
            {title}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#6B4A2D]/40 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[#8B7E6F] leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page Component ---

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  // Dummy Data for demonstration (kept as is)
  const isLoading = false;
  const product = {
    id: "dummy-1",
    name: "Kangpack New Edition",
    description:
      "The ultimate wearable workstation designed for professionals who need to work anywhere. Featuring a lightweight ergonomic design, integrated desk surface, and premium materials.",
    price: 199.0,
    compareAtPrice: 249.0,
    images: [
      "/assets/tickers/main.jpeg",
      "/assets/tickers/main2.jpeg",
      "/assets/tickers/first.jpeg",
      "/assets/tickers/side.jpeg",
    ],
    category: {
      name: "Wearable Desk",
      id: "cat-1",
      slug: "wearable-desk",
      isActive: true,
    },
    stock: 12,
    sku: "KPK-001-BLK",
    slug: "kangpack-new-edition",
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product: product as any, quantity }));
      toast.success(`Added ${quantity} ${product.name} to cart`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-2 border-[#6B4A2D] border-t-transparent animate-spin mb-4" />
          <p className="text-[#6B4A2D] font-medium tracking-widest uppercase text-sm">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-beige flex flex-col items-center justify-center font-sans">
        <Navbar />
        <h1 className="text-4xl font-bold text-[#6B4A2D] mb-4">
          Product Not Found
        </h1>
        <p className="text-[#8B7E6F] mb-8">
          The product you are looking for does not exist or has been moved.
        </p>
        <a
          href="/products"
          className="bg-[#6B4A2D] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
        >
          Back to Products
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-brand-beige">
      <Navbar solid />

      <main className="flex-grow">
        {/* Simple Hero Header */}
        <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
          <div className="absolute inset-0 bg-[#6B4A2D]/80 z-10" />
          <ScrollSection className="h-full">
            <div className="absolute inset-0 opacity-40 grayscale">
              <img
                src={product.images[0]}
                alt="Hero Background"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollSection>

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <span className="text-xs font-bold tracking-widest text-white uppercase">
                {product.category?.name}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
            >
              Shop Details
            </motion.h1>
          </div>
        </div>

        <div className="px-6 md:px-12 max-w-[1400px] mx-auto -mt-20 relative z-30">
          <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-[#8B7E6F] mb-8 uppercase tracking-wider font-medium">
              <a href="/" className="hover:text-[#6B4A2D] transition-colors">
                Home
              </a>
              <span>/</span>
              <a
                href="/products"
                className="hover:text-[#6B4A2D] transition-colors"
              >
                Products
              </a>
              <span>/</span>
              <span className="text-[#6B4A2D] font-bold">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
              {/* Left Column: Images */}
              <div className="relative">
                <div className="sticky top-32">
                  <ImageGallery
                    images={product.images || []}
                    title={product.name}
                  />
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="flex flex-col h-full">
                {/* Header Info */}
                <div className="mb-8 border-b border-[#6B4A2D]/10 pb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#D4CEC4]/30 text-[#6B4A2D] text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {product.category?.name || "Accessories"}
                    </span>
                    {product.stock < 5 && product.stock > 0 && (
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-black text-[#6B4A2D] tracking-tight mb-4 leading-[1.1]">
                    {product.name}
                  </h1>

                  <div className="flex items-end gap-6 mb-6">
                    <span className="text-3xl font-bold text-[#6B4A2D]">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xl text-[#8B7E6F]/60 line-through mb-1">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-[#8B7E6F] text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="mb-10 space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-[#6B4A2D]/60 uppercase tracking-widest">
                        Quantity
                      </span>
                      <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                        max={product.stock}
                      />
                    </div>
                    <div className="space-y-3 flex-grow">
                      <span className="text-xs font-bold text-[#6B4A2D]/60 uppercase tracking-widest invisible">
                        Action
                      </span>
                      <div className="flex gap-4">
                        <button
                          onClick={handleAddToCart}
                          disabled={product.stock === 0}
                          className="flex-grow bg-[#6B4A2D] text-white h-[50px] rounded-full font-bold uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#6B4A2D]/20"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                        <button className="w-[50px] h-[50px] flex-shrink-0 border border-[#6B4A2D]/20 rounded-full flex items-center justify-center text-[#6B4A2D] hover:bg-[#6B4A2D]/5 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                    <div className="flex items-center gap-3 text-sm text-[#6B4A2D]/80">
                      <div className="w-8 h-8 rounded-full bg-[#D4CEC4]/30 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#6B4A2D]/80">
                      <div className="w-8 h-8 rounded-full bg-[#D4CEC4]/30 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="font-medium">2 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#6B4A2D]/80">
                      <div className="w-8 h-8 rounded-full bg-[#D4CEC4]/30 flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="w-4 h-4" />
                      </div>
                      <span className="font-medium">30 Day Returns</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Information (Accordions) */}
                <div className="mt-auto">
                  <AccordionItem title="Description" defaultOpen>
                    <p>{product.description}</p>
                    <p className="mt-4">
                      Each Kangpack is crafted with precision to ensure maximum
                      durability and comfort. Designed for the modern nomad, it
                      features distinct compartments for all your essentials.
                    </p>
                  </AccordionItem>
                  <AccordionItem title="Specifications">
                    <ul className="space-y-2 list-disc pl-5">
                      <li>
                        Material: Premium Water-resistant Nylon / Eco-friendly
                        Fabrics
                      </li>
                      <li>Dimensions: 18" x 12" x 6"</li>
                      <li>Weight: 1.8 lbs (0.8 kg)</li>
                      <li>Laptop Compartment: Fits up to 16" MacBook Pro</li>
                      <li>Zippers: YKK AquaGuard®</li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem title="Shipping & Returns">
                    <p>
                      We offer free standard shipping on all orders over $100.
                      Orders are typically processed within 1-2 business days.
                    </p>
                    <p className="mt-2">
                      If you are not completely satisfied with your purchase,
                      you may return it within 30 days for a full refund or
                      exchange, provided the items are in their original
                      condition.
                    </p>
                  </AccordionItem>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <section className="py-24 px-6 md:px-12 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4A2D] mb-4">
                Why you'll love it
              </h2>
              <p className="text-[#8B7E6F]">
                Engineered for performance, designed for life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Ergonomic Design",
                  desc: "Reduces strain on your back and shoulders with our patented weight-distribution technology.",
                  icon: Layout,
                },
                {
                  title: "Premium Materials",
                  desc: "Crafted from high-grade, water-resistant ballistic nylon for ultimate durability.",
                  icon: Award,
                },
                {
                  title: "Instant Access",
                  desc: "Deploy your workstation in seconds with our quick-release mechanism.",
                  icon: Zap,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#6B4A2D]/10 rounded-xl flex items-center justify-center mb-6 text-[#6B4A2D]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#6B4A2D] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#8B7E6F] leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4A2D]">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#6B4A2D]">4.9/5</span>
                <span className="text-[#8B7E6F] text-sm">(120 Reviews)</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
