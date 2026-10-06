import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';

import FirebaseAnalytics from '@/components/FirebaseAnalytics';
import { AuthProvider } from '@/lib/authContext';
import { CMSProvider } from '@/lib/cmsContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'ShalomGlobal — Solutions for Every Need',
  description: 'Shalom Global Solution delivers professional cleaning, moving, property, childcare & handyman services for homes and businesses across the UK.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'ShalomGlobal — Solutions for Every Need',
    description: 'Professional cleaning, moving, property, childcare & handyman services across the UK.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Shalom Global Solution Ltd',
  telephone: '07493109832',
  email: 'info@shalomglobalsolution.co.uk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '241e, High Street',
    addressLocality: 'London',
    postalCode: 'E12 6SJ',
    addressCountry: 'GB',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={plusJakartaSans.className} suppressHydrationWarning>
        <AuthProvider>
          <CMSProvider>
            <FirebaseAnalytics />
            {children}
          </CMSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}