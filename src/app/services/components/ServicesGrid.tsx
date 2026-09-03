'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useCMS } from '@/lib/cmsContext';

const categories = ['All Services', 'Home', 'Property', 'Care', 'Maintenance', 'Food'];

const serviceMetadata: Record<string, { category: string; icon: string; iconBg: string; iconColor: string; image: string; imageAlt: string; highlights: string[] }> = {
  cleaning: {
    category: 'Home',
    icon: 'SparklesIcon',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_129d8935b-1772185190403.png',
    imageAlt: 'Sparkling clean modern kitchen with bright natural light, professional cleaning result',
    highlights: ['Residential & Commercial', 'Fully Insured Team', 'Eco-Friendly Products'],
  },
  moving: {
    category: 'Home',
    icon: 'TruckIcon',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1384b98d6-1773100531867.png',
    imageAlt: 'Bright moving day with boxes and helpers in clean home, organised professional relocation',
    highlights: ['Local & Long Distance', 'Furniture Assembly', 'Move-In Cleaning'],
  },
  property: {
    category: 'Property',
    icon: 'HomeModernIcon',
    iconBg: 'bg-terracotta/20',
    iconColor: 'text-terracotta',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11e492967-1773593378128.png',
    imageAlt: 'Modern bright property exterior with blue sky, professional UK residential building',
    highlights: ['Compliance Guidance', 'Certificate Support', 'Tenant Move-In'],
  },
  childcare: {
    category: 'Care',
    icon: 'HeartIcon',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a9de5f79-1767907222508.png',
    imageAlt: 'Happy child playing in bright, safe, colourful indoor environment with caring adult nearby',
    highlights: ['DBS Checked Carers', 'Flexible Scheduling', 'Emergency Support'],
  },
  handyman: {
    category: 'Maintenance',
    icon: 'WrenchScrewdriverIcon',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b0f8fe19-1780332392705.png',
    imageAlt: 'Professional handyman in clean uniform working in bright modern home, organised tools',
    highlights: ['Residential & Commercial', 'Same-Day Available', 'Qualified Tradespeople'],
  },
  security: {
    category: 'Property',
    icon: 'ShieldCheckIcon',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1554bed0c-1773473576842.png',
    imageAlt: 'Modern home security panel with blue light in bright, safe residential hallway',
    highlights: ['24/7 Monitoring Options', 'Professional Installation', 'Free Assessment'],
  },
  meals: {
    category: 'Food',
    icon: 'CakeIcon',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_18a2753c3-1774731453054.png',
    imageAlt: 'Freshly prepared home-cooked meal with colourful vegetables, rice and curry in clean kitchen setting',
    highlights: ['Fresh Daily Meals', 'Dietary Customisation', 'Weekly & Monthly Packages'],
  },
};

export default function ServicesGrid() {
  const { content } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All Services');

  const bentoServices = content?.servicesBento?.services || [];

  const allServices = bentoServices.map((srv) => {
    const meta = serviceMetadata[srv.id] || {
      category: srv.category || 'Home',
      icon: srv.icon || 'SparklesIcon',
      iconBg: srv.iconBg || 'bg-secondary/20',
      iconColor: srv.iconColor || 'text-secondary',
      image: srv.image || 'https://img.rocket.new/generatedImages/rocket_gen_img_129d8935b-1772185190403.png',
      imageAlt: srv.title,
      highlights: srv.tags?.slice(0, 3) || ['Professional Team', 'High Quality Standards', 'Customer Support'],
    };
    return {
      ...srv,
      ...meta,
      image: srv.image || meta.image,
      category: srv.category || meta.category,
      icon: srv.icon || meta.icon,
    };
  });

  const filtered = activeCategory === 'All Services'
    ? allServices
    : allServices.filter((s) => s.category === activeCategory);

  return (
    <section className="py-16 bg-background">
      <div className="site-container">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-600 transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'bg-muted text-muted-foreground hover:bg-cream-dark hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <div key={service.id} className="rounded-4xl overflow-hidden bg-white border border-border shadow-card group card-hover flex flex-col">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <AppImage
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                <div className={`absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-2xl ${service.iconBg} backdrop-blur-sm`}>
                  <Icon name={service.icon as any} size={22} className={service.iconColor} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-800 text-primary mb-2">{service.title}</h2>
                <p className="text-sm text-muted-foreground font-500 leading-relaxed mb-4 flex-1">{service.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-600 bg-muted text-muted-foreground px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {service.highlights?.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={15} className="text-secondary shrink-0" variant="solid" />
                      <span className="text-xs font-600 text-foreground">{h}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/service-detail?service=${service.id}`}
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-700 hover:bg-navy-light transition-all"
                >
                  {service.ctaText || 'View Full Details'}
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-primary rounded-4xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-dot-bg opacity-20" />
          <div className="relative z-10">
            <h3 className="text-2xl font-800 text-white mb-3">
              Not sure which service you need?
            </h3>
            <p className="text-white/70 font-500 mb-6 max-w-md mx-auto">
              Contact us and our team will help you find the right solution for your home or business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={18} />
              Talk to Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}