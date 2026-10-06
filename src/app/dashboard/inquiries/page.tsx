'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { getInquiries, deleteInquiry, Inquiry } from '@/lib/inquiries';
import DashboardShell from '@/app/dashboard/components/DashboardShell';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const loadData = async () => {
    setLoading(true);
    const data = await getInquiries();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to remove this inquiry?')) {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(filter.toLowerCase()) ||
      i.email.toLowerCase().includes(filter.toLowerCase()) ||
      i.service.toLowerCase().includes(filter.toLowerCase()) ||
      i.message.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header banner */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-700 rounded-full mb-1">
            <Icon name="InboxIcon" size={14} />
            Leads &amp; Customer Submissions
          </div>
          <h1 className="text-2xl font-800 text-primary tracking-tight">
            Customer Inquiries &amp; Service Requests
          </h1>
          <p className="text-xs text-muted-foreground font-500">
            Messages and quote inquiries submitted via the website contact forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-700 text-primary transition-colors flex items-center gap-1.5"
          >
            <Icon name="ArrowPathIcon" size={14} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-border shadow-card">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inquiries by customer name, email, service, or message content..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Icon name="MagnifyingGlassIcon" size={16} />
          </div>
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center space-y-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-600 text-muted-foreground">Loading submissions from database...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center space-y-3">
          <Icon name="InboxIcon" size={36} className="mx-auto text-muted-foreground/50" />
          <p className="text-sm font-700 text-primary">No inquiries found</p>
          <p className="text-xs text-muted-foreground font-500">
            New contact submissions from the live website will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-3xl p-6 border border-border shadow-card hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary font-bold text-sm">
                    {inq.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-800 text-primary">{inq.name}</h3>
                    <p className="text-xs text-muted-foreground font-500">
                      Submitted on: <span className="text-primary font-600">{inq.date || 'Recent'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-700 bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                    {inq.service}
                  </span>
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete inquiry"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-cream-dark/25 rounded-2xl border border-border">
                <p className="text-xs font-700 text-primary uppercase mb-1">Message Content:</p>
                <p className="text-xs text-foreground/90 font-500 leading-relaxed whitespace-pre-wrap">
                  {inq.message}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <a
                  href={`tel:${inq.phone}`}
                  className="inline-flex items-center gap-1.5 text-primary font-700 hover:text-secondary transition-colors"
                >
                  <Icon name="PhoneIcon" size={14} className="text-secondary" />
                  {inq.phone}
                </a>
                <a
                  href={`mailto:${inq.email}`}
                  className="inline-flex items-center gap-1.5 text-primary font-700 hover:text-secondary transition-colors"
                >
                  <Icon name="EnvelopeIcon" size={14} className="text-secondary" />
                  {inq.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </DashboardShell>
  );
}
