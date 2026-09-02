export interface CMSContent {
  header: {
    logoText: string;
    quoteButtonText: string;
    navLinks: Array<{ label: string; href: string }>;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subheadline: string;
    exploreBtnText: string;
    quoteBtnText: string;
    stats: Array<{ value: string; label: string }>;
    floatingBadge1Title: string;
    floatingBadge1Sub: string;
    floatingBadge2Title: string;
    floatingBadge2Sub: string;
    floatingBadge3Title: string;
    floatingBadge3Sub: string;
  };
  servicesBento: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    viewAllBtnText: string;
    services: Array<{
      id: string;
      title: string;
      description: string;
      tags: string[];
      ctaText: string;
    }>;
  };
  whyChooseUs: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    stats: Array<{ value: string; label: string; icon: string }>;
    isoBadgeTitle: string;
    isoBadgeDesc: string;
    reasons: Array<{
      icon: string;
      title: string;
      desc: string;
      color: string;
    }>;
  };
  testimonials: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    items: Array<{
      name: string;
      role: string;
      quote: string;
      rating: number;
      service: string;
      avatar: string;
    }>;
  };
  homeCTA: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    quoteBtnText: string;
    callBtnText: string;
    phoneDisplay: string;
    guaranteeTitle: string;
    guaranteeDesc: string;
  };
  about: {
    hero: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      subtitle: string;
      servicesBtnText: string;
      contactBtnText: string;
      stats: Array<{ value: string; label: string; icon: string }>;
    };
    mission: {
      badge: string;
      title: string;
      subtitle: string;
      missionTitle: string;
      missionDesc: string;
      visionTitle: string;
      visionDesc: string;
      pillars: Array<{ title: string; desc: string; icon: string }>;
    };
    credentials: {
      badge: string;
      title: string;
      subtitle: string;
      items: Array<{ title: string; desc: string; badgeText: string; icon: string }>;
    };
    teamValues: {
      badge: string;
      title: string;
      subtitle: string;
      values: Array<{ title: string; desc: string; icon: string }>;
    };
  };
  servicesPage: {
    hero: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      subtitle: string;
      quoteBtnText: string;
      phoneBtnText: string;
      phoneDisplay: string;
    };
    grid: {
      badge: string;
      title: string;
      subtitle: string;
    };
  };
  serviceDetail: {
    cleaning: {
      title: string;
      subtitle: string;
      overview: string;
      features: string[];
      benefits: Array<{ title: string; desc: string }>;
      pricingNote: string;
    };
    moving: {
      title: string;
      subtitle: string;
      overview: string;
      features: string[];
      benefits: Array<{ title: string; desc: string }>;
      pricingNote: string;
    };
    property: {
      title: string;
      subtitle: string;
      overview: string;
      features: string[];
      benefits: Array<{ title: string; desc: string }>;
      pricingNote: string;
    };
    childcare: {
      title: string;
      subtitle: string;
      overview: string;
      features: string[];
      benefits: Array<{ title: string; desc: string }>;
      pricingNote: string;
    };
    handyman: {
      title: string;
      subtitle: string;
      overview: string;
      features: string[];
      benefits: Array<{ title: string; desc: string }>;
      pricingNote: string;
    };
    security: {
      title: string;
      subtitle: string;
      overview: string;
      features: string[];
      benefits: Array<{ title: string; desc: string }>;
      pricingNote: string;
    };
    meals: {
      title: string;
      subtitle: string;
      overview: string;
      features: string[];
      benefits: Array<{ title: string; desc: string }>;
      pricingNote: string;
    };
  };
  contact: {
    hero: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      subtitle: string;
    };
    main: {
      officeTitle: string;
      officeAddress: string;
      officeCity: string;
      phoneTitle: string;
      phoneNumber: string;
      emailTitle: string;
      emailAddress: string;
      hoursTitle: string;
      hoursWeekdays: string;
      hoursWeekends: string;
      emergencyNote: string;
    };
    form: {
      title: string;
      subtitle: string;
      submitBtnText: string;
      successMessage: string;
    };
    faq: {
      badge: string;
      title: string;
      subtitle: string;
      items: Array<{ question: string; answer: string }>;
    };
  };
  blog: {
    hero: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      subtitle: string;
      searchPlaceholder: string;
    };
    articles: Array<{
      id: string;
      title: string;
      excerpt: string;
      category: string;
      date: string;
      readTime: string;
      author: string;
    }>;
  };
  footer: {
    brandName: string;
    brandDescription: string;
    locationText: string;
    phoneNumber: string;
    emailAddress: string;
    bookServiceBtnText: string;
    copyrightText: string;
  };
  emailSettings: {
    notificationsEnabled: boolean;
    recipients: string[];
    senderName: string;
    subjectPrefix: string;
  };
}

export const defaultCMSContent: CMSContent = {
  header: {
    logoText: 'ShalomGlobal',
    quoteButtonText: 'Get a Quote',
    navLinks: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  hero: {
    badge: 'Trusted UK Service Provider',
    headlinePart1: 'Solutions for',
    headlineHighlight: 'Every Need',
    headlinePart2: 'Under One Roof',
    subheadline: 'Professional cleaning, relocation, property management, childcare, and handyman services — delivered with care, reliability, and excellence across the UK.',
    exploreBtnText: 'Explore Services',
    quoteBtnText: 'Get a Free Quote',
    stats: [
      { value: '500+', label: 'Happy Clients' },
      { value: '6+', label: 'Services Offered' },
      { value: '100%', label: 'Verified Staff' },
    ],
    floatingBadge1Title: 'DBS Checked',
    floatingBadge1Sub: 'All Staff Verified',
    floatingBadge2Title: '5.0 Rating',
    floatingBadge2Sub: '200+ Reviews',
    floatingBadge3Title: '6 Services',
    floatingBadge3Sub: 'One Company',
  },
  servicesBento: {
    badge: 'What We Offer',
    titleLine1: 'All Your Services,',
    titleHighlight: 'One Trusted Company',
    subtitle: 'From daily cleaning to complex property management — we deliver professional, reliable services across the UK.',
    viewAllBtnText: 'View All Services',
    services: [
      {
        id: 'cleaning',
        title: 'Professional Cleaning',
        description: 'Residential, commercial, deep cleaning, end-of-tenancy, and specialist cleaning for homes, offices, hotels, and care homes.',
        tags: ['Domestic', 'Commercial', 'Deep Clean'],
        ctaText: 'View Cleaning Services',
      },
      {
        id: 'moving',
        title: 'Home Relocation & Moving',
        description: 'Packing, furniture moving, loading, move-in cleaning, and relocation consultation.',
        tags: ['Packing', 'Furniture', 'Move-In Clean'],
        ctaText: 'View Service',
      },
      {
        id: 'property',
        title: 'Property & Tenant Support',
        description: 'Tenancy agreements, compliance guidance, fire safety, EPC, gas safety, and landlord consultation.',
        tags: ['Landlords', 'Tenants', 'Compliance'],
        ctaText: 'View Service',
      },
      {
        id: 'childcare',
        title: 'Babysitting & Childcare',
        description: 'Professional babysitting, after-school care, weekend childcare, and emergency support for busy families.',
        tags: ['Babysitting', 'After-School', 'Emergency'],
        ctaText: 'View Service',
      },
      {
        id: 'handyman',
        title: 'Handyman Services',
        description: 'Furniture assembly, wall mounting, painting, plumbing support, electrical maintenance, and property repairs.',
        tags: ['Repairs', 'Assembly', 'Maintenance'],
        ctaText: 'View Service',
      },
      {
        id: 'security',
        title: 'Security & Home Safety',
        description: 'Home security systems, alarm installation, safety assessments, and commercial security solutions.',
        tags: ['Alarms', 'CCTV', 'Safety'],
        ctaText: 'View Service',
      },
      {
        id: 'meals',
        title: 'Home-Cooked Meal Services',
        description: 'Fresh, nutritious home-cooked meals for individuals, families, professionals, and events. Vegetarian, non-veg, continental, and special dietary options.',
        tags: ['Vegetarian', 'Non-Veg', 'Meal Plans'],
        ctaText: 'View Service',
      },
    ],
  },
  whyChooseUs: {
    badge: 'Why Choose Us',
    titleLine1: 'Trusted by Hundreds',
    titleHighlight: 'Across the UK',
    subtitle: 'We combine professionalism, innovation, and customer care to deliver high-quality services you can depend on — every single time.',
    stats: [
      { value: '500+', label: 'Clients Served', icon: 'UserGroupIcon' },
      { value: '6+', label: 'Services Offered', icon: 'RectangleStackIcon' },
      { value: '100%', label: 'DBS Checked Staff', icon: 'ShieldCheckIcon' },
      { value: '5★', label: 'Average Rating', icon: 'StarIcon' },
    ],
    isoBadgeTitle: 'ISO Compliant',
    isoBadgeDesc: 'Fully compliant with UK Health & Safety, employment, and data protection regulations.',
    reasons: [
      {
        icon: 'ShieldCheckIcon',
        title: 'Legally Employed & Verified',
        desc: 'All staff are legally employed, DBS checked, and verified in compliance with UK employment regulations.',
        color: 'bg-secondary/10 text-secondary',
      },
      {
        icon: 'AcademicCapIcon',
        title: 'Professionally Trained',
        desc: 'Ongoing training in hygiene standards, health & safety, customer service, and specialist equipment.',
        color: 'bg-primary/10 text-primary',
      },
      {
        icon: 'ClockIcon',
        title: 'Reliable & Punctual',
        desc: 'We arrive on time, every time. Our team is committed to completing services efficiently and professionally.',
        color: 'bg-terracotta/10 text-terracotta',
      },
      {
        icon: 'CurrencyPoundIcon',
        title: 'Flexible & Affordable',
        desc: 'Competitive pricing with flexible packages tailored for homes, businesses, and commercial properties.',
        color: 'bg-amber-100 text-amber-600',
      },
      {
        icon: 'BuildingOffice2Icon',
        title: 'Multi-Environment Expertise',
        desc: 'Homes, offices, hotels, restaurants, care homes — our team adapts to every environment.',
        color: 'bg-teal-100 text-teal-600',
      },
      {
        icon: 'HeartIcon',
        title: 'Customer-First Approach',
        desc: 'Friendly communication, professional behaviour, and attention to detail define every service we deliver.',
        color: 'bg-pink-100 text-pink-500',
      },
    ],
  },
  testimonials: {
    badge: 'Client Testimonials',
    titleLine1: 'Real People,',
    titleHighlight: 'Real Results',
    subtitle: 'Hundreds of satisfied clients across the UK trust Shalom Global Solution for their homes and businesses.',
    items: [
      {
        name: 'Margaret Thompson',
        role: 'Homeowner, London',
        quote: 'Shalom Global cleaned our 4-bedroom home before our move-in. The team was punctual, professional, and left everything spotless. I was genuinely impressed.',
        rating: 5,
        avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bddfb0d2-1769187553156.png',
        service: 'Cleaning Services',
      },
      {
        name: 'David Okafor',
        role: 'Landlord, Birmingham',
        quote: 'Their property and tenant support team helped me navigate all the compliance certificates — EPC, gas safety, EICR. Saved me hours of stress.',
        rating: 5,
        avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bea1928a-1769399135374.png',
        service: 'Property Support',
      },
      {
        name: 'Priya Sharma',
        role: 'Working Parent, Manchester',
        quote: 'I needed emergency childcare on short notice. The babysitter was caring, responsible, and my daughter absolutely loved her. Will definitely book again.',
        rating: 5,
        avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_128a088f6-1773131398847.png',
        service: 'Childcare',
      },
      {
        name: 'James Whitfield',
        role: 'Small Business Owner, Leeds',
        quote: 'The handyman team assembled our entire office, mounted TVs, and sorted some minor electrical issues. Fast, clean, and reasonably priced.',
        rating: 5,
        avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_11e26d191-1772128628563.png',
        service: 'Handyman Services',
      },
    ],
  },
  homeCTA: {
    badge: 'Ready to Get Started?',
    titleLine1: 'Let Us Handle the Hard Work,',
    titleHighlight: 'You Enjoy the Results',
    subtitle: 'Book any of our professional services today. Contact our team for a free, no-obligation quote tailored to your exact needs.',
    quoteBtnText: 'Request a Free Quote',
    callBtnText: 'Call Us Directly',
    phoneDisplay: '+44 (0) 7700 900000',
    guaranteeTitle: '100% Satisfaction Guarantee',
    guaranteeDesc: 'Not fully satisfied? We will make it right at no extra charge to you.',
  },
  about: {
    hero: {
      badge: 'About Us',
      titleLine1: 'Trusted Professionals',
      titleHighlight: 'Delivering Excellence',
      subtitle: 'Shalom Global Solution is a modern, reliable, and customer-focused service company dedicated to delivering high-quality solutions for homes, businesses, hotels, restaurants, care homes, and commercial properties across the UK.',
      servicesBtnText: 'Our Services',
      contactBtnText: 'Contact Us',
      stats: [
        { value: '2018', label: 'Founded', icon: 'CalendarIcon' },
        { value: '500+', label: 'Happy Clients', icon: 'UserGroupIcon' },
        { value: '6+', label: 'Service Areas', icon: 'RectangleStackIcon' },
        { value: '100%', label: 'Staff Verified', icon: 'ShieldCheckIcon' },
      ],
    },
    mission: {
      badge: 'Our Purpose & Vision',
      title: 'Driven by Quality, Guided by Values',
      subtitle: 'We exist to remove the friction of finding dependable service providers across the UK by creating a single, reliable point of contact.',
      missionTitle: 'Our Mission',
      missionDesc: 'To provide UK households, landlords, and businesses with seamless, trusted, and exceptionally high-standard services that simplify everyday living and property care.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the most reliable, respected, and comprehensive multi-service solution provider in the United Kingdom, recognised for integrity, safety, and customer delight.',
      pillars: [
        {
          title: 'Quality First',
          desc: 'We never cut corners. Every cleaning, move, repair, or childcare session is performed to the highest industry standards.',
          icon: 'CheckBadgeIcon',
        },
        {
          title: 'Complete Transparency',
          desc: 'Honest pricing with no hidden charges, clear communication before and after every job, and fully verified staff.',
          icon: 'ShieldCheckIcon',
        },
        {
          title: 'Customer Care',
          desc: 'We listen, adapt to your schedule, and treat your home or commercial space with the utmost respect and care.',
          icon: 'HeartIcon',
        },
      ],
    },
    credentials: {
      badge: 'Trust & Compliance',
      title: 'Verified, Insured, & Certified',
      subtitle: 'We hold our staff and services to the strictest UK regulatory standards so you have absolute peace of mind.',
      items: [
        {
          title: 'DBS Checked Staff',
          desc: 'Every team member undergoes rigorous enhanced background and criminal record checks prior to deployment.',
          badgeText: '100% Checked',
          icon: 'ShieldCheckIcon',
        },
        {
          title: 'Fully Insured Operations',
          desc: 'Comprehensive Public Liability insurance covering up to £5M to protect your property and assets.',
          badgeText: '£5M Cover',
          icon: 'DocumentCheckIcon',
        },
        {
          title: 'Health & Safety Trained',
          desc: 'Strict adherence to UK COSHH, HSE standards, and hygiene regulations across all domestic and commercial sites.',
          badgeText: 'COSHH Certified',
          icon: 'AcademicCapIcon',
        },
        {
          title: 'Rigorous Onboarding',
          desc: 'Hands-on practical training, customer service etiquette, and regular performance evaluations.',
          badgeText: 'Fully Trained',
          icon: 'UserGroupIcon',
        },
      ],
    },
    teamValues: {
      badge: 'Our Core Values',
      title: 'Principles That Define Everything We Do',
      subtitle: 'These values guide our daily operations, our hiring decisions, and how we treat every customer.',
      values: [
        {
          title: 'Excellence in Execution',
          desc: 'We take pride in flawless delivery, whether assembling furniture, deep cleaning a kitchen, or looking after children.',
          icon: 'SparklesIcon',
        },
        {
          title: 'Unwavering Integrity',
          desc: 'Honest advice, fair transparent pricing, and respecting your private spaces at all times.',
          icon: 'ShieldCheckIcon',
        },
        {
          title: 'Reliability & Punctuality',
          desc: 'We understand your time is valuable. We arrive promptly and deliver on our promises without excuses.',
          icon: 'ClockIcon',
        },
        {
          title: 'Community & Care',
          desc: 'We support local communities, treat workers fairly, and build lasting relationships with families and businesses.',
          icon: 'HeartIcon',
        },
      ],
    },
  },
  servicesPage: {
    hero: {
      badge: 'Comprehensive Solutions',
      titleLine1: 'Professional Services for',
      titleHighlight: 'Homes & Businesses',
      subtitle: 'Explore our full range of cleaning, relocation, property management, childcare, handyman, security, and meal services across the United Kingdom.',
      quoteBtnText: 'Get a Custom Quote',
      phoneBtnText: 'Speak to Our Team',
      phoneDisplay: '+44 (0) 7700 900000',
    },
    grid: {
      badge: 'All Services',
      title: 'Choose the Service That Fits Your Needs',
      subtitle: 'Tailored packages available for one-off tasks, recurring contracts, and emergency bookings.',
    },
  },
  serviceDetail: {
    cleaning: {
      title: 'Professional Cleaning Services',
      subtitle: 'Spotless cleaning solutions tailored for residential homes, offices, hotels, and care facilities across the UK.',
      overview: 'Our cleaning division delivers hospital-grade hygiene, deep sanitization, regular domestic housekeeping, and commercial facility maintenance using eco-friendly and high-grade equipment.',
      features: [
        'Regular Domestic & Housekeeping Cleaning',
        'End of Tenancy & Deep Sanitization',
        'Commercial & Office Daily Maintenance',
        'After-Builders & Post-Renovation Cleaning',
        'Carpet, Upholstery & Oven Deep Cleaning',
      ],
      benefits: [
        { title: 'Eco-Friendly Products', desc: 'Safe for children, pets, and the environment.' },
        { title: 'Vetted Cleaners', desc: 'All staff are DBS-checked and professionally trained.' },
        { title: 'Tailored Checklists', desc: 'Customizable cleaning checklists for every room.' },
      ],
      pricingNote: 'From £18/hour for regular domestic cleaning. Custom quotes for deep and commercial cleaning.',
    },
    moving: {
      title: 'Home Relocation & Removals',
      subtitle: 'Stress-free packing, furniture handling, and nationwide relocation support for homes and offices.',
      overview: 'Moving house or relocating your business can be overwhelming. Shalom Global provides complete moving logistics including packing, protective wrapping, heavy lifting, transport, and move-in cleaning.',
      features: [
        'Full & Partial Packing & Unpacking Services',
        'Furniture Disassembly & Reassembly',
        'Heavy Lifting & Fragile Item Protection',
        'Pre & Post-Move Deep Cleaning',
        'Short & Long-Term Storage Coordination',
      ],
      benefits: [
        { title: 'Goods in Transit Cover', desc: 'Your belongings are fully insured during transit.' },
        { title: 'Experienced Movers', desc: 'Trained in handling delicate and bulky furniture.' },
        { title: 'All-in-One Service', desc: 'Move, clean, and settle into your new home smoothly.' },
      ],
      pricingNote: 'Competitive fixed and hourly rates available based on property size and distance.',
    },
    property: {
      title: 'Property & Tenant Support',
      subtitle: 'Comprehensive compliance, tenancy agreements, and property inspection services for landlords.',
      overview: 'We support landlords and tenants in navigating UK property standards, safety certificates, dispute mediation, move-in/move-out inventories, and general property administration.',
      features: [
        'EPC, Gas Safety & EICR Certificate Coordination',
        'Detailed Inventory & Schedule of Condition Reports',
        'Tenancy Agreement Reviews & Key Holding',
        'Routine Inspection & Maintenance Reporting',
        'Fire & Smoke Alarm Compliance Checks',
      ],
      benefits: [
        { title: 'Legal Compliance', desc: 'Ensure your property meets all current UK housing standards.' },
        { title: 'Time Saving', desc: 'We handle the paperwork and coordination on your behalf.' },
        { title: 'Dispute Prevention', desc: 'Thorough photographic documentation protects your deposit and property.' },
      ],
      pricingNote: 'Bespoke landlord packages available starting from single certificates to complete management support.',
    },
    childcare: {
      title: 'Babysitting & Childcare',
      subtitle: 'Reliable, caring, and DBS-verified childcare professionals for daytime, evening, and emergency support.',
      overview: 'We provide loving, attentive, and fully vetted babysitters and childcare specialists to look after your children with the highest standards of safety, patience, and care.',
      features: [
        'Evening Babysitting & Date-Night Care',
        'After-School Pickups & Homework Supervision',
        'Weekend & Holiday Childcare',
        'Emergency Short-Notice Babysitting',
        'Hotel & Event Childcare Support',
      ],
      benefits: [
        { title: 'Enhanced DBS Checked', desc: 'Every sitter is thoroughly vetted for maximum safety.' },
        { title: 'First Aid Trained', desc: 'Certified in paediatric first aid and emergency response.' },
        { title: 'Engaging & Caring', desc: 'Focused on creating a fun, secure, and nurturing environment.' },
      ],
      pricingNote: 'Flexible hourly booking rates with no long-term commitments required.',
    },
    handyman: {
      title: 'Handyman & Property Maintenance',
      subtitle: 'Expert odd jobs, furniture assembly, TV mounting, plumbing, electrical, and home repairs.',
      overview: 'Our multi-skilled handymen tackle the jobs you do not have the time, tools, or expertise to handle. From flatpack furniture assembly to hanging mirrors and fixing leaking taps.',
      features: [
        'Flatpack Furniture Assembly (IKEA, Wayfair, etc.)',
        'TV Wall Mounting & Shelf Installation',
        'Minor Plumbing (Leaking taps, sealants, waste pipes)',
        'Minor Electrical (Light fixtures, switches, sockets)',
        'Interior Painting, Patching & Touch-ups',
      ],
      benefits: [
        { title: 'Fully Equipped', desc: 'We arrive with professional-grade tools and hardware.' },
        { title: 'Tidy & Clean', desc: 'We clean up thoroughly after finishing every repair job.' },
        { title: 'Transparent Pricing', desc: 'Clear hourly rates or fixed quotes with no hidden fees.' },
      ],
      pricingNote: 'Standard hourly rates from £35/hr. Multi-task half-day and full-day discounts available.',
    },
    security: {
      title: 'Home Security & Alarm Solutions',
      subtitle: 'Modern wireless alarm systems, smart CCTV, video doorbells, and property safety audits.',
      overview: 'Protect your loved ones and property with our security installation and consultation services. We install smart security hardware tailored to UK homes and small businesses.',
      features: [
        'Smart Wireless Alarm System Installation',
        'HD & 4K CCTV Camera Setup with Mobile Alerts',
        'Video Doorbell Installation & Smart Locks',
        'Property Security & Vulnerability Audits',
        'Commercial Access Control & Sensors',
      ],
      benefits: [
        { title: 'Smartphone Controlled', desc: 'Monitor your home from anywhere in the world.' },
        { title: 'No Subscription Lock-in', desc: 'Modern hardware with direct owner control.' },
        { title: 'Professional Setup', desc: 'Neat cabling, perfect camera angles, and app setup included.' },
      ],
      pricingNote: 'Free security consultation. Hardware packages and installation quotes available on request.',
    },
    meals: {
      title: 'Home-Cooked Meal Services',
      subtitle: 'Nutritious, authentic, and delicious freshly prepared meals delivered to your doorstep.',
      overview: 'Enjoy healthy, comforting home-cooked meals prepared with fresh ingredients and authentic flavours. Perfect for busy professionals, elderly parents, students, and family gatherings.',
      features: [
        'Weekly & Monthly Home Meal Plans',
        'Vegetarian, Non-Veg & Special Dietary Options',
        'Authentic Regional & Continental Dishes',
        'Fresh Ingredients with No Artificial Additives',
        'Event & Small Gathering Catering',
      ],
      benefits: [
        { title: 'Hygiene Certified', desc: 'Prepared in certified hygienic kitchen environments.' },
        { title: 'Tailored Menus', desc: 'Customised spice levels, portion sizes, and dietary preferences.' },
        { title: 'Time Saving', desc: 'No grocery shopping or cooking required — just heat and enjoy.' },
      ],
      pricingNote: 'Affordable individual meal plans and family subscription packages available.',
    },
  },
  contact: {
    hero: {
      badge: 'Get in Touch',
      titleLine1: 'We Are Ready to Help',
      titleHighlight: 'Get Your Free Quote',
      subtitle: 'Have a question or need a quote? Reach out to our friendly UK support team. We respond within 2 hours during business hours.',
    },
    main: {
      officeTitle: 'Office Address',
      officeAddress: '128 City Road, London',
      officeCity: 'United Kingdom, EC1V 2NX',
      phoneTitle: 'Telephone Support',
      phoneNumber: '+44 (0) 7700 900000',
      emailTitle: 'Email Inquiries',
      emailAddress: 'info@shalomglobalsolution.co.uk',
      hoursTitle: 'Operating Hours',
      hoursWeekdays: 'Monday – Friday: 8:00 AM – 7:00 PM',
      hoursWeekends: 'Saturday: 9:00 AM – 5:00 PM (Emergency 24/7)',
      emergencyNote: 'Emergency support available 24/7 for existing contract clients.',
    },
    form: {
      title: 'Send Us a Message',
      subtitle: 'Fill out the form below and our team will get back to you with a free consultation and quote.',
      submitBtnText: 'Send Message & Get Quote',
      successMessage: 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Common Questions & Clear Answers',
      subtitle: 'Everything you need to know about our booking process, staff vetting, and services.',
      items: [
        {
          question: 'Are all Shalom Global staff DBS checked and verified?',
          answer: 'Yes, 100% of our staff undergo rigorous enhanced DBS checks, identity verification, and right-to-work compliance checks in accordance with UK employment laws.',
        },
        {
          question: 'How quickly can I book a service?',
          answer: 'We can accommodate same-day emergency requests depending on availability, or schedule bookings anywhere from 24 hours to 3 months in advance.',
        },
        {
          question: 'What areas in the UK do you cover?',
          answer: 'We operate across London, Greater London, Birmingham, Manchester, Leeds, and surrounding UK regions. Contact us to confirm availability in your specific postcode.',
        },
        {
          question: 'Are your services insured?',
          answer: 'Yes, Shalom Global is covered by comprehensive Public Liability Insurance up to £5,000,000 to ensure your home, property, and assets are protected at all times.',
        },
        {
          question: 'Can I customize or bundle multiple services together?',
          answer: 'Absolutely! We specialize in bundled packages — for instance, combining moving with deep cleaning and handyman assembly for a seamless relocation experience at discounted rates.',
        },
      ],
    },
  },
  blog: {
    hero: {
      badge: 'Helpful Guides & Articles',
      titleLine1: 'Insights, Tips & Guides for',
      titleHighlight: 'Modern Living',
      subtitle: 'Expert advice on home maintenance, property compliance, cleaning tips, moving checklists, and family care from our UK team.',
      searchPlaceholder: 'Search articles, tips, and guides...',
    },
    articles: [
      {
        id: 'end-of-tenancy-cleaning-checklist',
        title: 'The Ultimate End of Tenancy Cleaning Checklist for UK Tenants',
        excerpt: 'How to ensure you get 100% of your deposit back with our room-by-room professional cleaning guide and landlord inspection tips.',
        category: 'Cleaning',
        date: 'February 24, 2026',
        readTime: '6 min read',
        author: 'Shalom Cleaning Team',
      },
      {
        id: 'uk-landlord-safety-compliance-2026',
        title: 'UK Landlord Compliance: Essential Gas, Electric & Fire Regulations',
        excerpt: 'Everything landlords need to know about EPC requirements, EICR certification, and mandatory smoke alarm testing.',
        category: 'Property',
        date: 'February 18, 2026',
        readTime: '8 min read',
        author: 'Property Support Team',
      },
      {
        id: 'stress-free-home-moving-guide',
        title: '10 Secrets to a Completely Stress-Free House Move in the UK',
        excerpt: 'From strategic box labelling to packing order and move-in day essentials — our removals team shares top advice.',
        category: 'Relocation',
        date: 'January 30, 2026',
        readTime: '5 min read',
        author: 'Relocation Specialists',
      },
      {
        id: 'finding-reliable-childcare-uk',
        title: 'What to Look for When Hiring a Babysitter or Nanny in the UK',
        excerpt: 'The critical questions to ask, background checks to verify, and safety certifications required for peace of mind.',
        category: 'Childcare',
        date: 'January 12, 2026',
        readTime: '7 min read',
        author: 'Childcare Coordinators',
      },
    ],
  },
  footer: {
    brandName: 'ShalomGlobal',
    brandDescription: 'Solutions for Every Need — professional services for homes, businesses, and properties across the UK.',
    locationText: 'United Kingdom',
    phoneNumber: '+44 (0) 7700 900000',
    emailAddress: 'info@shalomglobalsolution.co.uk',
    bookServiceBtnText: 'Book a Service',
    copyrightText: '© 2026 Shalom Global Solution Ltd. All rights reserved.',
  },
  emailSettings: {
    notificationsEnabled: true,
    recipients: ['rahulbadugu22@gmail.com'],
    senderName: 'ShalomGlobal Notifications',
    subjectPrefix: '🔔 New ShalomGlobal Lead',
  },
};
