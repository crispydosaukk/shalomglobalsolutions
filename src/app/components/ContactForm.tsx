'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const serviceOptions = [
  'Professional Cleaning Services',
  'Home Relocation & Moving',
  'Property & Tenant Support',
  'Babysitting & Childcare',
  'Handyman Services',
  'Security & Home Safety',
  'Multiple Services',
  'Other / General Enquiry',
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={36} className="text-secondary" variant="solid" />
        </div>
        <h4 className="text-lg font-800 text-primary mb-2">Thank you, {form.fullName.split(' ')[0]}!</h4>
        <p className="text-muted-foreground text-sm font-500">
          We&apos;ve received your enquiry and will contact you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', service: '', message: '' }); }}
          className="mt-6 text-sm font-600 text-secondary underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-700 text-primary mb-1.5 uppercase tracking-wide">
          Full Name <span className="text-terracotta">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          placeholder="e.g. Sarah Johnson"
          className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-700 text-primary mb-1.5 uppercase tracking-wide">
          Email Address <span className="text-terracotta">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.co.uk"
          className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-700 text-primary mb-1.5 uppercase tracking-wide">
          Phone Number <span className="text-terracotta">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="+44 7700 900000"
          className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
        />
      </div>

      {/* Service Dropdown */}
      <div>
        <label className="block text-xs font-700 text-primary mb-1.5 uppercase tracking-wide">
          Type of Service <span className="text-terracotta">*</span>
        </label>
        <div className="relative">
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all appearance-none"
          >
            <option value="" disabled>Select a service...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <Icon name="ChevronDownIcon" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-700 text-primary mb-1.5 uppercase tracking-wide">
          Your Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us more about what you need, preferred dates, property type..."
          className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-700 hover:bg-navy-light transition-all disabled:opacity-70"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Icon name="PaperAirplaneIcon" size={16} />
            Send Enquiry
          </>
        )}
      </button>

      <p className="text-xs text-center text-muted-foreground font-500">
        We respond within 24 hours · Your data is secure
      </p>
    </form>
  );
}