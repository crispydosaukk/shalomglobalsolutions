'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

export default function HeroSection() {
  const { content } = useCMS();
  const hero = content?.hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary pt-20">
      {/* Grid texture */}
      <div className="absolute inset-0 grid-dot-bg opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-xs font-700 uppercase tracking-widest text-white/80">
              {hero?.badge || 'Trusted UK Service Provider'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-hero text-white">
            {hero?.headlinePart1 || 'Solutions for'}{' '}
            <span className="text-secondary">{hero?.headlineHighlight || 'Every Need'}</span>,<br />
            {hero?.headlinePart2 || 'Under One Roof'}
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-white/80 leading-relaxed max-w-lg font-500">
            {hero?.subheadline || 'Professional cleaning, relocation, property management, childcare, and handyman services — delivered with care, reliability, and excellence across the UK.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-4 rounded-xl text-base font-700 hover:bg-sage-dark transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {hero?.exploreBtnText || 'Explore Services'}
              <Icon name="ArrowRightIcon" size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-7 py-4 rounded-xl text-base font-700 hover:bg-white/10 transition-all duration-200"
            >
              <Icon name="PhoneIcon" size={18} />
              {hero?.quoteBtnText || 'Get a Free Quote'}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4">
            {hero?.stats?.map((stat) => (
              <div key={stat?.label}>
                <p className="text-3xl font-800 text-white tracking-tight">{stat?.value}</p>
                <p className="text-xs font-600 uppercase tracking-widest text-white/50 mt-1">{stat?.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cinematic image with floating cards */}
        <div className="relative">
          {/* Main image */}
          <div className="relative rounded-4xl overflow-hidden shadow-hero">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_10762befd-1772485074630.png"
              alt="Professional cleaning team in bright, modern home environment with natural light and clean surfaces"
              width={600}
              height={700}
              className="w-full h-[480px] lg:h-[580px] object-cover"
              priority
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          </div>

          {/* Floating badge 1: Verified */}
          <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-badge px-4 py-3 flex items-center gap-3 animate-float">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              <Icon name="ShieldCheckIcon" size={22} className="text-secondary" variant="solid" />
            </div>
            <div>
              <p className="text-xs font-700 text-primary">{hero?.floatingBadge1Title || 'DBS Checked'}</p>
              <p className="text-[10px] text-muted-foreground font-500">{hero?.floatingBadge1Sub || 'All Staff Verified'}</p>
            </div>
          </div>

          {/* Floating badge 2: Rating */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-badge px-4 py-3 flex items-center gap-3 animate-float-delayed">
            <div className="w-10 h-10 bg-terracotta/20 rounded-xl flex items-center justify-center">
              <Icon name="StarIcon" size={22} className="text-terracotta" variant="solid" />
            </div>
            <div>
              <p className="text-xs font-700 text-primary">{hero?.floatingBadge2Title || '5.0 Rating'}</p>
              <p className="text-[10px] text-muted-foreground font-500">{hero?.floatingBadge2Sub || '200+ Reviews'}</p>
            </div>
          </div>

          {/* Floating badge 3: Services */}
          <div className="absolute top-1/2 -right-6 bg-primary rounded-2xl shadow-badge px-4 py-3 hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/30 rounded-xl flex items-center justify-center">
              <Icon name="CheckBadgeIcon" size={22} className="text-secondary" variant="solid" />
            </div>
            <div>
              <p className="text-xs font-700 text-white">{hero?.floatingBadge3Title || '6 Services'}</p>
              <p className="text-[10px] text-white/50 font-500">{hero?.floatingBadge3Sub || 'One Company'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="#FAF8F3" />
        </svg>
      </div>
    </section>
  );
}