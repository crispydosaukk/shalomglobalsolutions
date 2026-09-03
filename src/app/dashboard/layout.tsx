'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { useCMS } from '@/lib/cmsContext';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const { isSyncing, lastSavedAt } = useCMS();

  useEffect(() => {
    if (!loading && !user && pathname !== '/dashboard/login') {
      router.push('/dashboard/login');
    }
  }, [user, loading, pathname, router]);

  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-dark/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-600 text-primary">Loading Admin Workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    {
      label: 'Dashboard Overview',
      href: '/dashboard',
      icon: 'Squares2X2Icon' as const,
    },
    {
      label: 'Manage Services & Pages',
      href: '/dashboard/services',
      icon: 'BriefcaseIcon' as const,
    },
    {
      label: 'Content Editing Module',
      href: '/dashboard/content',
      icon: 'DocumentTextIcon' as const,
    },
    {
      label: 'Customer Inquiries',
      href: '/dashboard/inquiries',
      icon: 'InboxIcon' as const,
    },
    {
      label: 'Email & Notification Settings',
      href: '/dashboard/settings',
      icon: 'EnvelopeIcon' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-cream-dark/40 flex flex-col md:flex-row">
      {/* Sticky Fixed Sidebar */}
      <aside className="w-full md:w-72 bg-primary text-white md:sticky md:top-0 md:h-screen flex flex-col justify-between shrink-0 border-r border-navy-light/40 z-40">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <AppLogo size={36} />
              <div>
                <span className="font-extrabold text-base text-white tracking-tight block">ShalomGlobal</span>
                <span className="text-[10px] uppercase font-700 tracking-widest text-secondary block">Admin Console</span>
              </div>
            </Link>
          </div>

          {/* Navigation items */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-1.5 text-[10px] font-800 uppercase tracking-widest text-white/40">
              Control Center
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-700 transition-all ${
                    isActive
                      ? 'bg-secondary text-white shadow-md'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 px-3 py-1.5 text-[10px] font-800 uppercase tracking-widest text-white/40">
              Quick Actions
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-600 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <Icon name="ArrowTopRightOnSquareIcon" size={18} />
                <span>View Live Website</span>
              </div>
              <span className="text-xs text-secondary font-700">Live</span>
            </Link>
          </nav>
        </div>

        {/* User Card & Logout directly anchored */}
        <div className="p-4 border-t border-white/10 bg-primary/95 space-y-3">
          <div className="bg-navy-light/70 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary/25 flex items-center justify-center text-secondary font-extrabold text-sm">
                RB
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-700 text-white truncate">{user.email || 'Admin'}</p>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Authenticated
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-700 bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white transition-all border border-rose-500/30"
          >
            <Icon name="ArrowLeftStartOnRectangleIcon" size={16} />
            Sign Out / Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-border h-16 px-6 flex items-center justify-between shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-700 text-muted-foreground uppercase tracking-wider">
              {isSyncing ? (
                <span className="text-secondary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                  Syncing to Firebase Firestore...
                </span>
              ) : (
                <>Cloud Sync: <span className="text-emerald-600 font-bold">Online &amp; Active</span></>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {lastSavedAt && (
              <span className="text-xs font-500 text-muted-foreground hidden lg:inline">
                Last updated: <strong className="text-primary">{lastSavedAt}</strong>
              </span>
            )}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 bg-cream-dark/80 hover:bg-cream-dark text-primary px-3 py-1.5 rounded-xl text-xs font-700 transition-colors border border-border"
            >
              <Icon name="EyeIcon" size={14} />
              <span>Preview Website</span>
            </Link>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white px-3 py-1.5 rounded-xl text-xs font-700 transition-colors border border-rose-200"
              title="Sign Out"
            >
              <Icon name="ArrowLeftStartOnRectangleIcon" size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Sub-page Body */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
