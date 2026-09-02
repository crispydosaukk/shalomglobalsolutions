'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCMS } from '@/lib/cmsContext';
import { CMSContent } from '@/lib/cmsData';
import Icon from '@/components/ui/AppIcon';

type SectionKey = keyof CMSContent;

const SECTION_OPTIONS: { key: SectionKey; label: string; icon: string; desc: string }[] = [
  { key: 'header', label: 'Header & Navigation', icon: 'Bars3Icon', desc: 'Logo, navigation links, and quote button' },
  { key: 'hero', label: 'Hero Section', icon: 'SparklesIcon', desc: 'Main title, subtitle, badges, stats, and buttons' },
  { key: 'servicesBento', label: 'Services Bento Grid', icon: 'SquaresPlusIcon', desc: 'All 7 service cards, tags, titles, and descriptions' },
  { key: 'whyChooseUs', label: 'Why Choose Us', icon: 'ShieldCheckIcon', desc: 'Stats, 6 core trust reasons, and ISO compliance' },
  { key: 'testimonials', label: 'Client Testimonials', icon: 'ChatBubbleLeftRightIcon', desc: 'Customer reviews, ratings, quotes, and names' },
  { key: 'homeCTA', label: 'Home CTA & Guarantees', icon: 'MegaphoneIcon', desc: 'Bottom call to action, telephone, and satisfaction note' },
  { key: 'about', label: 'About Us Page', icon: 'BuildingOfficeIcon', desc: 'About Hero, Mission, Vision, Credentials, and Core Values' },
  { key: 'servicesPage', label: 'Services Page Hero', icon: 'RectangleStackIcon', desc: 'Main services page header and grid headings' },
  { key: 'serviceDetail', label: 'Detailed Service Pages', icon: 'DocumentTextIcon', desc: 'Cleaning, Moving, Property, Childcare, Handyman, Security, Meals' },
  { key: 'contact', label: 'Contact Page & FAQs', icon: 'EnvelopeIcon', desc: 'Office addresses, telephone, hours, and 5 FAQs' },
  { key: 'blog', label: 'Blog & Articles', icon: 'NewspaperIcon', desc: 'Blog title, guides, excerpts, categories, and authors' },
  { key: 'footer', label: 'Footer & Legal', icon: 'FolderIcon', desc: 'Brand description, telephone, address, copyright' },
  { key: 'emailSettings', label: 'Email Notification Settings', icon: 'EnvelopeOpenIcon', desc: 'Activate/deactivate alerts, recipient emails, and sender template' },
];

export default function ContentEditorPageWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-primary">Loading Content Module...</div>}>
      <ContentEditorPage />
    </Suspense>
  );
}

function ContentEditorPage() {
  const searchParams = useSearchParams();
  const initialSection = (searchParams.get('section') as SectionKey) || 'hero';
  
  const { content, updateSection, resetSection, resetAll, isSyncing, lastSavedAt } = useCMS();
  const [activeSection, setActiveSection] = useState<SectionKey>(
    SECTION_OPTIONS.some((s) => s.key === initialSection) ? initialSection : 'hero'
  );
  const [localFormData, setLocalFormData] = useState<any>(content[activeSection]);
  const [searchFilter, setSearchFilter] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Sync active section local state when content or active section changes
  useEffect(() => {
    setLocalFormData(JSON.parse(JSON.stringify(content[activeSection])));
  }, [activeSection, content]);

  const handleFieldChange = (path: string, value: any) => {
    setLocalFormData((prev: any) => {
      const clone = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return clone;
    });
  };

  const handleSave = async () => {
    const success = await updateSection(activeSection, localFormData);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleResetSection = async () => {
    if (window.confirm(`Reset "${SECTION_OPTIONS.find(s => s.key === activeSection)?.label}" to original default text?`)) {
      await resetSection(activeSection);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  const filteredSections = SECTION_OPTIONS.filter((s) =>
    s.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner with Save Status */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/15 text-secondary text-xs font-700 rounded-full mb-1">
            <Icon name="PencilSquareIcon" size={14} />
            Live Section-by-Section Editor
          </div>
          <h1 className="text-2xl font-800 text-primary tracking-tight">
            Complete Website Content Editing Module
          </h1>
          <p className="text-xs text-muted-foreground font-500">
            Edit every single word, title, paragraph, and card in real time. Changes publish to the database instantly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetSection}
            className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-700 text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            title="Reset current section"
          >
            <Icon name="ArrowPathIcon" size={14} />
            Reset Section
          </button>
          <button
            onClick={handleSave}
            disabled={isSyncing}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-navy-light text-white text-xs font-700 shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSyncing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving to Cloud...</span>
              </>
            ) : (
              <>
                <Icon name="CloudArrowUpIcon" size={16} />
                <span>Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-700 flex items-center gap-2 animate-fadeIn">
          <Icon name="CheckCircleIcon" size={18} className="text-emerald-600" />
          <span>Section successfully saved and published! Live site is updated.</span>
        </div>
      )}
      {resetSuccess && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-700 flex items-center gap-2 animate-fadeIn">
          <Icon name="ArrowPathIcon" size={18} className="text-amber-600" />
          <span>Section has been reset to default values.</span>
        </div>
      )}

      {/* Two Column Workspace: Section Navigation & Section Forms */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Section Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-border shadow-card space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sections..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-cream-dark/40 border border-border rounded-xl text-xs font-600 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Icon name="MagnifyingGlassIcon" size={14} />
              </div>
            </div>

            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
              {filteredSections.map((sec) => {
                const isActive = activeSection === sec.key;
                return (
                  <button
                    key={sec.key}
                    onClick={() => setActiveSection(sec.key)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'hover:bg-cream-dark/60 text-primary'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isActive ? 'bg-white/10 text-white' : 'bg-primary/5 text-primary'}`}>
                      <Icon name={sec.icon as any} size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-700 truncate ${isActive ? 'text-white' : 'text-primary'}`}>
                        {sec.label}
                      </p>
                      <p className={`text-[11px] truncate ${isActive ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {sec.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Field Editors for the Active Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-lg font-800 text-primary">
                  {SECTION_OPTIONS.find((s) => s.key === activeSection)?.label}
                </h2>
                <p className="text-xs text-muted-foreground font-500">
                  {SECTION_OPTIONS.find((s) => s.key === activeSection)?.desc}
                </p>
              </div>
              <span className="text-[11px] font-700 bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                Active Editor
              </span>
            </div>

            {/* Dynamic Rendering Based on Section */}
            {localFormData && (
              <div className="space-y-6">
                {renderSectionFields(activeSection, localFormData, handleFieldChange)}
              </div>
            )}

            {/* Bottom Save bar */}
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Tip: Click <strong>Publish Changes</strong> to push updates live instantly.
              </span>
              <button
                onClick={handleSave}
                disabled={isSyncing}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-navy-light text-white text-xs font-700 shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Icon name="CheckIcon" size={16} />
                Publish Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-700 text-primary uppercase tracking-wider">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-700 text-primary uppercase tracking-wider">{label}</label>
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-xs font-500 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all leading-relaxed"
      />
    </div>
  );
}

function renderSectionFields(section: SectionKey, data: any, onChange: (path: string, val: any) => void) {
  switch (section) {
    case 'header':
      return (
        <div className="space-y-4">
          <InputField label="Brand Logo Text" value={data.logoText} onChange={(v) => onChange('logoText', v)} />
          <InputField label="Quote Button CTA Text" value={data.quoteButtonText} onChange={(v) => onChange('quoteButtonText', v)} />
          <div className="pt-4 border-t border-border">
            <h3 className="text-xs font-700 text-primary uppercase mb-3">Navigation Menu Links</h3>
            <div className="space-y-3">
              {data.navLinks?.map((link: any, idx: number) => (
                <div key={idx} className="grid grid-cols-2 gap-3 p-3 bg-cream-dark/20 rounded-xl border border-border">
                  <InputField label={`Link ${idx + 1} Label`} value={link.label} onChange={(v) => {
                    const links = [...data.navLinks];
                    links[idx].label = v;
                    onChange('navLinks', links);
                  }} />
                  <InputField label={`Link ${idx + 1} URL Path`} value={link.href} onChange={(v) => {
                    const links = [...data.navLinks];
                    links[idx].href = v;
                    onChange('navLinks', links);
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'hero':
      return (
        <div className="space-y-4">
          <InputField label="Top Badge Text" value={data.badge} onChange={(v) => onChange('badge', v)} />
          <div className="grid sm:grid-cols-3 gap-3">
            <InputField label="Headline Start" value={data.headlinePart1} onChange={(v) => onChange('headlinePart1', v)} />
            <InputField label="Headline Highlight (Green)" value={data.headlineHighlight} onChange={(v) => onChange('headlineHighlight', v)} />
            <InputField label="Headline End" value={data.headlinePart2} onChange={(v) => onChange('headlinePart2', v)} />
          </div>
          <TextAreaField label="Subheadline / Intro Paragraph" value={data.subheadline} onChange={(v) => onChange('subheadline', v)} rows={3} />
          
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label="Primary Button Text" value={data.exploreBtnText} onChange={(v) => onChange('exploreBtnText', v)} />
            <InputField label="Secondary Button Text" value={data.quoteBtnText} onChange={(v) => onChange('quoteBtnText', v)} />
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-xs font-700 text-primary uppercase mb-3">Hero Key Stats</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {data.stats?.map((stat: any, idx: number) => (
                <div key={idx} className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                  <InputField label="Value" value={stat.value} onChange={(v) => {
                    const stats = [...data.stats];
                    stats[idx].value = v;
                    onChange('stats', stats);
                  }} />
                  <InputField label="Label" value={stat.label} onChange={(v) => {
                    const stats = [...data.stats];
                    stats[idx].label = v;
                    onChange('stats', stats);
                  }} />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-xs font-700 text-primary uppercase mb-3">Floating Visual Badges</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                <InputField label="Badge 1 Title" value={data.floatingBadge1Title} onChange={(v) => onChange('floatingBadge1Title', v)} />
                <InputField label="Badge 1 Subtitle" value={data.floatingBadge1Sub} onChange={(v) => onChange('floatingBadge1Sub', v)} />
              </div>
              <div className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                <InputField label="Badge 2 Title" value={data.floatingBadge2Title} onChange={(v) => onChange('floatingBadge2Title', v)} />
                <InputField label="Badge 2 Subtitle" value={data.floatingBadge2Sub} onChange={(v) => onChange('floatingBadge2Sub', v)} />
              </div>
              <div className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                <InputField label="Badge 3 Title" value={data.floatingBadge3Title} onChange={(v) => onChange('floatingBadge3Title', v)} />
                <InputField label="Badge 3 Subtitle" value={data.floatingBadge3Sub} onChange={(v) => onChange('floatingBadge3Sub', v)} />
              </div>
            </div>
          </div>
        </div>
      );

    case 'servicesBento':
      return (
        <div className="space-y-4">
          <InputField label="Section Badge" value={data.badge} onChange={(v) => onChange('badge', v)} />
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label="Heading Line 1" value={data.titleLine1} onChange={(v) => onChange('titleLine1', v)} />
            <InputField label="Heading Highlight" value={data.titleHighlight} onChange={(v) => onChange('titleHighlight', v)} />
          </div>
          <TextAreaField label="Section Subtitle" value={data.subtitle} onChange={(v) => onChange('subtitle', v)} />
          <InputField label="View All Button Text" value={data.viewAllBtnText} onChange={(v) => onChange('viewAllBtnText', v)} />

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-700 text-primary uppercase">Service Cards Content ({data.services?.length} Cards)</h3>
            {data.services?.map((srv: any, idx: number) => (
              <div key={srv.id || idx} className="p-4 bg-cream-dark/20 rounded-2xl border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-800 text-primary uppercase">Service #{idx + 1}: {srv.id}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <InputField label="Card Title" value={srv.title} onChange={(v) => {
                    const list = [...data.services];
                    list[idx].title = v;
                    onChange('services', list);
                  }} />
                  <InputField label="Button CTA Text" value={srv.ctaText} onChange={(v) => {
                    const list = [...data.services];
                    list[idx].ctaText = v;
                    onChange('services', list);
                  }} />
                </div>
                <TextAreaField label="Description" value={srv.description} onChange={(v) => {
                  const list = [...data.services];
                  list[idx].description = v;
                  onChange('services', list);
                }} rows={2} />
                <InputField label="Tags (comma separated)" value={srv.tags?.join(', ') || ''} onChange={(v) => {
                  const list = [...data.services];
                  list[idx].tags = v.split(',').map((t: string) => t.trim()).filter(Boolean);
                  onChange('services', list);
                }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'whyChooseUs':
      return (
        <div className="space-y-4">
          <InputField label="Section Badge" value={data.badge} onChange={(v) => onChange('badge', v)} />
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label="Heading Line 1" value={data.titleLine1} onChange={(v) => onChange('titleLine1', v)} />
            <InputField label="Heading Highlight" value={data.titleHighlight} onChange={(v) => onChange('titleHighlight', v)} />
          </div>
          <TextAreaField label="Section Subtitle" value={data.subtitle} onChange={(v) => onChange('subtitle', v)} />

          <div className="pt-4 border-t border-border">
            <h3 className="text-xs font-700 text-primary uppercase mb-3">Statistics Bar</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.stats?.map((st: any, idx: number) => (
                <div key={idx} className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                  <InputField label="Value" value={st.value} onChange={(v) => {
                    const list = [...data.stats];
                    list[idx].value = v;
                    onChange('stats', list);
                  }} />
                  <InputField label="Label" value={st.label} onChange={(v) => {
                    const list = [...data.stats];
                    list[idx].label = v;
                    onChange('stats', list);
                  }} />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-xs font-700 text-primary uppercase mb-3">ISO Badge Floating Box</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <InputField label="ISO Badge Title" value={data.isoBadgeTitle} onChange={(v) => onChange('isoBadgeTitle', v)} />
              <TextAreaField label="ISO Badge Description" value={data.isoBadgeDesc} onChange={(v) => onChange('isoBadgeDesc', v)} rows={2} />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-700 text-primary uppercase">6 Trust Reasons</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.reasons?.map((r: any, idx: number) => (
                <div key={idx} className="p-4 bg-cream-dark/20 rounded-2xl border border-border space-y-2">
                  <InputField label={`Reason ${idx + 1} Title`} value={r.title} onChange={(v) => {
                    const list = [...data.reasons];
                    list[idx].title = v;
                    onChange('reasons', list);
                  }} />
                  <TextAreaField label="Description" value={r.desc} onChange={(v) => {
                    const list = [...data.reasons];
                    list[idx].desc = v;
                    onChange('reasons', list);
                  }} rows={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className="space-y-4">
          <InputField label="Section Badge" value={data.badge} onChange={(v) => onChange('badge', v)} />
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label="Heading Line 1" value={data.titleLine1} onChange={(v) => onChange('titleLine1', v)} />
            <InputField label="Heading Highlight" value={data.titleHighlight} onChange={(v) => onChange('titleHighlight', v)} />
          </div>
          <TextAreaField label="Section Subtitle" value={data.subtitle} onChange={(v) => onChange('subtitle', v)} />

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-700 text-primary uppercase">Client Reviews ({data.items?.length} Reviews)</h3>
            {data.items?.map((item: any, idx: number) => (
              <div key={idx} className="p-4 bg-cream-dark/20 rounded-2xl border border-border space-y-3">
                <div className="grid sm:grid-cols-3 gap-3">
                  <InputField label="Client Name" value={item.name} onChange={(v) => {
                    const list = [...data.items];
                    list[idx].name = v;
                    onChange('items', list);
                  }} />
                  <InputField label="Location / Role" value={item.role} onChange={(v) => {
                    const list = [...data.items];
                    list[idx].role = v;
                    onChange('items', list);
                  }} />
                  <InputField label="Service Tag" value={item.service} onChange={(v) => {
                    const list = [...data.items];
                    list[idx].service = v;
                    onChange('items', list);
                  }} />
                </div>
                <TextAreaField label="Quote / Testimonial Text" value={item.quote} onChange={(v) => {
                  const list = [...data.items];
                  list[idx].quote = v;
                  onChange('items', list);
                }} rows={2} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'homeCTA':
      return (
        <div className="space-y-4">
          <InputField label="Section Badge" value={data.badge} onChange={(v) => onChange('badge', v)} />
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label="Heading Line 1" value={data.titleLine1} onChange={(v) => onChange('titleLine1', v)} />
            <InputField label="Heading Highlight" value={data.titleHighlight} onChange={(v) => onChange('titleHighlight', v)} />
          </div>
          <TextAreaField label="Subtitle" value={data.subtitle} onChange={(v) => onChange('subtitle', v)} />

          <div className="grid sm:grid-cols-3 gap-3">
            <InputField label="Quote Button Text" value={data.quoteBtnText} onChange={(v) => onChange('quoteBtnText', v)} />
            <InputField label="Call Button Text" value={data.callBtnText} onChange={(v) => onChange('callBtnText', v)} />
            <InputField label="Display Phone Number" value={data.phoneDisplay} onChange={(v) => onChange('phoneDisplay', v)} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-3">
            <InputField label="Guarantee Title" value={data.guaranteeTitle} onChange={(v) => onChange('guaranteeTitle', v)} />
            <InputField label="Guarantee Subtext" value={data.guaranteeDesc} onChange={(v) => onChange('guaranteeDesc', v)} />
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">About Hero Section</h3>
            <InputField label="Badge" value={data.hero?.badge} onChange={(v) => onChange('hero.badge', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <InputField label="Title Line 1" value={data.hero?.titleLine1} onChange={(v) => onChange('hero.titleLine1', v)} />
              <InputField label="Title Highlight" value={data.hero?.titleHighlight} onChange={(v) => onChange('hero.titleHighlight', v)} />
            </div>
            <TextAreaField label="Subtitle" value={data.hero?.subtitle} onChange={(v) => onChange('hero.subtitle', v)} />
            <div className="grid sm:grid-cols-4 gap-3">
              {data.hero?.stats?.map((st: any, idx: number) => (
                <div key={idx} className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                  <InputField label="Value" value={st.value} onChange={(v) => {
                    const list = [...data.hero.stats];
                    list[idx].value = v;
                    onChange('hero.stats', list);
                  }} />
                  <InputField label="Label" value={st.label} onChange={(v) => {
                    const list = [...data.hero.stats];
                    list[idx].label = v;
                    onChange('hero.stats', list);
                  }} />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Mission & Vision</h3>
            <InputField label="Badge" value={data.mission?.badge} onChange={(v) => onChange('mission.badge', v)} />
            <InputField label="Section Title" value={data.mission?.title} onChange={(v) => onChange('mission.title', v)} />
            <TextAreaField label="Section Subtitle" value={data.mission?.subtitle} onChange={(v) => onChange('mission.subtitle', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                <InputField label="Mission Title" value={data.mission?.missionTitle} onChange={(v) => onChange('mission.missionTitle', v)} />
                <TextAreaField label="Mission Text" value={data.mission?.missionDesc} onChange={(v) => onChange('mission.missionDesc', v)} />
              </div>
              <div className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                <InputField label="Vision Title" value={data.mission?.visionTitle} onChange={(v) => onChange('mission.visionTitle', v)} />
                <TextAreaField label="Vision Text" value={data.mission?.visionDesc} onChange={(v) => onChange('mission.visionDesc', v)} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Credentials & Accreditations</h3>
            <InputField label="Badge" value={data.credentials?.badge} onChange={(v) => onChange('credentials.badge', v)} />
            <InputField label="Title" value={data.credentials?.title} onChange={(v) => onChange('credentials.title', v)} />
            <TextAreaField label="Subtitle" value={data.credentials?.subtitle} onChange={(v) => onChange('credentials.subtitle', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              {data.credentials?.items?.map((cr: any, idx: number) => (
                <div key={idx} className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                  <InputField label="Title" value={cr.title} onChange={(v) => {
                    const list = [...data.credentials.items];
                    list[idx].title = v;
                    onChange('credentials.items', list);
                  }} />
                  <InputField label="Badge Chip" value={cr.badgeText} onChange={(v) => {
                    const list = [...data.credentials.items];
                    list[idx].badgeText = v;
                    onChange('credentials.items', list);
                  }} />
                  <TextAreaField label="Description" value={cr.desc} onChange={(v) => {
                    const list = [...data.credentials.items];
                    list[idx].desc = v;
                    onChange('credentials.items', list);
                  }} rows={2} />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Core Values</h3>
            <InputField label="Badge" value={data.teamValues?.badge} onChange={(v) => onChange('teamValues.badge', v)} />
            <InputField label="Title" value={data.teamValues?.title} onChange={(v) => onChange('teamValues.title', v)} />
            <TextAreaField label="Subtitle" value={data.teamValues?.subtitle} onChange={(v) => onChange('teamValues.subtitle', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              {data.teamValues?.values?.map((val: any, idx: number) => (
                <div key={idx} className="p-3 bg-cream-dark/20 rounded-xl border border-border space-y-2">
                  <InputField label="Value Title" value={val.title} onChange={(v) => {
                    const list = [...data.teamValues.values];
                    list[idx].title = v;
                    onChange('teamValues.values', list);
                  }} />
                  <TextAreaField label="Description" value={val.desc} onChange={(v) => {
                    const list = [...data.teamValues.values];
                    list[idx].desc = v;
                    onChange('teamValues.values', list);
                  }} rows={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'servicesPage':
      return (
        <div className="space-y-4">
          <InputField label="Page Hero Badge" value={data.hero?.badge} onChange={(v) => onChange('hero.badge', v)} />
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label="Title Line 1" value={data.hero?.titleLine1} onChange={(v) => onChange('hero.titleLine1', v)} />
            <InputField label="Title Highlight" value={data.hero?.titleHighlight} onChange={(v) => onChange('hero.titleHighlight', v)} />
          </div>
          <TextAreaField label="Subtitle" value={data.hero?.subtitle} onChange={(v) => onChange('hero.subtitle', v)} />
          <div className="grid sm:grid-cols-3 gap-3">
            <InputField label="Quote Button" value={data.hero?.quoteBtnText} onChange={(v) => onChange('hero.quoteBtnText', v)} />
            <InputField label="Phone Button" value={data.hero?.phoneBtnText} onChange={(v) => onChange('hero.phoneBtnText', v)} />
            <InputField label="Phone Number" value={data.hero?.phoneDisplay} onChange={(v) => onChange('hero.phoneDisplay', v)} />
          </div>
          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="text-xs font-700 text-primary uppercase">Services Grid Heading</h3>
            <InputField label="Grid Badge" value={data.grid?.badge} onChange={(v) => onChange('grid.badge', v)} />
            <InputField label="Grid Title" value={data.grid?.title} onChange={(v) => onChange('grid.title', v)} />
            <TextAreaField label="Grid Subtitle" value={data.grid?.subtitle} onChange={(v) => onChange('grid.subtitle', v)} />
          </div>
        </div>
      );

    case 'serviceDetail':
      const serviceKeys = Object.keys(data);
      return (
        <div className="space-y-6">
          <p className="text-xs text-muted-foreground font-500">
            Edit specific detailed page text for each service category:
          </p>
          {serviceKeys.map((k) => {
            const item = data[k];
            return (
              <div key={k} className="p-5 bg-cream-dark/20 rounded-2xl border border-border space-y-4">
                <span className="text-xs font-800 text-secondary uppercase tracking-wider block">
                  Category: {k.toUpperCase()}
                </span>
                <InputField label="Service Title" value={item.title} onChange={(v) => onChange(`${k}.title`, v)} />
                <InputField label="Service Subtitle" value={item.subtitle} onChange={(v) => onChange(`${k}.subtitle`, v)} />
                <TextAreaField label="Service Overview" value={item.overview} onChange={(v) => onChange(`${k}.overview`, v)} rows={2} />
                <InputField label="Pricing Guidance Note" value={item.pricingNote} onChange={(v) => onChange(`${k}.pricingNote`, v)} />
                <TextAreaField
                  label="Features / Checklist (one per line)"
                  value={item.features?.join('\n') || ''}
                  onChange={(v) => onChange(`${k}.features`, v.split('\n').filter(Boolean))}
                  rows={4}
                />
              </div>
            );
          })}
        </div>
      );

    case 'contact':
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Contact Page Hero</h3>
            <InputField label="Hero Badge" value={data.hero?.badge} onChange={(v) => onChange('hero.badge', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <InputField label="Title Line 1" value={data.hero?.titleLine1} onChange={(v) => onChange('hero.titleLine1', v)} />
              <InputField label="Title Highlight" value={data.hero?.titleHighlight} onChange={(v) => onChange('hero.titleHighlight', v)} />
            </div>
            <TextAreaField label="Subtitle" value={data.hero?.subtitle} onChange={(v) => onChange('hero.subtitle', v)} />
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Direct Office &amp; Contact Info</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <InputField label="Office Title" value={data.main?.officeTitle} onChange={(v) => onChange('main.officeTitle', v)} />
              <InputField label="Office Street Address" value={data.main?.officeAddress} onChange={(v) => onChange('main.officeAddress', v)} />
              <InputField label="Office City & Postcode" value={data.main?.officeCity} onChange={(v) => onChange('main.officeCity', v)} />
              <InputField label="Phone Number" value={data.main?.phoneNumber} onChange={(v) => onChange('main.phoneNumber', v)} />
              <InputField label="Email Address" value={data.main?.emailAddress} onChange={(v) => onChange('main.emailAddress', v)} />
              <InputField label="Weekday Hours" value={data.main?.hoursWeekdays} onChange={(v) => onChange('main.hoursWeekdays', v)} />
              <InputField label="Weekend Hours" value={data.main?.hoursWeekends} onChange={(v) => onChange('main.hoursWeekends', v)} />
              <InputField label="Emergency Notice" value={data.main?.emergencyNote} onChange={(v) => onChange('main.emergencyNote', v)} />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Contact Form Copy</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <InputField label="Form Title" value={data.form?.title} onChange={(v) => onChange('form.title', v)} />
              <InputField label="Submit Button Text" value={data.form?.submitBtnText} onChange={(v) => onChange('form.submitBtnText', v)} />
            </div>
            <TextAreaField label="Form Subtitle" value={data.form?.subtitle} onChange={(v) => onChange('form.subtitle', v)} rows={2} />
            <InputField label="Success Message" value={data.form?.successMessage} onChange={(v) => onChange('form.successMessage', v)} />
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Frequently Asked Questions ({data.faq?.items?.length} FAQs)</h3>
            <InputField label="FAQ Badge" value={data.faq?.badge} onChange={(v) => onChange('faq.badge', v)} />
            <InputField label="FAQ Title" value={data.faq?.title} onChange={(v) => onChange('faq.title', v)} />
            <TextAreaField label="FAQ Subtitle" value={data.faq?.subtitle} onChange={(v) => onChange('faq.subtitle', v)} rows={2} />
            <div className="space-y-3">
              {data.faq?.items?.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 bg-cream-dark/20 rounded-2xl border border-border space-y-2">
                  <InputField label={`Question #${idx + 1}`} value={faq.question} onChange={(v) => {
                    const list = [...data.faq.items];
                    list[idx].question = v;
                    onChange('faq.items', list);
                  }} />
                  <TextAreaField label="Answer" value={faq.answer} onChange={(v) => {
                    const list = [...data.faq.items];
                    list[idx].answer = v;
                    onChange('faq.items', list);
                  }} rows={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'blog':
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Blog Hero</h3>
            <InputField label="Hero Badge" value={data.hero?.badge} onChange={(v) => onChange('hero.badge', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <InputField label="Title Line 1" value={data.hero?.titleLine1} onChange={(v) => onChange('hero.titleLine1', v)} />
              <InputField label="Title Highlight" value={data.hero?.titleHighlight} onChange={(v) => onChange('hero.titleHighlight', v)} />
            </div>
            <TextAreaField label="Subtitle" value={data.hero?.subtitle} onChange={(v) => onChange('hero.subtitle', v)} />
            <InputField label="Search Input Placeholder" value={data.hero?.searchPlaceholder} onChange={(v) => onChange('hero.searchPlaceholder', v)} />
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-xs font-800 text-primary uppercase">Published Articles ({data.articles?.length} Articles)</h3>
            {data.articles?.map((art: any, idx: number) => (
              <div key={art.id || idx} className="p-4 bg-cream-dark/20 rounded-2xl border border-border space-y-3">
                <InputField label="Article Headline" value={art.title} onChange={(v) => {
                  const list = [...data.articles];
                  list[idx].title = v;
                  onChange('articles', list);
                }} />
                <TextAreaField label="Article Excerpt" value={art.excerpt} onChange={(v) => {
                  const list = [...data.articles];
                  list[idx].excerpt = v;
                  onChange('articles', list);
                }} rows={2} />
                <div className="grid sm:grid-cols-4 gap-3">
                  <InputField label="Category" value={art.category} onChange={(v) => {
                    const list = [...data.articles];
                    list[idx].category = v;
                    onChange('articles', list);
                  }} />
                  <InputField label="Date" value={art.date} onChange={(v) => {
                    const list = [...data.articles];
                    list[idx].date = v;
                    onChange('articles', list);
                  }} />
                  <InputField label="Read Time" value={art.readTime} onChange={(v) => {
                    const list = [...data.articles];
                    list[idx].readTime = v;
                    onChange('articles', list);
                  }} />
                  <InputField label="Author" value={art.author} onChange={(v) => {
                    const list = [...data.articles];
                    list[idx].author = v;
                    onChange('articles', list);
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'footer':
      return (
        <div className="space-y-4">
          <InputField label="Brand Name" value={data.brandName} onChange={(v) => onChange('brandName', v)} />
          <TextAreaField label="Brand Description Paragraph" value={data.brandDescription} onChange={(v) => onChange('brandDescription', v)} rows={2} />
          <div className="grid sm:grid-cols-3 gap-3">
            <InputField label="Location Text" value={data.locationText} onChange={(v) => onChange('locationText', v)} />
            <InputField label="Telephone Number" value={data.phoneNumber} onChange={(v) => onChange('phoneNumber', v)} />
            <InputField label="Email Address" value={data.emailAddress} onChange={(v) => onChange('emailAddress', v)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label="Book Service CTA Button" value={data.bookServiceBtnText} onChange={(v) => onChange('bookServiceBtnText', v)} />
            <InputField label="Copyright Notice" value={data.copyrightText} onChange={(v) => onChange('copyrightText', v)} />
          </div>
        </div>
      );

    case 'emailSettings':
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-cream-dark/30 rounded-2xl border border-border">
            <div>
              <p className="text-xs font-800 text-primary uppercase">Automated Email Notifications</p>
              <p className="text-[11px] text-muted-foreground font-500">Dispatch email whenever a user fills out a contact form</p>
            </div>
            <button
              type="button"
              onClick={() => onChange('notificationsEnabled', !data.notificationsEnabled)}
              className={`px-3 py-1.5 rounded-xl text-xs font-700 transition-colors ${
                data.notificationsEnabled
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {data.notificationsEnabled ? 'Active (ON)' : 'Deactivated (OFF)'}
            </button>
          </div>

          <div className="space-y-3">
            <InputField
              label="Recipient Emails (comma-separated)"
              value={data.recipients?.join(', ') || ''}
              onChange={(v) =>
                onChange(
                  'recipients',
                  v.split(',').map((s: string) => s.trim()).filter(Boolean)
                )
              }
              placeholder="e.g. rahulbadugu22@gmail.com, manager@example.co.uk"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <InputField
              label="Sender Display Name"
              value={data.senderName}
              onChange={(v) => onChange('senderName', v)}
              placeholder="ShalomGlobal Notifications"
            />
            <InputField
              label="Email Subject Prefix"
              value={data.subjectPrefix}
              onChange={(v) => onChange('subjectPrefix', v)}
              placeholder="🔔 New ShalomGlobal Lead"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
