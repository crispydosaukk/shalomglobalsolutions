import React from 'react';

import Icon from '@/components/ui/AppIcon';
import ContactForm from '@/app/components/ContactForm';

export default function HomeCTASection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 blob-primary opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 blob-accent opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grid-dot-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="text-white">
            <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-4">
              Get Started Today
            </span>
            <h2 className="text-section-title text-white mb-6">
              Ready to Experience<br />
              <span className="text-secondary">Professional Service?</span>
            </h2>
            <p className="text-white/70 font-500 leading-relaxed mb-10 text-lg">
              Fill in the form and our team will get back to you within 24 hours with a tailored quote for your needs.
            </p>

            <div className="space-y-5">
              {[
                { icon: 'PhoneIcon', text: '+44 (0) 7700 900000', sub: 'Mon–Sat, 8am–8pm' },
                { icon: 'EnvelopeIcon', text: 'info@shalomglobalsolution.co.uk', sub: 'We reply within 24 hours' },
                { icon: 'MapPinIcon', text: 'United Kingdom', sub: 'Nationwide service coverage' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={item.icon as any} size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-700 text-white text-sm">{item.text}</p>
                    <p className="text-white/50 text-xs font-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-4xl p-8 shadow-hero">
            <h3 className="text-xl font-800 text-primary mb-2">Book a Service</h3>
            <p className="text-muted-foreground text-sm font-500 mb-6">
              Tell us what you need and we&apos;ll get back to you promptly.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}