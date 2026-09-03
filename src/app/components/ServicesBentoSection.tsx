'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useCMS } from '@/lib/cmsContext';

// Default themes for known services or fallback for newly added services
const SERVICE_THEMES: Record<string, {
  icon: string;
  iconBg: string;
  iconColor: string;
  accentGradient: string;
  badgeBg: string;
  badgeText: string;
  image?: string;
  category?: string;
}> = {
  cleaning: {
    icon: 'SparklesIcon',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    accentGradient: 'from-emerald-600/20 via-emerald-500/10 to-transparent',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'Spotless Cleaning',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fdc7d837-1772152005578.png',
    category: 'Home & Office',
  },
  moving: {
    icon: 'TruckIcon',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    accentGradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'Safe Relocation',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1384b98d6-1773100531867.png',
    category: 'Relocation & Logistics',
  },
  property: {
    icon: 'HomeModernIcon',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    accentGradient: 'from-orange-600/20 via-orange-500/10 to-transparent',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Property & Compliance',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11e492967-1773593378128.png',
    category: 'Landlord Support',
  },
  childcare: {
    icon: 'HeartIcon',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    accentGradient: 'from-pink-600/20 via-pink-500/10 to-transparent',
    badgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
    badgeText: 'Verified Childcare',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a9de5f79-1767907222508.png',
    category: 'Family Care',
  },
  handyman: {
    icon: 'WrenchScrewdriverIcon',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    accentGradient: 'from-amber-600/20 via-amber-500/10 to-transparent',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'Trades & Repairs',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b0f8fe19-1780332392705.png',
    category: 'Maintenance',
  },
  security: {
    icon: 'ShieldCheckIcon',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
    accentGradient: 'from-teal-600/20 via-teal-500/10 to-transparent',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    badgeText: 'Safety & Guarding',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1554bed0c-1773473576842.png',
    category: 'Safety & Protection',
  },
  meals: {
    icon: 'CakeIcon',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    accentGradient: 'from-rose-600/20 via-rose-500/10 to-transparent',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'Fresh Catering',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_18a2753c3-1774731453054.png',
    category: 'Nutrition & Meals',
  },
};

// Fallback thematic styles for dynamic custom services
const COLOR_PRESETS = [
  { iconBg: 'bg-emerald-100', iconColor: 'text-emerald-700', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { iconBg: 'bg-blue-100', iconColor: 'text-blue-700', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  { iconBg: 'bg-amber-100', iconColor: 'text-amber-700', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
  { iconBg: 'bg-purple-100', iconColor: 'text-purple-700', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' },
  { iconBg: 'bg-teal-100', iconColor: 'text-teal-700', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200' },
  { iconBg: 'bg-rose-100', iconColor: 'text-rose-700', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export default function ServicesBentoSection() {
  const { content } = useCMS();
  const bento = content?.servicesBento;
  const servicesList = bento?.services || [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to update arrows
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [servicesList]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 380 + 24; // card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-800 uppercase tracking-widest mb-3">
              <Icon name="SparklesIcon" size={14} />
              <span>{bento?.badge || 'What We Offer'}</span>
            </div>
            <h2 className="text-section-title text-primary tracking-tight">
              {bento?.titleLine1 || 'All Your Services,'}{' '}
              <span className="text-secondary">{bento?.titleHighlight || 'One Trusted Company'}</span>
            </h2>
            <p className="text-muted-foreground font-500 text-base leading-relaxed mt-3">
              {bento?.subtitle || 'From daily cleaning to complex property management — we deliver professional, reliable services across the UK.'}
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll services left"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 ${
                canScrollLeft
                  ? 'bg-white border-border text-primary shadow-sm hover:bg-primary hover:text-white hover:border-primary cursor-pointer'
                  : 'bg-muted/40 border-border/50 text-muted-foreground/40 cursor-not-allowed'
              }`}
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll services right"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 ${
                canScrollRight
                  ? 'bg-white border-border text-primary shadow-sm hover:bg-primary hover:text-white hover:border-primary cursor-pointer'
                  : 'bg-muted/40 border-border/50 text-muted-foreground/40 cursor-not-allowed'
              }`}
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-primary hover:bg-navy-light text-white text-sm font-700 px-5 py-3 rounded-2xl transition-all shadow-sm ml-2"
            >
              <span>{bento?.viewAllBtnText || 'View All'}</span>
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        </div>

        {/* Side Scroll Track: ALL CARDS ARE EQUAL SIZE */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {servicesList.map((service, idx) => {
            const theme = SERVICE_THEMES[service.id] || {
              icon: (service as any).icon || 'SparklesIcon',
              iconBg: COLOR_PRESETS[idx % COLOR_PRESETS.length].iconBg,
              iconColor: COLOR_PRESETS[idx % COLOR_PRESETS.length].iconColor,
              accentGradient: 'from-secondary/20 via-secondary/5 to-transparent',
              badgeBg: COLOR_PRESETS[idx % COLOR_PRESETS.length].badgeBg,
              badgeText: service.title,
              image: (service as any).image || 'https://img.rocket.new/generatedImages/rocket_gen_img_1fdc7d837-1772152005578.png',
              category: (service as any).category || 'Professional Service',
            };

            const cardImage = (service as any).image || theme.image;
            const cardIcon = (service as any).icon || theme.icon;

            return (
              <div
                key={service.id || idx}
                className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 h-[500px] rounded-4xl bg-white border border-border/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group snap-start overflow-hidden relative"
              >
                {/* Top Image Preview Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-primary/5 shrink-0">
                  {cardImage ? (
                    <AppImage
                      src={cardImage}
                      alt={service.title}
                      fill
                      sizes="380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cream to-cream-dark" />
                  )}
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Top Floating Badge & Icon */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-700 bg-white/90 backdrop-blur-md text-primary shadow-sm border border-white/40">
                      {theme.category || 'Specialist Service'}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-md backdrop-blur-md border border-white/50`}>
                      <Icon name={cardIcon as any} size={20} className={theme.iconColor} />
                    </div>
                  </div>

                  {/* Bottom of Banner Title preview / tag */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <span className="text-[11px] font-700 tracking-wider uppercase text-white/90 drop-shadow-sm">
                      Shalom Global UK
                    </span>
                  </div>
                </div>

                {/* Card Content: Uniform height & structure */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-800 text-primary group-hover:text-secondary transition-colors line-clamp-1 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm font-500 leading-relaxed line-clamp-3 mb-4">
                      {service.description}
                    </p>

                    {/* Uniform Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[11px] font-600 bg-cream-dark/60 text-primary/80 px-2.5 py-1 rounded-lg border border-border/60"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA Bar */}
                  <div className="pt-4 border-t border-border/70 flex items-center justify-between mt-auto">
                    <Link
                      href={`/service-detail?service=${service.id}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-700 text-primary group-hover:text-secondary transition-colors"
                    >
                      <span>{service.ctaText || 'View Details'}</span>
                      <Icon
                        name="ArrowRightIcon"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="text-xs font-700 text-muted-foreground hover:text-primary px-3 py-1.5 rounded-xl hover:bg-cream-dark/50 transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom swipe hint on mobile / card counter */}
        <div className="flex items-center justify-between mt-6 text-xs text-muted-foreground font-600 px-1">
          <span className="flex items-center gap-1.5">
            <Icon name="ArrowsRightLeftIcon" size={14} className="text-secondary" />
            <span>Scroll horizontally to explore all {servicesList.length} services</span>
          </span>
          <span className="hidden sm:inline">
            Each service is backed by fully insured, DBS-checked UK professionals.
          </span>
        </div>
      </div>
    </section>
  );
}