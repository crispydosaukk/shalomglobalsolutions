'use client';

import React, { useRef, useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

export default function TestimonialsSection() {
  const { content } = useCMS();
  const test = content?.testimonials;
  const testimonials = test?.items || [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, [testimonials]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 400 + 24; // card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-cream-dark/30 overflow-hidden">
      <div className="site-container">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-800 uppercase tracking-widest mb-3">
              <Icon name="ChatBubbleLeftRightIcon" size={14} />
              <span>{test?.badge || 'Client Testimonials'}</span>
            </div>
            <h2 className="text-section-title text-primary tracking-tight">
              {test?.titleLine1 || 'Real People,'}{' '}
              <span className="text-secondary">{test?.titleHighlight || 'Real Results'}</span>
            </h2>
            <p className="text-muted-foreground font-500 text-base leading-relaxed mt-3">
              {test?.subtitle || 'Hundreds of satisfied clients across the UK trust Shalom Global Solution for their homes and businesses.'}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll testimonials left"
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
              aria-label="Scroll testimonials right"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 ${
                canScrollRight
                  ? 'bg-white border-border text-primary shadow-sm hover:bg-primary hover:text-white hover:border-primary cursor-pointer'
                  : 'bg-muted/40 border-border/50 text-muted-foreground/40 cursor-not-allowed'
              }`}
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        </div>

        {/* Side Scroll Track: ALL TESTIMONIAL CARDS ARE EXACTLY EQUAL SIZE */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t?.name || i}
              className="w-[320px] sm:w-[360px] md:w-[400px] shrink-0 h-[360px] rounded-4xl bg-white border border-border/80 shadow-card hover:shadow-card-hover transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between group snap-start relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-emerald-400 to-teal-500 opacity-80" />

              <div>
                {/* Rating & Service Tag */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t?.rating || 5 }).map((_, j) => (
                      <Icon key={j} name="StarIcon" size={16} className="text-amber-400 fill-amber-400" variant="solid" />
                    ))}
                  </div>
                  <span className="text-xs font-700 bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20 truncate max-w-[150px]">
                    {t?.service}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-foreground/90 text-sm sm:text-[15px] font-500 leading-relaxed italic line-clamp-5">
                  &ldquo;{t?.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-secondary/20 shadow-sm">
                    <AppImage
                      src={t?.avatar || 'https://img.rocket.new/generatedImages/rocket_gen_img_1bddfb0d2-1769187553156.png'}
                      alt={`${t?.name} avatar`}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-800 text-sm text-primary group-hover:text-secondary transition-colors">
                      {t?.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-500">
                      {t?.role}
                    </p>
                  </div>
                </div>

                {/* Verified client badge */}
                <div className="flex items-center gap-1 text-[11px] font-700 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  <Icon name="CheckBadgeIcon" size={13} className="text-emerald-600" variant="solid" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom swipe hint on mobile / card counter */}
        <div className="flex items-center justify-between mt-6 text-xs text-muted-foreground font-600 px-1">
          <span className="flex items-center gap-1.5">
            <Icon name="ArrowsRightLeftIcon" size={14} className="text-secondary" />
            <span>Scroll horizontally to read more client experiences ({testimonials.length} reviews)</span>
          </span>
          <span className="hidden sm:inline">
            Rated 4.9/5 stars based on over 500+ verified UK customer reviews.
          </span>
        </div>
      </div>
    </section>
  );
}