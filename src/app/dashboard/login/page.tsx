'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.error || 'Failed to sign in. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-dot-bg opacity-20 pointer-events-none" />

      {/* Decorative gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sage-dark/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-4">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <AppLogo size={48} />
            <span className="font-extrabold text-2xl text-white tracking-tight">ShalomGlobal</span>
          </Link>
        </div>
        <h2 className="text-center text-2xl font-800 text-white tracking-tight">
          Admin Management Portal
        </h2>
        <p className="mt-2 text-center text-sm text-white/70 font-500">
          Sign in to access the Dashboard &amp; live Content Editing module
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-hero rounded-3xl sm:px-10 border border-border">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
              <Icon name="ExclamationTriangleIcon" size={20} className="shrink-0 text-rose-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-700 uppercase tracking-wider text-primary mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <Icon name="EnvelopeIcon" size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-cream-dark/30 border border-border rounded-xl text-sm font-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="name@shalomglobalsolution.co.uk"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-700 uppercase tracking-wider text-primary mb-2">
                Secure Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <Icon name="LockClosedIcon" size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-cream-dark/30 border border-border rounded-xl text-sm font-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-700 text-primary-foreground bg-primary hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <Icon name="ArrowRightEndOnRectangleIcon" size={18} />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick info note */}
          <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1.5 text-primary font-600 hover:underline">
              <Icon name="ArrowLeftIcon" size={14} />
              Return to Website
            </Link>
            <span className="font-600 text-secondary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Live CMS Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
