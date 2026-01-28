'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/use-auth';
import Navbar from '@/components/home/Navbar';
import { ASSETS } from '@/constants/assets';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Call register API
      const response = await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // Extract data from response
      const data = response.data?.data || response.data;
      const { user, accessToken, refreshToken } = data;

      // Store tokens
      if (accessToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Normalize user data
      const normalizedUser = {
        ...user,
        id: user._id || user.id,
        name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      };

      // Update Zustand store
      setUser(normalizedUser);

      // Show success message
      toast.success('Account created successfully!');

      // Wait a bit for toast to show, then redirect
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error: any) {
      // Show error message
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige font-sans flex flex-col">
      <Navbar solid />

      <div className="flex-grow flex items-center justify-center p-6 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[#D4CEC4]/20 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[95%] max-w-[1600px] min-h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex relative z-10"
        >
          {/* Left Side - Visual */}
          <div className="hidden lg:block w-1/2 relative bg-[#6B4A2D]">
            <div className="absolute inset-0 opacity-60">
              <img
                src={ASSETS.TICKERS.SIDE}
                alt="Register Visual"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#6B4A2D] via-[#6B4A2D]/50 to-transparent" />

            <div className="absolute bottom-12 left-12 right-12 text-white">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Join the Movement.</h2>
              <p className="opacity-80 text-lg font-light leading-relaxed">
                Create an account to start your journey with Kangpack. Unlock mobile productivity today.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto">
            <Link href="/" className="absolute top-8 left-8 text-[#6B4A2D]/60 hover:text-[#6B4A2D] flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="max-w-sm mx-auto w-full pt-12 md:pt-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#6B4A2D] mb-2">Create Account</h1>
                <p className="text-[#8B7E6F]">Sign up for free to start shopping.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6B4A2D]/60 uppercase tracking-widest pl-1">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A2D]/40" />
                      <input
                        type="text"
                        className="w-full bg-[#f8f6f4] border border-[#6B4A2D]/10 rounded-xl px-4 py-3 pl-10 text-[#6B4A2D] focus:outline-none focus:border-[#6B4A2D]/40 transition-colors text-sm"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6B4A2D]/60 uppercase tracking-widest pl-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#f8f6f4] border border-[#6B4A2D]/10 rounded-xl px-4 py-3 text-[#6B4A2D] focus:outline-none focus:border-[#6B4A2D]/40 transition-colors text-sm"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#6B4A2D]/60 uppercase tracking-widest pl-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A2D]/40" />
                    <input
                      type="email"
                      className="w-full bg-[#f8f6f4] border border-[#6B4A2D]/10 rounded-xl px-4 py-3 pl-10 text-[#6B4A2D] focus:outline-none focus:border-[#6B4A2D]/40 transition-colors text-sm"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#6B4A2D]/60 uppercase tracking-widest pl-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A2D]/40" />
                    <input
                      type="password"
                      className="w-full bg-[#f8f6f4] border border-[#6B4A2D]/10 rounded-xl px-4 py-3 pl-10 text-[#6B4A2D] focus:outline-none focus:border-[#6B4A2D]/40 transition-colors text-sm"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#6B4A2D]/60 uppercase tracking-widest pl-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A2D]/40" />
                    <input
                      type="password"
                      className="w-full bg-[#f8f6f4] border border-[#6B4A2D]/10 rounded-xl px-4 py-3 pl-10 text-[#6B4A2D] focus:outline-none focus:border-[#6B4A2D]/40 transition-colors text-sm"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6B4A2D] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#6B4A2D]/20 mt-4"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-8 text-center pb-8 lg:pb-0">
                <p className="text-[#8B7E6F]">
                  Already have an account? {' '}
                  <Link href="/auth/login" className="font-bold text-[#6B4A2D] hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
