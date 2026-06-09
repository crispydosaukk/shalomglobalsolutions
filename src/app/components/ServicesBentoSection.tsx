import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const services = [
{
  id: 'cleaning',
  title: 'Professional Cleaning',
  description: 'Residential, commercial, deep cleaning, end-of-tenancy, and specialist cleaning for homes, offices, hotels, and care homes.',
  icon: 'SparklesIcon',
  cardClass: 'service-card-sage',
  iconBg: 'bg-secondary/20',
  iconColor: 'text-secondary',
  tags: ['Domestic', 'Commercial', 'Deep Clean'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdc7d837-1772152005578.png",
  imageAlt: 'Bright clean kitchen with sparkling surfaces, warm morning light, professional cleaning result',
  span: 'lg:col-span-2'
},
{
  id: 'moving',
  title: 'Home Relocation & Moving',
  description: 'Packing, furniture moving, loading, move-in cleaning, and relocation consultation.',
  icon: 'TruckIcon',
  cardClass: 'service-card-navy',
  iconBg: 'bg-primary/10',
  iconColor: 'text-primary',
  tags: ['Packing', 'Furniture', 'Move-In Clean'],
  image: null,
  span: 'lg:col-span-1'
},
{
  id: 'property',
  title: 'Property & Tenant Support',
  description: 'Tenancy agreements, compliance guidance, fire safety, EPC, gas safety, and landlord consultation.',
  icon: 'HomeModernIcon',
  cardClass: 'service-card-terracotta',
  iconBg: 'bg-terracotta/20',
  iconColor: 'text-terracotta',
  tags: ['Landlords', 'Tenants', 'Compliance'],
  image: null,
  span: 'lg:col-span-1'
},
{
  id: 'childcare',
  title: 'Babysitting & Childcare',
  description: 'Professional babysitting, after-school care, weekend childcare, and emergency support for busy families.',
  icon: 'HeartIcon',
  cardClass: 'service-card-rose',
  iconBg: 'bg-pink-100',
  iconColor: 'text-pink-500',
  tags: ['Babysitting', 'After-School', 'Emergency'],
  image: null,
  span: 'lg:col-span-1'
},
{
  id: 'handyman',
  title: 'Handyman Services',
  description: 'Furniture assembly, wall mounting, painting, plumbing support, electrical maintenance, and property repairs.',
  icon: 'WrenchScrewdriverIcon',
  cardClass: 'service-card-gold',
  iconBg: 'bg-amber-100',
  iconColor: 'text-amber-600',
  tags: ['Repairs', 'Assembly', 'Maintenance'],
  image: null,
  span: 'lg:col-span-1'
},
{
  id: 'security',
  title: 'Security & Home Safety',
  description: 'Home security systems, alarm installation, safety assessments, and commercial security solutions.',
  icon: 'ShieldCheckIcon',
  cardClass: 'service-card-teal',
  iconBg: 'bg-teal-100',
  iconColor: 'text-teal-600',
  tags: ['Alarms', 'CCTV', 'Safety'],
  image: null,
  span: 'lg:col-span-1'
},
{
  id: 'meals',
  title: 'Home-Cooked Meal Services',
  description: 'Fresh, nutritious home-cooked meals for individuals, families, professionals, and events. Vegetarian, non-veg, continental, and special dietary options.',
  icon: 'CakeIcon',
  cardClass: 'service-card-gold',
  iconBg: 'bg-orange-100',
  iconColor: 'text-orange-500',
  tags: ['Vegetarian', 'Non-Veg', 'Meal Plans'],
  image: null,
  span: 'lg:col-span-1'
}];


export default function ServicesBentoSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
            What We Offer
          </span>
          <h2 className="text-section-title text-primary mb-4">
            All Your Services,<br />
            <span className="text-secondary">One Trusted Company</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-500 text-base leading-relaxed">
            From daily cleaning to complex property management — we deliver professional, reliable services across the UK.
          </p>
        </div>

        {/* Bento Grid */}
        {/* 
           BENTO AUDIT:
           6 cards: Cleaning(cs-2), Moving(cs-1 rs-2), Property(cs-1), Childcare(cs-1), Handyman(cs-2), Security(cs-1 last row)
           Row 1: [col-1-2: Cleaning cs-2] [col-3: Moving cs-1 rs-2]
           Row 2: [col-1: Property cs-1] [col-2: Childcare cs-1] [col-3: Moving continued]
           Row 3: [col-1-2: Handyman cs-2] [col-3: Security cs-1]
           Placed 6/6 ✓
          */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card: Cleaning (col-span-2, with image) */}
          <div className={`lg:col-span-2 rounded-4xl overflow-hidden relative group card-hover cursor-pointer`}>
            <Link href="/service-detail?service=cleaning" className="block h-full">
              <div className="relative h-64 lg:h-72">
                <AppImage
                  src={services[0].image!}
                  alt={services[0].imageAlt!}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm mb-3`}>
                    <Icon name={services[0].icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-800 text-white mb-2">{services[0].title}</h3>
                  <p className="text-white/70 text-sm font-500 leading-relaxed mb-4 max-w-md">{services[0].description}</p>
                  <div className="flex flex-wrap gap-2">
                    {services[0].tags.map((tag) =>
                    <span key={tag} className="text-xs font-600 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={`${services[0].cardClass} p-5 flex items-center justify-between`}>
                <span className="text-sm font-700 text-primary">View Cleaning Services</span>
                <Icon name="ArrowRightIcon" size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Card: Moving (col-span-1, row-span-2) */}
          <div className="lg:row-span-2 rounded-4xl overflow-hidden service-card-navy group card-hover cursor-pointer flex flex-col h-full">
            <Link href="/service-detail?service=moving" className="flex flex-col h-full p-7">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${services[1].iconBg} mb-5`}>
                <Icon name={services[1].icon as any} size={24} className={services[1].iconColor} />
              </div>
              <h3 className="text-xl font-800 text-primary mb-3">{services[1].title}</h3>
              <p className="text-muted-foreground text-sm font-500 leading-relaxed mb-5 flex-1">{services[1].description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {services[1].tags.map((tag) =>
                <span key={tag} className="text-xs font-600 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {tag}
                  </span>
                )}
              </div>
              {/* Visual: moving checklist */}
              <div className="bg-white/60 rounded-2xl p-4 space-y-2 mb-6">
                {['Packing & Wrapping', 'Furniture Handling', 'Move-In Cleaning', 'Storage Coordination'].map((item) =>
                <div key={item} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-secondary/30 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="CheckIcon" size={10} className="text-secondary" />
                    </div>
                    <span className="text-xs font-600 text-foreground">{item}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm font-700 text-primary group-hover:gap-3 transition-all">
                View Service <Icon name="ArrowRightIcon" size={16} />
              </div>
            </Link>
          </div>

          {/* Card: Property */}
          <ServiceCard service={services[2]} />

          {/* Card: Childcare */}
          <ServiceCard service={services[3]} />

          {/* Card: Handyman (col-span-2) */}
          <div className="lg:col-span-2 rounded-4xl overflow-hidden service-card-gold group card-hover cursor-pointer">
            <Link href="/service-detail?service=handyman" className="flex flex-col sm:flex-row h-full">
              <div className="p-7 flex-1">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${services[4].iconBg} mb-5`}>
                  <Icon name={services[4].icon as any} size={24} className={services[4].iconColor} />
                </div>
                <h3 className="text-xl font-800 text-primary mb-3">{services[4].title}</h3>
                <p className="text-muted-foreground text-sm font-500 leading-relaxed mb-5 max-w-sm">{services[4].description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {services[4].tags.map((tag) =>
                  <span key={tag} className="text-xs font-600 bg-amber-600/10 text-amber-700 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm font-700 text-primary group-hover:gap-3 transition-all">
                  View Service <Icon name="ArrowRightIcon" size={16} />
                </div>
              </div>
              {/* Right visual */}
              <div className="sm:w-48 bg-amber-100/50 flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-3">
                  {['WrenchScrewdriverIcon', 'PaintBrushIcon', 'BoltIcon', 'HomeIcon'].map((iconName) =>
                  <div key={iconName} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Icon name={iconName as any} size={22} className="text-amber-600" />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* Card: Security */}
          <ServiceCard service={services[5]} />

          {/* Card: Meals */}
          <ServiceCard service={services[6]} />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-700 hover:bg-navy-light transition-all shadow-card">
            
            View All Services
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
        </div>
      </div>
    </section>);

}

function ServiceCard({ service }: {service: typeof services[0];}) {
  return (
    <div className={`rounded-4xl overflow-hidden ${service.cardClass} group card-hover cursor-pointer`}>
      <Link href={`/service-detail?service=${service.id}`} className="block p-7 h-full">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${service.iconBg} mb-5`}>
          <Icon name={service.icon as any} size={24} className={service.iconColor} />
        </div>
        <h3 className="text-xl font-800 text-primary mb-3">{service.title}</h3>
        <p className="text-muted-foreground text-sm font-500 leading-relaxed mb-5">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map((tag) =>
          <span key={tag} className={`text-xs font-600 bg-primary/8 text-primary px-3 py-1 rounded-full`}>
              {tag}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm font-700 text-primary group-hover:gap-3 transition-all">
          View Service <Icon name="ArrowRightIcon" size={16} />
        </div>
      </Link>
    </div>);

}