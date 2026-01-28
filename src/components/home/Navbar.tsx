"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useAppSelector } from '@/lib/store/hooks';
import CartDrawer from '@/components/common/CartDrawer';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  darkText?: boolean;
  solid?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ darkText = false, solid = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync cart count
  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);


  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Products", href: "/products" },
    { name: "Kangpack Variants", href: "#variants" },
    { name: "FAQ's", href: "/faqs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  const isDark = darkText || scrolled || solid;
  const isSolid = solid || scrolled;

  const textColorClass = isDark ? "text-[#6B4A2D]" : "text-white";
  const textColorClassHover = isDark ? "hover:text-[#6B4A2D]/80" : "hover:text-white/80";
  const bgColorClass = isSolid ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-10 shadow-none";

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 px-6 md:px-16 transition-all duration-300 flex justify-between items-center ${bgColorClass}`}>
        {/* Logo (Left aligned) */}
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <span className={`${textColorClass} text-2xl font-black tracking-tighter uppercase flex items-center gap-1 transition-colors duration-300`}>
                ka<span className={`${isDark ? "text-[#6B4A2D]/40" : "text-white/40"} italic`}>_</span>gpack
              </span>
              <div className={`absolute -top-1 left-7 w-3 h-3 ${isDark ? "bg-[#6B4A2D]/20" : "bg-white/20"} rounded-full blur-[2px]`}></div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation Links (Center) */}
        <div className={`hidden lg:flex gap-8 text-[11px] font-[900] uppercase tracking-[0.2em] ${isDark ? "text-[#6B4A2D]/90" : "text-white/90"}`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              passHref
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut"
                }}
                className={`${textColorClassHover} transition-all relative group`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-[2px] ${isDark ? "bg-[#6B4A2D]" : "bg-white"} transition-all group-hover:w-full duration-300`} />
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Right Side Actions (Cart, Auth, Mobile Menu) */}
        <div className="flex items-center gap-6">

          {/* Cart Icon */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`relative ${textColorClass} hover:opacity-70 transition-opacity`}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={22} className="stroke-[2.5px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className={`flex items-center gap-2 ${textColorClass} font-bold uppercase tracking-widest text-[10px] cursor-pointer hover:opacity-70 transition-opacity`}>
                    <User size={18} />
                    <span>{user?.firstName || 'Account'}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className='cursor-pointer w-full'>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className='cursor-pointer w-full'>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login" className={`${textColorClass} font-bold uppercase tracking-widest text-[11px] hover:opacity-70 transition-opacity`}>
                  Log In
                </Link>
                <Link href="/auth/register">
                  <Button className={`rounded-full px-6 text-[11px] font-bold uppercase tracking-widest h-9 ${isDark ? 'bg-[#6B4A2D] text-white hover:bg-[#6B4A2D]/90' : 'bg-white text-[#6B4A2D] hover:bg-white/90'}`}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden"
          >
            <button onClick={() => setIsOpen(!isOpen)} className={textColorClass}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#6B4A2D]/40 backdrop-blur-md"
            />

            {/* Content Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 w-[85%] max-w-sm h-screen bg-[#6B4A2D] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Decorative Background Text */}
              <div className="absolute top-[20%] -right-20 select-none pointer-events-none opacity-5 vertical-text">
                <span className="text-[150px] font-black tracking-tighter text-white uppercase leading-none">
                  KANGPACK
                </span>
              </div>

              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center px-8 py-10 relative z-10">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <span className="text-white text-2xl font-black tracking-tighter uppercase">
                    ka<span className="text-white/40 italic">_</span>gpack
                  </span>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex-1 px-8 py-6 flex flex-col justify-between relative z-10">
                <div className="flex flex-col gap-6">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Navigations</p>
                  {navLinks.map((link, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      key={link.name}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-center gap-4"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-[10px] font-bold text-white/30 font-mono mt-2">0{i + 1}</span>
                        <div className="flex flex-col">
                          <span className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-white/70 transition-colors leading-none">
                            {link.name}
                          </span>
                        </div>
                        <div className="h-[1px] flex-grow bg-white/10 opacity-0 group-hover:opacity-100 transition-all ml-2" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-10 space-y-10">
                  {/* Auth Section */}
                  <div className="space-y-4">
                    {!isAuthenticated ? (
                      <div className="flex flex-col gap-3">
                        <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full">
                          <Button variant="outline" className="w-full h-14 border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent text-sm font-bold uppercase tracking-widest rounded-2xl">
                            Log In
                          </Button>
                        </Link>
                        <Link href="/auth/register" onClick={() => setIsOpen(false)} className="w-full">
                          <Button className="w-full h-14 bg-white text-[#6B4A2D] hover:bg-white/90 text-sm font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-black/10">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                            <User size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">{user?.name || user?.firstName}</span>
                            <span className="text-white/40 text-[10px]">{user?.email}</span>
                          </div>
                        </div>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full">
                          <Button className="w-full h-14 bg-white text-[#6B4A2D] hover:bg-white/90 text-sm font-bold uppercase tracking-widest rounded-2xl">
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          onClick={() => { handleLogout(); setIsOpen(false); }}
                          variant="ghost"
                          className="w-full h-14 text-white/60 hover:text-white hover:bg-white/10 bg-transparent text-sm font-bold uppercase tracking-widest rounded-2xl"
                        >
                          Log Out
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Footer links in drawer */}
                  <div className="flex justify-between items-center border-t border-white/10 pt-8 pb-10">
                    <div className="flex gap-4">
                      <motion.a whileHover={{ y: -2 }} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10">
                        <span className="text-[10px] font-bold">IG</span>
                      </motion.a>
                      <motion.a whileHover={{ y: -2 }} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10">
                        <span className="text-[10px] font-bold">TW</span>
                      </motion.a>
                    </div>
                    <span className="text-white/20 text-[9px] uppercase tracking-widest">© 2026 KANGPACK™</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
