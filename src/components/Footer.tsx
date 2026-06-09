import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const footerLinks = {
  services: [
    { label: 'Cleaning Services', href: '/service-detail?service=cleaning' },
    { label: 'Home Relocation', href: '/service-detail?service=moving' },
    { label: 'Property & Tenant', href: '/service-detail?service=property' },
    { label: 'Handyman Services', href: '/service-detail?service=handyman' },
    { label: 'Childcare', href: '/service-detail?service=childcare' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms of Service', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={40} />
              <span className="font-extrabold text-lg text-white">ShalomGlobal</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Solutions for Every Need — professional services for homes, businesses, and properties across the UK.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Icon name="MapPinIcon" size={16} className="text-secondary shrink-0" />
              United Kingdom
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-700 uppercase tracking-widest text-white/40 mb-4">Services</p>
            <ul className="space-y-2.5">
              {footerLinks?.services?.map((l) => (
                <li key={l?.href}>
                  <Link href={l?.href} className="text-sm text-white/60 hover:text-white transition-colors font-500">
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-700 uppercase tracking-widest text-white/40 mb-4">Company</p>
            <ul className="space-y-2.5">
              {footerLinks?.company?.map((l) => (
                <li key={l?.href}>
                  <Link href={l?.href} className="text-sm text-white/60 hover:text-white transition-colors font-500">
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-700 uppercase tracking-widest text-white/40 mb-4">Get in Touch</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Icon name="PhoneIcon" size={15} className="text-secondary shrink-0" />
                <span>+44 (0) 7700 900000</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Icon name="EnvelopeIcon" size={15} className="text-secondary shrink-0" />
                <span>info@shalomglobalsolution.co.uk</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-5 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-colors"
            >
              <Icon name="ChatBubbleLeftIcon" size={15} />
              Book a Service
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-500">
            © 2026 Shalom Global Solution Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks?.legal?.map((l) => (
              <Link key={l?.href} href={l?.href} className="text-xs text-white/40 hover:text-white/70 transition-colors font-500">
                {l?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}