'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import ContactForm from '@/app/components/ContactForm';

const serviceData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  accentColor: string;
  image: string;
  imageAlt: string;
  includes: string[];
  benefits: string[];
  process: {step: string;title: string;desc: string;}[];
  faqs: {q: string;a: string;}[];
}> = {
  cleaning: {
    title: 'Professional Cleaning Services',
    subtitle: 'Quality, Care & Reliability',
    description: 'Shalom Global Solution delivers comprehensive professional cleaning services for homes, offices, hotels, restaurants, care homes, and commercial properties. Our trained cleaning teams use professional-grade equipment and eco-friendly products to deliver spotless results every time.',
    icon: 'SparklesIcon',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    accentColor: 'bg-secondary',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_129d8935b-1772185190403.png",
    imageAlt: 'Sparkling clean modern kitchen with bright natural light, white surfaces, professional deep clean result',
    includes: [
    'Domestic & residential cleaning',
    'Commercial office cleaning',
    'Deep cleaning & sanitisation',
    'End-of-tenancy cleaning',
    'Hotel & hospitality cleaning',
    'Care home & healthcare cleaning',
    'Move-in cleaning preparation',
    'Post-construction cleaning',
    'Carpet & upholstery cleaning',
    'Window & glass cleaning'],

    benefits: [
    'Professionally trained and uniformed staff',
    'Eco-friendly, child & pet-safe products',
    'Flexible scheduling — daily, weekly, monthly',
    'Fully insured and DBS-checked team',
    'Satisfaction guarantee on every visit',
    'Competitive, transparent pricing'],

    process: [
    { step: '01', title: 'Book Your Service', desc: 'Contact us with your requirements, property type, and preferred schedule.' },
    { step: '02', title: 'We Assess & Quote', desc: 'Our team provides a tailored quote based on your property size and cleaning needs.' },
    { step: '03', title: 'Professional Clean', desc: 'Our uniformed team arrives on time and delivers a thorough, professional clean.' },
    { step: '04', title: 'Quality Check', desc: 'We ensure every area meets our high standards before leaving your property.' }],

    faqs: [
    { q: 'Do you supply all cleaning equipment and products?', a: 'Yes, our team brings all professional-grade equipment and eco-friendly cleaning products to every job.' },
    { q: 'Are your staff DBS checked?', a: 'Absolutely. All cleaning staff are DBS checked and legally employed in compliance with UK regulations.' },
    { q: 'Can I book a regular cleaning schedule?', a: 'Yes, we offer flexible recurring schedules — daily, weekly, fortnightly, or monthly — to suit your needs.' },
    { q: 'Do you offer end-of-tenancy cleaning?', a: 'Yes, we specialise in end-of-tenancy cleaning to help tenants get their full deposit back and landlords prepare properties for new tenants.' }]

  },
  moving: {
    title: 'Home Relocation & Moving Services',
    subtitle: 'Making Every Move Safe & Stress-Free',
    description: 'Shalom Global Solution provides professional home relocation and moving support services designed to make the moving process easier, safer, and less stressful for individuals, families, tenants, and businesses.',
    icon: 'TruckIcon',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accentColor: 'bg-primary',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e46ebffd-1772962818279.png",
    imageAlt: 'Bright moving day with neatly stacked boxes in clean home, organised professional relocation team',
    includes: [
    'Home moving assistance',
    'Professional packing & unpacking',
    'Furniture moving & dismantling',
    'Loading & unloading support',
    'Move-in cleaning preparation',
    'Temporary storage coordination',
    'Relocation consultation',
    'Fragile item handling',
    'Box labelling & organisation',
    'Property preparation guidance'],

    benefits: [
    'Stress-free, fully managed relocation',
    'Safe handling of all belongings',
    'Professional packing materials',
    'Local and long-distance moves',
    'Flexible scheduling around you',
    'Affordable, transparent pricing'],

    process: [
    { step: '01', title: 'Consultation', desc: 'We discuss your moving requirements, timeline, and property details.' },
    { step: '02', title: 'Planning', desc: 'Our team creates an organised moving plan tailored to your needs.' },
    { step: '03', title: 'Pack & Move', desc: 'Professional packing, careful handling, and efficient relocation.' },
    { step: '04', title: 'Settle In', desc: 'We unpack, organise, and complete move-in cleaning to get you settled.' }],

    faqs: [
    { q: 'Do you provide packing materials?', a: 'Yes, we supply all packing boxes, bubble wrap, tape, and protective materials needed for your move.' },
    { q: 'Can you handle fragile and valuable items?', a: 'Absolutely. Our team is trained in careful handling techniques for fragile, antique, and valuable items.' },
    { q: 'Do you offer long-distance moves?', a: 'Yes, we support both local and long-distance relocations across the UK.' },
    { q: 'Can you combine moving with cleaning?', a: 'Yes, we can combine relocation with move-in or move-out cleaning for a complete, convenient service.' }]

  },
  property: {
    title: 'Property & Tenant Management Support',
    subtitle: 'Simplifying Property for Landlords & Tenants',
    description: 'Shalom Global Solution provides comprehensive property and tenant management support services for landlords, tenants, property owners, and investors. We simplify property-related procedures with reliable guidance and practical solutions.',
    icon: 'HomeModernIcon',
    iconBg: 'bg-terracotta/10',
    iconColor: 'text-terracotta',
    accentColor: 'bg-terracotta',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1131a9e-1770300427659.png",
    imageAlt: 'Modern bright UK residential property exterior with clear blue sky, professional estate',
    includes: [
    'Tenant move-in & relocation support',
    'Property consultation services',
    'Estate agent & solicitor guidance',
    'Tenancy agreement assistance',
    'Fire safety certificate guidance',
    'Energy Performance Certificate (EPC) support',
    'Gas Safety Certificate assistance',
    'EICR (Electrical) guidance',
    'Smoke & carbon monoxide compliance',
    'Inventory & inspection support',
    'Landlord compliance consultation'],

    benefits: [
    'Expert guidance for landlords & tenants',
    'UK compliance regulation support',
    'Saves time on complex property processes',
    'Professional property documentation support',
    'Trusted referrals to estate agents & solicitors',
    'Comprehensive property management assistance'],

    process: [
    { step: '01', title: 'Initial Consultation', desc: 'We understand your property situation and specific requirements.' },
    { step: '02', title: 'Compliance Review', desc: 'We assess what certificates and documentation you need.' },
    { step: '03', title: 'Professional Guidance', desc: 'We guide you through each process and connect you with qualified professionals.' },
    { step: '04', title: 'Ongoing Support', desc: 'We provide continued assistance for property management needs.' }],

    faqs: [
    { q: 'Do you provide legal advice?', a: 'We provide guidance and information support. For legal advice, we connect you with qualified solicitors.' },
    { q: 'Can you help first-time landlords?', a: 'Yes, we specialise in supporting first-time landlords through all compliance requirements and property management processes.' },
    { q: 'What compliance certificates do landlords need?', a: 'UK landlords typically require Gas Safety, EPC, EICR, and fire safety compliance. We guide you through each of these.' },
    { q: 'Do you help international tenants?', a: 'Yes, we have experience supporting international tenants navigating UK property processes.' }]

  },
  childcare: {
    title: 'Babysitting & Childcare Services',
    subtitle: 'Caring Childcare You Can Trust',
    description: 'Shalom Global Solution provides professional babysitting and childcare support services designed to help families and busy parents manage their daily responsibilities with confidence, convenience, and complete peace of mind.',
    icon: 'HeartIcon',
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-500',
    accentColor: 'bg-pink-500',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f708c5af-1772098844977.png",
    imageAlt: 'Happy child smiling in bright, colourful, safe indoor environment with warm natural light',
    includes: [
    'Professional in-home babysitting',
    'Child supervision & care',
    'After-school childcare',
    'Weekend babysitting',
    'Emergency childcare assistance',
    'Working parent support',
    'Meal & snack preparation',
    'Bedtime routine assistance',
    'Basic educational activities',
    'Child safety monitoring'],

    benefits: [
    'DBS checked and verified caregivers',
    'Professionally trained childcare staff',
    'Flexible scheduling options',
    'Emergency & short-notice support',
    'Safe, child-friendly environments',
    'Peace of mind for busy parents'],

    process: [
    { step: '01', title: 'Enquire & Match', desc: 'Tell us about your child, schedule, and specific care requirements.' },
    { step: '02', title: 'Meet Your Carer', desc: 'We match you with a suitable, verified carer for an introductory meeting.' },
    { step: '03', title: 'Care Begins', desc: 'Your carer arrives on time and provides safe, attentive childcare.' },
    { step: '04', title: 'Regular Updates', desc: 'We maintain communication to ensure continued satisfaction and child wellbeing.' }],

    faqs: [
    { q: 'Are your childcare staff DBS checked?', a: 'Yes, all childcare staff undergo DBS (Disclosure and Barring Service) checks before working with children.' },
    { q: 'Can you provide emergency childcare at short notice?', a: 'We do our best to accommodate short-notice requests. Contact us directly for urgent childcare needs.' },
    { q: 'What age groups do you cover?', a: 'We provide childcare for toddlers, young children, and school-age children. Please specify your child\'s age when enquiring.' },
    { q: 'Do you offer regular weekly childcare?', a: 'Yes, we offer flexible recurring childcare arrangements tailored to your weekly schedule.' }]

  },
  handyman: {
    title: 'Professional Handyman Services',
    subtitle: 'Reliable Repairs for Homes & Businesses',
    description: 'Shalom Global Solution provides professional handyman services for homeowners, tenants, landlords, businesses, and property managers. Our experienced team handles a wide range of maintenance, repair, and installation tasks efficiently and affordably.',
    icon: 'WrenchScrewdriverIcon',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    accentColor: 'bg-amber-500',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0f8fe19-1780332392705.png",
    imageAlt: 'Professional handyman in clean uniform with tools in bright modern home, organised workspace',
    includes: [
    'General property repairs',
    'Furniture assembly (flat-pack)',
    'TV & mirror wall mounting',
    'Shelf & curtain installation',
    'Painting & touch-up services',
    'Minor plumbing maintenance',
    'Light fitting & electrical support',
    'Door, lock & handle repairs',
    'Garden & outdoor maintenance',
    'Emergency maintenance support'],

    benefits: [
    'Experienced and skilled tradespeople',
    'Residential and commercial coverage',
    'Affordable, transparent pricing',
    'Same-day availability where possible',
    'Full property maintenance support',
    'Landlord & tenant repair assistance'],

    process: [
    { step: '01', title: 'Describe the Job', desc: 'Tell us what needs fixing, installing, or assembling.' },
    { step: '02', title: 'Get a Quote', desc: 'We provide a clear, upfront quote with no hidden costs.' },
    { step: '03', title: 'We Get It Done', desc: 'Our skilled handyman arrives on time and completes the work professionally.' },
    { step: '04', title: 'Job Complete', desc: 'We clean up after ourselves and ensure you\'re fully satisfied.' }],

    faqs: [
    { q: 'Do you handle both small and large jobs?', a: 'Yes, we handle everything from a single shelf fitting to full property maintenance programmes for landlords.' },
    { q: 'Can you assemble IKEA and flat-pack furniture?', a: 'Absolutely. Furniture assembly is one of our most popular services — we handle all major brands.' },
    { q: 'Do you offer emergency repairs?', a: 'We provide responsive support for urgent maintenance needs whenever possible. Contact us directly for emergencies.' },
    { q: 'Are your handymen insured?', a: 'Yes, all our handymen are fully insured and legally employed, giving you complete peace of mind.' }]

  },
  security: {
    title: 'Security & Home Safety Services',
    subtitle: 'Protecting What Matters Most',
    description: 'Shalom Global Solution provides professional home security and safety services for residential and commercial properties. From alarm installation to safety assessments, we help you protect your property and loved ones.',
    icon: 'ShieldCheckIcon',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    accentColor: 'bg-teal-600',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1017303ad-1772392147881.png",
    imageAlt: 'Modern home security panel with soft blue light in bright, safe UK residential hallway',
    includes: [
    'Home security system installation',
    'Burglar alarm fitting & setup',
    'CCTV system guidance & installation',
    'Home safety assessment',
    'Smoke alarm installation',
    'Carbon monoxide detector fitting',
    'Door & window security upgrades',
    'Commercial security solutions',
    'Security consultation services',
    'Emergency response planning'],

    benefits: [
    'Professional security assessment',
    'Certified installation team',
    'Residential and commercial coverage',
    'Free initial security consultation',
    'Ongoing monitoring options available',
    'Peace of mind for families and businesses'],

    process: [
    { step: '01', title: 'Free Assessment', desc: 'We visit your property and assess your security requirements.' },
    { step: '02', title: 'Tailored Solution', desc: 'We recommend the most suitable security system for your property.' },
    { step: '03', title: 'Professional Install', desc: 'Our certified team installs and configures your security system.' },
    { step: '04', title: 'Handover & Support', desc: 'We demonstrate the system and provide ongoing support.' }],

    faqs: [
    { q: 'Do you offer CCTV installation?', a: 'Yes, we provide CCTV guidance and installation for both residential and commercial properties.' },
    { q: 'Can you upgrade my existing security?', a: 'Absolutely. We assess your current setup and recommend cost-effective upgrades to improve protection.' },
    { q: 'Do you cover commercial properties?', a: 'Yes, we provide security solutions for shops, offices, warehouses, and other commercial premises.' },
    { q: 'Is the initial security assessment free?', a: 'Yes, we offer a free initial security consultation and assessment for all new customers.' }]

  },
  meals: {
    title: 'Home-Cooked Meal Services',
    subtitle: 'Freshly Prepared Meals with Care, Quality & Comfort',
    description: 'Shalom Global Solution provides professional home-cooked meal services designed to deliver fresh, delicious, hygienic, and nutritious meals for individuals, families, busy professionals, elderly clients, students, and special events. We combine taste, health, convenience, and affordability in every meal we prepare.',
    icon: 'CakeIcon',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    accentColor: 'bg-orange-500',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18a2753c3-1774731453054.png",
    imageAlt: 'Freshly prepared home-cooked meal with colourful vegetables, rice and curry in clean kitchen setting',
    includes: [
    'Vegetarian meal preparation',
    'Non-vegetarian meal preparation',
    'Continental cuisine',
    'Healthy home-cooked meals',
    'Family meal planning',
    'Special dietary meal options',
    'Meal preparation for events & gatherings',
    'Weekly and monthly meal packages',
    'Low-salt & low-sugar meal options',
    'Allergy-aware meal preparation'],

    benefits: [
    'Freshly prepared daily home-style meals',
    'Hygienic cooking and food safety standards',
    'Balanced nutrition and portion control',
    'Flexible weekly and monthly packages',
    'Customised menus for dietary needs',
    'Affordable and convenient meal solutions'],

    process: [
    { step: '01', title: 'Share Your Preferences', desc: 'Tell us your dietary requirements, meal preferences, and schedule.' },
    { step: '02', title: 'Customised Menu Plan', desc: 'We create a personalised meal plan tailored to your needs and lifestyle.' },
    { step: '03', title: 'Fresh Preparation', desc: 'Our team prepares your meals fresh with quality ingredients and high hygiene standards.' },
    { step: '04', title: 'Delivery & Enjoyment', desc: 'Meals are delivered on schedule so you can enjoy wholesome home-cooked food every day.' }],

    faqs: [
    { q: 'Can you cater for special dietary requirements?', a: 'Yes, we offer customised meal options for vegetarian, vegan, low-salt, low-sugar, high-protein, and allergy-aware diets.' },
    { q: 'Do you offer weekly and monthly meal packages?', a: 'Yes, we provide flexible weekly and monthly meal packages ideal for busy professionals, families, students, and elderly clients.' },
    { q: 'Can you prepare meals for events and gatherings?', a: 'Absolutely. We prepare fresh, professionally presented meals for family gatherings, birthday celebrations, small events, and buffet-style occasions.' },
    { q: 'Are the meals prepared fresh daily?', a: 'Yes, all meals are freshly prepared with quality ingredients, following strict hygiene and food safety standards.' }]

  }
};

const defaultService = 'cleaning';

export default function ServiceDetailContent() {
  const searchParams = useSearchParams();
  const serviceKey = searchParams.get('service') || defaultService;
  const service = serviceData[serviceKey] || serviceData[defaultService];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-dot-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-white/50 text-sm font-500 hover:text-white transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={14} className="text-white/30" />
            <Link href="/services" className="text-white/50 text-sm font-500 hover:text-white transition-colors">Services</Link>
            <Icon name="ChevronRightIcon" size={14} className="text-white/30" />
            <span className="text-white/80 text-sm font-600">{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${service.iconBg} mb-6`}>
                <Icon name={service.icon as any} size={28} className={service.iconColor} />
              </div>
              <p className="text-secondary text-sm font-700 uppercase tracking-widest mb-3">{service.subtitle}</p>
              <h1 className="text-hero text-white mb-6">{service.title}</h1>
              <p className="text-white/70 font-500 leading-relaxed text-lg mb-8">{service.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all">
                  <Icon name="PhoneIcon" size={16} />
                  Get a Free Quote
                </Link>
                <a href="#enquiry" className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl text-sm font-700 hover:bg-white/10 transition-all">
                  Book Now
                </a>
              </div>
            </div>
            <div className="rounded-4xl overflow-hidden shadow-hero">
              <AppImage
                src={service.image}
                alt={service.imageAlt}
                width={600}
                height={420}
                className="w-full h-72 lg:h-96 object-cover"
                priority />
              
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L1440 40L1440 10C1200 40 720 0 0 20L0 40Z" fill="#FAF8F3" />
          </svg>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* What's included */}
              <div>
                <h2 className="text-2xl font-800 text-primary mb-6">What&apos;s Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.includes.map((item) =>
                  <div key={item} className="flex items-start gap-3 bg-white border border-border rounded-2xl p-4">
                      <div className="w-6 h-6 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name="CheckIcon" size={13} className="text-secondary" />
                      </div>
                      <span className="text-sm font-600 text-foreground">{item}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key benefits */}
              <div>
                <h2 className="text-2xl font-800 text-primary mb-6">Key Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((b) =>
                  <div key={b} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name="CheckIcon" size={15} className="text-white" />
                      </div>
                      <span className="text-sm font-600 text-foreground leading-relaxed pt-1">{b}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-800 text-primary mb-8">How It Works</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {service.process.map((step) =>
                  <div key={step.step} className="bg-white border border-border rounded-3xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-800 text-secondary/60 uppercase tracking-widest">{step.step}</span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                      <h3 className="font-800 text-primary mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground font-500 leading-relaxed">{step.desc}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-800 text-primary mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) =>
                  <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
                      <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left">
                      
                        <span className="font-700 text-sm text-primary pr-4">{faq.q}</span>
                        <Icon
                        name={openFaq === i ? 'MinusIcon' : 'PlusIcon'}
                        size={18}
                        className="text-muted-foreground shrink-0" />
                      
                      </button>
                      {openFaq === i &&
                    <div className="px-5 pb-5">
                          <p className="text-sm text-muted-foreground font-500 leading-relaxed">{faq.a}</p>
                        </div>
                    }
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sticky enquiry form */}
            <div id="enquiry">
              <div className="sticky top-24 bg-white border border-border rounded-4xl p-7 shadow-card">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${service.iconBg} mb-4`}>
                  <Icon name={service.icon as any} size={24} className={service.iconColor} />
                </div>
                <h3 className="text-lg font-800 text-primary mb-1">Book This Service</h3>
                <p className="text-sm text-muted-foreground font-500 mb-6 leading-relaxed">
                  Fill in your details and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 bg-cream-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-800 text-primary mb-3">Explore Our Other Services</h2>
          <p className="text-muted-foreground font-500 mb-8">One trusted company for all your home and business needs.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(serviceData).filter(([key]) => key !== serviceKey).map(([key, s]) =>
            <Link
              key={key}
              href={`/service-detail?service=${key}`}
              className="inline-flex items-center gap-2 bg-white border border-border text-foreground px-5 py-2.5 rounded-xl text-sm font-600 hover:bg-muted hover:text-primary transition-all shadow-sm">
              
                <Icon name={s.icon as any} size={16} className={s.iconColor} />
                {s.title.split(' ').slice(0, 3).join(' ')}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>);

}