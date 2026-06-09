'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const categories = ['All Services', 'Home', 'Property', 'Care', 'Maintenance', 'Food'];

const allServices = [
{
  id: 'cleaning',
  category: 'Home',
  title: 'Professional Cleaning Services',
  description: 'Comprehensive cleaning for homes, offices, hotels, restaurants, and care homes. Deep cleaning, end-of-tenancy, and regular scheduled services.',
  icon: 'SparklesIcon',
  cardClass: 'service-card-sage',
  iconBg: 'bg-secondary/20',
  iconColor: 'text-secondary',
  tags: ['Domestic', 'Commercial', 'Deep Clean', 'End of Tenancy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_129d8935b-1772185190403.png",
  imageAlt: 'Sparkling clean modern kitchen with bright natural light, professional cleaning result',
  highlights: ['Residential & Commercial', 'Fully Insured Team', 'Eco-Friendly Products']
},
{
  id: 'moving',
  category: 'Home',
  title: 'Home Relocation & Moving',
  description: 'Stress-free relocation support including packing, furniture moving, loading, move-in cleaning, and relocation consultation.',
  icon: 'TruckIcon',
  cardClass: 'service-card-navy',
  iconBg: 'bg-primary/10',
  iconColor: 'text-primary',
  tags: ['Packing', 'Furniture', 'Move-In Clean', 'Storage'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1384b98d6-1773100531867.png",
  imageAlt: 'Bright moving day with boxes and helpers in clean home, organised professional relocation',
  highlights: ['Local & Long Distance', 'Furniture Assembly', 'Move-In Cleaning']
},
{
  id: 'property',
  category: 'Property',
  title: 'Property & Tenant Support',
  description: 'Expert guidance for landlords and tenants — compliance certificates, tenancy agreements, estate agent referrals, and property management.',
  icon: 'HomeModernIcon',
  cardClass: 'service-card-terracotta',
  iconBg: 'bg-terracotta/20',
  iconColor: 'text-terracotta',
  tags: ['Landlords', 'Tenants', 'EPC', 'Gas Safety', 'EICR'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11e492967-1773593378128.png",
  imageAlt: 'Modern bright property exterior with blue sky, professional UK residential building',
  highlights: ['Compliance Guidance', 'Certificate Support', 'Tenant Move-In']
},
{
  id: 'childcare',
  category: 'Care',
  title: 'Babysitting & Childcare',
  description: 'Professional, caring childcare support for busy families — babysitting, after-school care, weekend childcare, and emergency support.',
  icon: 'HeartIcon',
  cardClass: 'service-card-rose',
  iconBg: 'bg-pink-100',
  iconColor: 'text-pink-500',
  tags: ['Babysitting', 'After-School', 'Weekend', 'Emergency'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9de5f79-1767907222508.png",
  imageAlt: 'Happy child playing in bright, safe, colourful indoor environment with caring adult nearby',
  highlights: ['DBS Checked Carers', 'Flexible Scheduling', 'Emergency Support']
},
{
  id: 'handyman',
  category: 'Maintenance',
  title: 'Handyman Services',
  description: 'Reliable property maintenance — furniture assembly, wall mounting, painting, plumbing support, electrical maintenance, and general repairs.',
  icon: 'WrenchScrewdriverIcon',
  cardClass: 'service-card-gold',
  iconBg: 'bg-amber-100',
  iconColor: 'text-amber-600',
  tags: ['Repairs', 'Assembly', 'Painting', 'Plumbing', 'Electrical'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0f8fe19-1780332392705.png",
  imageAlt: 'Professional handyman in clean uniform working in bright modern home, organised tools',
  highlights: ['Residential & Commercial', 'Same-Day Available', 'Qualified Tradespeople']
},
{
  id: 'security',
  category: 'Property',
  title: 'Security & Home Safety',
  description: 'Home security systems, alarm installation, safety assessments, CCTV guidance, and commercial security solutions.',
  icon: 'ShieldCheckIcon',
  cardClass: 'service-card-teal',
  iconBg: 'bg-teal-100',
  iconColor: 'text-teal-600',
  tags: ['Alarms', 'CCTV', 'Safety Audit', 'Commercial'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1554bed0c-1773473576842.png",
  imageAlt: 'Modern home security panel with blue light in bright, safe residential hallway',
  highlights: ['24/7 Monitoring Options', 'Professional Installation', 'Free Assessment']
},
{
  id: 'meals',
  category: 'Food',
  title: 'Home-Cooked Meal Services',
  description: 'Freshly prepared home-cooked meals for individuals, families, professionals, and events. Vegetarian, non-vegetarian, continental, and special dietary options.',
  icon: 'CakeIcon',
  cardClass: 'service-card-gold',
  iconBg: 'bg-orange-100',
  iconColor: 'text-orange-500',
  tags: ['Vegetarian', 'Non-Veg', 'Continental', 'Meal Plans'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18a2753c3-1774731453054.png",
  imageAlt: 'Freshly prepared home-cooked meal with colourful vegetables, rice and curry in clean kitchen setting',
  highlights: ['Fresh Daily Meals', 'Dietary Customisation', 'Weekly & Monthly Packages']
}];


export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState('All Services');

  const filtered = activeCategory === 'All Services' ?
  allServices :
  allServices.filter((s) => s.category === activeCategory);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-600 transition-all ${
            activeCategory === cat ?
            'bg-primary text-primary-foreground shadow-card' :
            'bg-muted text-muted-foreground hover:bg-cream-dark hover:text-primary'}`
            }>
            
              {cat}
            </button>
          )}
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) =>
          <div key={service.id} className="rounded-4xl overflow-hidden bg-white border border-border shadow-card group card-hover flex flex-col">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <AppImage
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" />
              
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
                  {service.tags.slice(0, 3).map((tag) =>
                <span key={tag} className="text-xs font-600 bg-muted text-muted-foreground px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                )}
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {service.highlights.map((h) =>
                <div key={h} className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={15} className="text-secondary shrink-0" variant="solid" />
                      <span className="text-xs font-600 text-foreground">{h}</span>
                    </div>
                )}
                </div>

                <Link
                href={`/service-detail?service=${service.id}`}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-700 hover:bg-navy-light transition-all">
                
                  View Full Details
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          )}
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
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all">
              
              <Icon name="ChatBubbleLeftRightIcon" size={18} />
              Talk to Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>);

}