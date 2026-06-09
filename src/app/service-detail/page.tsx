import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceDetailContent from '@/app/service-detail/components/ServiceDetailContent';

export default function ServiceDetailPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" /></div>}>
          <ServiceDetailContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}