'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsContext';
import { ServiceCardItem, ServiceDetailItem } from '@/lib/cmsData';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import DashboardShell from '@/app/dashboard/components/DashboardShell';

const AVAILABLE_ICONS = [
  'SparklesIcon',
  'TruckIcon',
  'HomeModernIcon',
  'HeartIcon',
  'WrenchScrewdriverIcon',
  'ShieldCheckIcon',
  'CakeIcon',
  'SunIcon',
  'BuildingOfficeIcon',
  'PaintBrushIcon',
  'BoltIcon',
  'KeyIcon',
  'MapPinIcon',
  'CheckBadgeIcon',
  'ClockIcon',
  'StarIcon',
];

const PRESET_IMAGES = [
  { label: 'Cleaning & Modern Kitchen', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fdc7d837-1772152005578.png' },
  { label: 'Relocation & Moving Boxes', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1384b98d6-1773100531867.png' },
  { label: 'Property & UK Residence', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11e492967-1773593378128.png' },
  { label: 'Childcare & Safe Home', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a9de5f79-1767907222508.png' },
  { label: 'Handyman & Maintenance', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b0f8fe19-1780332392705.png' },
  { label: 'Security & Safety Systems', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1554bed0c-1773473576842.png' },
  { label: 'Fresh Meal Prep & Food', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_18a2753c3-1774731453054.png' },
  { label: 'Professional Office Team', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_123a93599-1777082822089.png' },
];

const CATEGORIES = ['Home', 'Property', 'Care', 'Maintenance', 'Commercial', 'Food', 'Outdoor', 'Specialist'];

const THEME_COLORS = [
  { name: 'Emerald', bg: 'bg-emerald-100', text: 'text-emerald-700', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Navy', bg: 'bg-blue-100', text: 'text-blue-700', chip: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Amber', bg: 'bg-amber-100', text: 'text-amber-700', chip: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Terracotta', bg: 'bg-orange-100', text: 'text-orange-700', chip: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'Purple', bg: 'bg-purple-100', text: 'text-purple-700', chip: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Rose', bg: 'bg-pink-100', text: 'text-pink-700', chip: 'bg-pink-50 text-pink-700 border-pink-200' },
  { name: 'Teal', bg: 'bg-teal-100', text: 'text-teal-700', chip: 'bg-teal-50 text-teal-700 border-teal-200' },
];

export default function ServicesManagerPage() {
  const { content, addService, updateService, deleteService, isSyncing } = useCMS();
  const services = content?.servicesBento?.services || [];
  const serviceDetailMap = content?.serviceDetail || {};

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'card' | 'page' | 'benefits' | 'faqs'>('card');
  const [saveToast, setSaveToast] = useState(false);

  // Modal Form State
  const [formCard, setFormCard] = useState<ServiceCardItem>({
    id: '',
    title: '',
    description: '',
    tags: ['Residential', 'Commercial', 'Fully Insured'],
    ctaText: 'View Service Details',
    category: 'Home',
    icon: 'SparklesIcon',
    image: PRESET_IMAGES[0].url,
  });

  const [formDetail, setFormDetail] = useState<ServiceDetailItem>({
    title: '',
    subtitle: '',
    overview: '',
    features: [
      'Professional and qualified specialists',
      'Flexible scheduling tailored to your routine',
      'Transparent quotes with no hidden charges',
      'Full compliance with UK industry standards',
    ],
    benefits: [
      { title: 'Peace of Mind', desc: 'DBS-verified and insured staff on every visit.' },
      { title: 'Quality Guaranteed', desc: 'High standards inspected and assured.' },
      { title: 'Reliable Support', desc: 'Dedicated UK customer coordination.' },
    ],
    pricingNote: 'Custom competitive quotes based on project specifications.',
    faqs: [
      { q: 'How quickly can I book this service?', a: 'We can accommodate bookings within 24 to 48 hours, with emergency options available.' },
      { q: 'Are your professionals DBS checked and insured?', a: 'Yes, 100% of our team members are fully vetted, DBS checked, and covered under UK public liability insurance.' },
    ],
  });

  const [tagInput, setTagInput] = useState('Residential, Commercial, Fully Insured');
  const [featureInput, setFeatureInput] = useState(
    'Professional and qualified specialists\nFlexible scheduling tailored to your routine\nTransparent quotes with no hidden charges\nFull compliance with UK industry standards'
  );

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [services, searchQuery, selectedCategory]);

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormCard({
      id: '',
      title: '',
      description: '',
      tags: ['Residential', 'Commercial', 'Fully Insured'],
      ctaText: 'View Service Details',
      category: 'Home',
      icon: 'SparklesIcon',
      image: PRESET_IMAGES[0].url,
    });
    setFormDetail({
      title: '',
      subtitle: '',
      overview: '',
      features: [
        'Professional and qualified specialists',
        'Flexible scheduling tailored to your routine',
        'Transparent quotes with no hidden charges',
        'Full compliance with UK industry standards',
      ],
      benefits: [
        { title: 'Peace of Mind', desc: 'DBS-verified and insured staff on every visit.' },
        { title: 'Quality Guaranteed', desc: 'High standards inspected and assured.' },
        { title: 'Reliable Support', desc: 'Dedicated UK customer coordination.' },
      ],
      pricingNote: 'Custom competitive quotes based on project specifications.',
      faqs: [
        { q: 'How quickly can I book this service?', a: 'We can accommodate bookings within 24 to 48 hours, with emergency options available.' },
        { q: 'Are your professionals DBS checked and insured?', a: 'Yes, 100% of our team members are fully vetted, DBS checked, and covered under UK public liability insurance.' },
      ],
    });
    setTagInput('Residential, Commercial, Fully Insured');
    setFeatureInput(
      'Professional and qualified specialists\nFlexible scheduling tailored to your routine\nTransparent quotes with no hidden charges\nFull compliance with UK industry standards'
    );
    setActiveTab('card');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceCardItem) => {
    setEditingId(service.id);
    const existingDetail = serviceDetailMap[service.id] || {
      title: service.title,
      subtitle: `Reliable & trusted ${service.title.toLowerCase()} across the UK.`,
      overview: service.description,
      features: ['Vetted staff', 'Flexible scheduling', 'Satisfaction guaranteed'],
      benefits: [
        { title: 'Safe & Reliable', desc: 'Professional team with verified background checks.' },
        { title: 'Transparent Rates', desc: 'Clear pricing with zero surprises.' },
      ],
      pricingNote: 'Tailored quotes to match your needs.',
      faqs: [
        { q: 'How do I book?', a: 'Contact our team online or by phone for an immediate free quote.' },
      ],
    };

    setFormCard({
      id: service.id,
      title: service.title,
      description: service.description,
      tags: service.tags || [],
      ctaText: service.ctaText || 'View Service Details',
      category: service.category || 'Home',
      icon: service.icon || 'SparklesIcon',
      image: service.image || PRESET_IMAGES[0].url,
    });

    setFormDetail(existingDetail);
    setTagInput((service.tags || []).join(', '));
    setFeatureInput((existingDetail.features || []).join('\n'));
    setActiveTab('card');
    setIsModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCard.title.trim()) {
      alert('Please provide a title for the service.');
      return;
    }

    const rawSlug = formCard.id.trim() || formCard.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const serviceSlug = rawSlug || `service-${Date.now()}`;

    const parsedTags = tagInput.split(',').map((t) => t.trim()).filter(Boolean);
    const parsedFeatures = featureInput.split('\n').map((f) => f.trim()).filter(Boolean);

    const cardPayload: ServiceCardItem = {
      ...formCard,
      id: serviceSlug,
      tags: parsedTags,
    };

    const detailPayload: ServiceDetailItem = {
      ...formDetail,
      title: formDetail.title || formCard.title,
      subtitle: formDetail.subtitle || `Professional ${formCard.title} services tailored to your exact needs across the UK.`,
      overview: formDetail.overview || formCard.description,
      features: parsedFeatures,
      image: formCard.image,
      icon: formCard.icon,
      category: formCard.category,
    };

    if (editingId) {
      await updateService(editingId, cardPayload, detailPayload);
    } else {
      await addService(cardPayload, detailPayload);
    }

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
    setIsModalOpen(false);
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This will remove its card from the homepage carousel and deactivate its page.`)) {
      await deleteService(id);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in-up">
          <Icon name="CheckCircleIcon" size={20} />
          <span className="text-sm font-700">Service successfully saved and published live!</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary/15 text-secondary text-xs font-800 rounded-full mb-2">
            <Icon name="BriefcaseIcon" size={14} />
            Services &amp; Respective Pages Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-800 text-primary tracking-tight">
            Add &amp; Manage Services
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-500 max-w-2xl mt-1">
            Add new service offerings, customize their homepage side-scroll cards, and immediately generate their dedicated service detail pages with zero coding required.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-navy-light text-white px-6 py-3.5 rounded-2xl text-sm font-700 shadow-md hover:shadow-lg transition-all duration-200 shrink-0"
        >
          <Icon name="PlusIcon" size={18} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider mb-1">Total Services</p>
          <p className="text-2xl font-800 text-primary">{services.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider mb-1">Live Pages</p>
          <p className="text-2xl font-800 text-secondary">{Object.keys(serviceDetailMap).length || services.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider mb-1">Homepage Cards</p>
          <p className="text-2xl font-800 text-primary">Equal-Size Scroll</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider mb-1">Cloud Sync</p>
          <p className="text-sm font-800 text-emerald-600 flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </p>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Icon name="MagnifyingGlassIcon" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services by title or keyword..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-700 whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-primary text-white'
                : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-primary'
            }`}
          >
            All Categories ({services.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = services.filter((s) => s.category === cat).length;
            if (count === 0 && selectedCategory !== cat) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-700 whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, idx) => {
          const detail = serviceDetailMap[service.id];
          const hasCustomPage = !!detail;
          const featuresCount = detail?.features?.length || 0;

          return (
            <div
              key={service.id || idx}
              className="bg-white rounded-3xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image & Icon Header */}
                <div className="relative h-44 w-full bg-primary/5 overflow-hidden">
                  {service.image ? (
                    <AppImage
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cream to-cream-dark" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-700 bg-white/90 backdrop-blur-md text-primary shadow-sm border border-white/40">
                      {service.category || 'General'}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm">
                      <Icon name={(service.icon as any) || 'SparklesIcon'} size={18} />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <span className="text-[11px] font-mono font-700 bg-black/50 text-white/90 px-2 py-0.5 rounded-md border border-white/20">
                      /{service.id}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="text-lg font-800 text-primary mb-2 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-500 leading-relaxed line-clamp-2 mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-600 bg-cream-dark/60 text-primary/80 px-2.5 py-0.5 rounded-md border border-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-600 pt-3 border-t border-border/60">
                    <span className="flex items-center gap-1">
                      <Icon name="DocumentCheckIcon" size={14} className="text-secondary" />
                      {featuresCount} Checklist items
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <Icon name="CheckCircleIcon" size={14} />
                      Page Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-cream-dark/20 border-t border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/service-detail?service=${service.id}`}
                    target="_blank"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-white rounded-xl transition-colors text-xs font-700 flex items-center gap-1"
                    title="Preview Live Respective Page"
                  >
                    <Icon name="ArrowTopRightOnSquareIcon" size={16} />
                    <span className="hidden sm:inline">View Page</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(service)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-primary hover:text-white border border-border text-xs font-700 text-primary transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Icon name="PencilSquareIcon" size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteService(service.id, service.title)}
                    className="p-1.5 rounded-xl hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-colors"
                    title="Delete service"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Slide-over for Add / Edit Service */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-in my-8">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-cream-dark/20">
              <div>
                <span className="text-[10px] uppercase font-800 tracking-wider text-secondary">
                  {editingId ? 'Update Service' : 'Create New Service & Dedicated Page'}
                </span>
                <h2 className="text-xl font-800 text-primary">
                  {editingId ? `Editing: ${formCard.title}` : 'Add New Service'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-xl hover:bg-muted text-muted-foreground hover:text-primary flex items-center justify-center transition-colors"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-border px-6 bg-white gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'card', label: '1. Homepage Card & Visuals', icon: 'SquaresPlusIcon' },
                { id: 'page', label: '2. Dedicated Page Overview', icon: 'DocumentTextIcon' },
                { id: 'benefits', label: '3. Checklist & Benefits', icon: 'CheckBadgeIcon' },
                { id: 'faqs', label: '4. Pricing & FAQs', icon: 'QuestionMarkCircleIcon' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 px-4 text-xs font-700 flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-secondary text-secondary font-800'
                      : 'border-transparent text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon name={tab.icon as any} size={15} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveService} className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'card' && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-700 text-primary mb-1.5">
                        Service Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formCard.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormCard((prev) => ({
                            ...prev,
                            title: val,
                            id: editingId ? prev.id : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                          }));
                          setFormDetail((prev) => ({ ...prev, title: val }));
                        }}
                        placeholder="e.g., Commercial Cleaning & Sanitisation"
                        className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-primary mb-1.5">
                        URL Slug / Identifier *
                      </label>
                      <input
                        type="text"
                        required
                        value={formCard.id}
                        onChange={(e) => setFormCard((prev) => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                        placeholder="e.g., commercial-cleaning"
                        className="w-full px-4 py-2.5 text-sm font-mono bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                      />
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Accessible at: <code className="text-secondary font-bold">/service-detail?service={formCard.id || 'slug'}</code> and <code className="text-secondary font-bold">/services/{formCard.id || 'slug'}</code>
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-700 text-primary mb-1.5">
                        Category
                      </label>
                      <select
                        value={formCard.category}
                        onChange={(e) => setFormCard((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-primary mb-1.5">
                        Card Button CTA Text
                      </label>
                      <input
                        type="text"
                        value={formCard.ctaText}
                        onChange={(e) => setFormCard((prev) => ({ ...prev, ctaText: e.target.value }))}
                        placeholder="e.g., View Service Details"
                        className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Icon Selector */}
                  <div>
                    <label className="block text-xs font-700 text-primary mb-2">
                      Choose Service Icon
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {AVAILABLE_ICONS.map((iconName) => (
                        <button
                          type="button"
                          key={iconName}
                          onClick={() => setFormCard((prev) => ({ ...prev, icon: iconName }))}
                          className={`p-3 rounded-2xl border flex items-center justify-center transition-all ${
                            formCard.icon === iconName
                              ? 'bg-secondary text-white border-secondary shadow-sm scale-105'
                              : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted hover:text-primary'
                          }`}
                        >
                          <Icon name={iconName as any} size={20} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Selector */}
                  <div>
                    <label className="block text-xs font-700 text-primary mb-2">
                      Select Preset Cover Image or Enter URL
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {PRESET_IMAGES.map((img, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setFormCard((prev) => ({ ...prev, image: img.url }))}
                          className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                            formCard.image === img.url ? 'border-secondary ring-2 ring-secondary/30 scale-102' : 'border-border/60 hover:border-border'
                          }`}
                        >
                          <AppImage src={img.url} alt={img.label} fill sizes="160px" className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                            <span className="text-[10px] text-white font-700 truncate">{img.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <input
                      type="url"
                      value={formCard.image}
                      onChange={(e) => setFormCard((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="Or enter custom image URL: https://..."
                      className="w-full px-4 py-2 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs font-700 text-primary mb-1.5">
                      Short Description (for Homepage Side-Scroll Card) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formCard.description}
                      onChange={(e) => setFormCard((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief overview summarizing this service in 2-3 sentences..."
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-700 text-primary mb-1.5">
                      Card Feature Highlights (comma separated)
                    </label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Residential, Commercial, Guaranteed"
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'page' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-700 text-primary mb-1.5">
                      Page Hero Title
                    </label>
                    <input
                      type="text"
                      value={formDetail.title}
                      onChange={(e) => setFormDetail((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder={formCard.title || 'e.g., Commercial Cleaning Services'}
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-700 text-primary mb-1.5">
                      Page Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={formDetail.subtitle}
                      onChange={(e) => setFormDetail((prev) => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="e.g., High-Standard Sanitisation & Facility Support for UK Businesses"
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-700 text-primary mb-1.5">
                      Detailed Page Overview Paragraph
                    </label>
                    <textarea
                      rows={5}
                      value={formDetail.overview}
                      onChange={(e) => setFormDetail((prev) => ({ ...prev, overview: e.target.value }))}
                      placeholder="Full comprehensive explanation of this service, scope of work, and value delivered to clients..."
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-700 text-primary mb-1.5">
                      What&apos;s Included / Features Checklist (one item per line)
                    </label>
                    <textarea
                      rows={5}
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Domestic & commercial deep cleaning\nEco-friendly sanitisation products\nInsured and DBS checked staff"
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-700 text-primary">
                      Key Client Benefits (3 Core Value Props)
                    </label>
                    {formDetail.benefits?.map((b, idx) => (
                      <div key={idx} className="p-3 bg-cream-dark/20 rounded-2xl border border-border space-y-2">
                        <input
                          type="text"
                          value={b.title}
                          onChange={(e) => {
                            const list = [...(formDetail.benefits || [])];
                            list[idx].title = e.target.value;
                            setFormDetail((prev) => ({ ...prev, benefits: list }));
                          }}
                          placeholder={`Benefit #${idx + 1} Title`}
                          className="w-full px-3 py-1.5 text-xs font-700 bg-white border border-border rounded-xl"
                        />
                        <input
                          type="text"
                          value={b.desc}
                          onChange={(e) => {
                            const list = [...(formDetail.benefits || [])];
                            list[idx].desc = e.target.value;
                            setFormDetail((prev) => ({ ...prev, benefits: list }));
                          }}
                          placeholder={`Benefit #${idx + 1} Description`}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-border rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-700 text-primary mb-1.5">
                      Pricing Guidance Note
                    </label>
                    <input
                      type="text"
                      value={formDetail.pricingNote}
                      onChange={(e) => setFormDetail((prev) => ({ ...prev, pricingNote: e.target.value }))}
                      placeholder="e.g., From £25/hour or bespoke package pricing upon request."
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:border-secondary focus:bg-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-700 text-primary">
                      Frequently Asked Questions
                    </label>
                    {formDetail.faqs?.map((faq, idx) => (
                      <div key={idx} className="p-3 bg-cream-dark/20 rounded-2xl border border-border space-y-2">
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const list = [...(formDetail.faqs || [])];
                            list[idx].q = e.target.value;
                            setFormDetail((prev) => ({ ...prev, faqs: list }));
                          }}
                          placeholder={`Question ${idx + 1}`}
                          className="w-full px-3 py-1.5 text-xs font-700 bg-white border border-border rounded-xl"
                        />
                        <textarea
                          rows={2}
                          value={faq.a}
                          onChange={(e) => {
                            const list = [...(formDetail.faqs || [])];
                            list[idx].a = e.target.value;
                            setFormDetail((prev) => ({ ...prev, faqs: list }));
                          }}
                          placeholder={`Answer ${idx + 1}`}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-border rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-5 border-t border-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-xs font-700 text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-navy-light text-white text-xs font-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSyncing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving to Database...
                      </>
                    ) : (
                      <>
                        <Icon name="CheckIcon" size={16} />
                        {editingId ? 'Save Changes' : 'Publish Service & Page'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </DashboardShell>
  );
}
