'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

export default function TestimonialsSection() {
  const { content } = useCMS();
  const test = content?.testimonials;
  const testimonials = test?.items || [];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
            {test?.badge || 'Client Testimonials'}
          </span>
          <h2 className="text-section-title text-primary mb-4">
            {test?.titleLine1 || 'Real People,'}{' '}
            <span className="text-secondary">{test?.titleHighlight || 'Real Results'}</span>
          </h2>
          <p className="text-muted-foreground font-500 max-w-lg mx-auto">
            {test?.subtitle || 'Hundreds of satisfied clients across the UK trust Shalom Global Solution for their homes and businesses.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials?.map((t, i) => (
            <div
              key={t?.name || i}
              className={`rounded-4xl overflow-hidden group card-hover ${
                i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {i === 0 ? (
                /* Featured testimonial */
                <div className="relative h-full min-h-[300px] bg-primary flex items-end">
                  <div className="absolute inset-0 overflow-hidden">
                    <AppImage
                      src={t?.avatar || 'https://img.rocket.new/generatedImages/rocket_gen_img_1bddfb0d2-1769187553156.png'}
                      alt="Happy client in bright home environment, warm natural lighting, soft background"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />
                  </div>

                  {/* Rich gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />

                  <div className="relative z-10 p-8 w-full">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t?.rating || 5 }).map((_, j) => (
                        <Icon key={j} name="StarIcon" size={16} className="text-amber-400" variant="solid" />
                      ))}
                    </div>
                    <p className="text-white font-600 text-base sm:text-lg leading-relaxed mb-6 italic drop-shadow-sm">
                      &ldquo;{t?.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-800 text-white text-base">{t?.name}</p>
                        <p className="text-white/80 text-xs font-500">{t?.role}</p>
                      </div>
                      <span className="text-xs font-700 bg-secondary text-white px-3.5 py-1.5 rounded-full shadow-sm">
                        {t?.service}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular testimonial */
                <div className="bg-white border border-border p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0">
                        <AppImage
                          src={t?.avatar || 'https://img.rocket.new/generatedImages/rocket_gen_img_1bea1928a-1769399135374.png'}
                          alt={`${t?.name} profile photo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-700 text-sm text-primary">{t?.name}</p>
                        <p className="text-xs text-muted-foreground font-500">{t?.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t?.rating || 5 }).map((_, j) => (
                        <Icon key={j} name="StarIcon" size={14} className="text-amber-500" variant="solid" />
                      ))}
                    </div>
                    <p className="text-foreground text-sm font-500 leading-relaxed italic">
                      &ldquo;{t?.quote}&rdquo;
                    </p>
                  </div>
                  <span className="inline-block mt-5 text-xs font-600 bg-secondary/15 text-secondary px-3 py-1.5 rounded-full self-start">
                    {t?.service}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}