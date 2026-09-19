'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldCheck, ArrowRight, Sparkles, Key } from 'lucide-react';
import { AdminAuthProvider, useAdminAuth } from '@/lib/store/adminAuthContext';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/constants/brand';

function AdminLoginContent() {
  const router = useRouter();
  const { login, isAdminAuthenticated } = useAdminAuth();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAdminAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/admin/dashboard');
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(passcode);
    if (res.success) {
      router.push('/admin/dashboard');
    } else {
      setError(res.message || 'Authentication failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 flex flex-col justify-center items-center px-4 py-12 selection:bg-wine-700 selection:text-sand-50">
      <div className="w-full max-w-md bg-sand-50 border border-sand-300 shadow-xl p-8 sm:p-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="font-serif text-3xl tracking-widest text-charcoal-900 font-semibold inline-block"
          >
            Nazaara <span className="text-wine-700">Jewels</span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 text-wine-800 text-xs uppercase tracking-widest font-semibold pt-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Executive Admin Portal</span>
          </div>
          <p className="text-xs text-taupe-500 max-w-xs mx-auto">
            Authorized administrator access for catalog merchandising, pricing, and order fulfillment.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs animate-in fade-in">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 text-xs">
          <div>
            <label className="block text-charcoal-800 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
              Admin Security Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin access key"
                className="w-full p-3 bg-sand-100/60 border border-sand-300 text-charcoal-900 focus:outline-none focus:border-wine-700 text-sm font-mono tracking-widest"
              />
              <Key className="w-4 h-4 text-taupe-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
            <p className="text-[10px] text-taupe-400 mt-1">
              Hint: Default demo key is <code className="bg-sand-200 px-1 py-0.5 rounded text-charcoal-800">Nazaara@Admin2026</code> or <code className="bg-sand-200 px-1 py-0.5 rounded text-charcoal-800">admin123</code>
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-md cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Access Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="pt-6 border-t border-sand-200 text-center text-[11px] text-taupe-500 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Protected Access Only</span>
          </div>
          <p>Public registrations are disabled. Only authorized administrators may access store records.</p>
          <div className="pt-2">
            <Link href="/" className="text-wine-800 hover:text-wine-900 underline font-medium">
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <AdminAuthProvider>
      <AdminLoginContent />
    </AdminAuthProvider>
  );
}
