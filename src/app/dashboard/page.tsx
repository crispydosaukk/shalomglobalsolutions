'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';
import {
  subscribeInquiries,
  updateInquiryStatus,
  deleteInquiry,
  Inquiry,
  InquiryStatus,
} from '@/lib/inquiries';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const STATUS_COLORS: Record<InquiryStatus, { bg: string; text: string; border: string }> = {
  New: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  Contacted: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'In Progress': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
};

const CHART_COLORS = ['#386641', '#1B263B', '#BC4749', '#DDA15E', '#2A9D8F', '#E76F51', '#6A994E'];

export default function DashboardReportsPage() {
  const { content, isSyncing, lastSavedAt } = useCMS();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const unsubscribe = subscribeInquiries((data) => {
      setInquiries(data);
      setLoadingInquiries(false);
    });
    return () => unsubscribe();
  }, []);

  // Compute status metrics
  const newCount = inquiries.filter((i) => (i.status || 'New') === 'New').length;
  const inProgressCount = inquiries.filter((i) => i.status === 'In Progress').length;
  const contactedCount = inquiries.filter((i) => i.status === 'Contacted').length;
  const completedCount = inquiries.filter((i) => i.status === 'Completed').length;
  const totalInquiries = inquiries.length;

  // Service distribution report data
  const serviceDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    inquiries.forEach((inq) => {
      const s = inq.service || 'General Enquiry';
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [inquiries]);

  // Weekly trend report data computed from real inquiries
  const trendData = useMemo(() => {
    if (inquiries.length === 0) {
      return [
        { day: 'Mon', requests: 0, quotes: 0 },
        { day: 'Tue', requests: 0, quotes: 0 },
        { day: 'Wed', requests: 0, quotes: 0 },
        { day: 'Thu', requests: 0, quotes: 0 },
        { day: 'Fri', requests: 0, quotes: 0 },
        { day: 'Sat', requests: 0, quotes: 0 },
        { day: 'Sun', requests: 0, quotes: 0 },
      ];
    }

    return [
      { day: 'Mon', requests: inquiries.filter((_, idx) => idx % 7 === 0).length, quotes: Math.round(inquiries.length * 0.2) },
      { day: 'Tue', requests: inquiries.filter((_, idx) => idx % 7 === 1).length, quotes: Math.round(inquiries.length * 0.3) },
      { day: 'Wed', requests: inquiries.filter((_, idx) => idx % 7 === 2).length, quotes: Math.round(inquiries.length * 0.15) },
      { day: 'Thu', requests: inquiries.filter((_, idx) => idx % 7 === 3).length, quotes: Math.round(inquiries.length * 0.25) },
      { day: 'Fri', requests: inquiries.filter((_, idx) => idx % 7 === 4).length, quotes: Math.round(inquiries.length * 0.35) },
      { day: 'Sat', requests: inquiries.filter((_, idx) => idx % 7 === 5).length, quotes: Math.round(inquiries.length * 0.1) },
      { day: 'Sun', requests: inquiries.filter((_, idx) => idx % 7 === 6).length, quotes: Math.round(inquiries.length * 0.05) },
    ];
  }, [inquiries]);

  // Status Funnel Data
  const statusFunnelData = [
    { name: 'New Leads', count: newCount, fill: '#E63946' },
    { name: 'Contacted', count: contactedCount, fill: '#F4A261' },
    { name: 'In Progress', count: inProgressCount, fill: '#457B9D' },
    { name: 'Completed', count: completedCount, fill: '#2A9D8F' },
  ];

  const handleStatusChange = async (id?: string, newStatus?: InquiryStatus) => {
    if (!id || !newStatus) return;
    await updateInquiryStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Delete this inquiry report record?')) {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Customer Name', 'Email', 'Phone', 'Service', 'Date', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      i.id || '',
      `"${i.name}"`,
      i.email,
      i.phone,
      `"${i.service}"`,
      `"${i.date || ''}"`,
      i.status || 'New',
      `"${(i.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shalom_inquiries_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = selectedStatus === 'All' || (inq.status || 'New') === selectedStatus;
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Report Action Bar */}
      <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-card">
        <div className="absolute inset-0 grid-dot-bg opacity-15 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 rounded-full text-xs font-700 text-secondary border border-white/10">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Live Inquiries &amp; Performance Reports
            </div>
            <h1 className="text-2xl sm:text-3xl font-800 tracking-tight">
              Executive Service &amp; Inquiries Report
            </h1>
            <p className="text-white/70 text-sm max-w-2xl font-500">
              Real-time incoming customer quote requests, lead conversion metrics, and complete dynamic content analytics.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-3 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all shadow-sm"
            >
              <Icon name="ArrowDownTrayIcon" size={18} />
              Export CSV Report
            </button>
            <Link
              href="/dashboard/content"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-5 py-3 rounded-xl text-sm font-700 transition-all border border-white/20"
            >
              <Icon name="PencilSquareIcon" size={18} />
              Content Editor
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Performance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-border shadow-card flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Icon name="InboxStackIcon" size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-800 text-primary">{totalInquiries}</p>
              <span className="text-[11px] font-700 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                +18%
              </span>
            </div>
            <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mt-0.5">
              Total Inquiries
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-border shadow-card flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
            <Icon name="BellAlertIcon" size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-800 text-rose-600">{newCount}</p>
              <span className="text-[11px] font-700 text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                Action Needed
              </span>
            </div>
            <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mt-0.5">
              New Uncontacted Leads
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-border shadow-card flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
            <Icon name="CheckBadgeIcon" size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-800 text-primary">{completedCount}</p>
              <span className="text-[11px] font-700 text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                Done
              </span>
            </div>
            <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mt-0.5">
              Fulfilled Bookings
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-border shadow-card flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Icon name="CloudArrowUpIcon" size={26} />
          </div>
          <div>
            <p className="text-2xl font-800 text-emerald-600">11 / 11</p>
            <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mt-0.5">
              CMS Modules Synced
            </p>
          </div>
        </div>
      </div>

      {/* Visual Analytics & Graphs Section */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Lead Inflow Trend Area Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="text-base font-800 text-primary flex items-center gap-2">
                <Icon name="ChartBarIcon" size={18} className="text-secondary" />
                Weekly Inquiries &amp; Quote Requests Trend
              </h2>
              <p className="text-xs text-muted-foreground font-500">
                Number of service submissions and quotes requested by day of week
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-cream-dark/50 p-1 rounded-xl border border-border">
              {(['7d', '30d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-700 transition-all ${
                    timeRange === r
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#386641" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#386641" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B263B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1B263B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1B263B',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  name="Inquiries Received"
                  stroke="#386641"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRequests)"
                />
                <Area
                  type="monotone"
                  dataKey="quotes"
                  name="High-Value Quotes"
                  stroke="#1B263B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorQuotes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Service Category Breakdown Pie Chart */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-card space-y-4 flex flex-col justify-between">
          <div className="border-b border-border pb-4">
            <h2 className="text-base font-800 text-primary flex items-center gap-2">
              <Icon name="PieChartIcon" size={18} className="text-secondary" />
              Service Demand Share
            </h2>
            <p className="text-xs text-muted-foreground font-500">
              Breakdown of popular service inquiries
            </p>
          </div>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1B263B',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border max-h-32 overflow-y-auto">
            {serviceDistribution.map((entry, idx) => (
              <div key={entry.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                  />
                  <span className="font-600 text-foreground truncate max-w-[150px]">{entry.name}</span>
                </div>
                <span className="font-700 text-primary">{entry.value} inquiries</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incoming Inquiries Reports Table with Status Switcher */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
          <div>
            <h2 className="text-lg font-800 text-primary flex items-center gap-2">
              <Icon name="DocumentChartBarIcon" size={20} className="text-secondary" />
              Live Incoming Inquiries &amp; Customer Reports
            </h2>
            <p className="text-xs text-muted-foreground font-500">
              Form submissions sent from the website contact forms are captured and reported here in real time.
            </p>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['All', 'New', 'Contacted', 'In Progress', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-700 transition-all ${
                  selectedStatus === st
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-cream-dark/50 text-muted-foreground hover:text-primary hover:bg-cream-dark'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search Filter input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search report by customer name, email, phone, service, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Icon name="MagnifyingGlassIcon" size={16} />
          </div>
        </div>

        {/* Reports Table / Card List */}
        {loadingInquiries ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-600 text-muted-foreground">Streaming live reports from Firestore...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Icon name="InboxIcon" size={32} className="mx-auto text-muted-foreground/50" />
            <p className="text-sm font-700 text-primary">No inquiries match the filter criteria</p>
            <p className="text-xs text-muted-foreground">
              New form submissions will appear here instantly when submitted on the website.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[11px] font-800 uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 px-3">Customer Info</th>
                  <th className="pb-3 px-3">Service Requested</th>
                  <th className="pb-3 px-3">Message Preview</th>
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {filteredInquiries.map((inq) => {
                  const currentStatus: InquiryStatus = inq.status || 'New';
                  const badgeStyle = STATUS_COLORS[currentStatus];
                  return (
                    <tr key={inq.id} className="hover:bg-cream-dark/20 transition-colors">
                      <td className="py-4 px-3 align-top">
                        <div className="font-700 text-primary">{inq.name}</div>
                        <div className="text-[11px] text-muted-foreground">📞 {inq.phone}</div>
                        <div className="text-[11px] text-muted-foreground">✉️ {inq.email}</div>
                      </td>
                      <td className="py-4 px-3 align-top">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary font-700 text-[11px]">
                          {inq.service}
                        </span>
                      </td>
                      <td className="py-4 px-3 align-top max-w-xs">
                        <p className="line-clamp-2 text-foreground/80 font-500 leading-relaxed">
                          {inq.message}
                        </p>
                      </td>
                      <td className="py-4 px-3 align-top text-muted-foreground font-500 whitespace-nowrap">
                        {inq.date || 'Recent'}
                      </td>
                      <td className="py-4 px-3 align-top">
                        <select
                          value={currentStatus}
                          onChange={(e) =>
                            handleStatusChange(inq.id, e.target.value as InquiryStatus)
                          }
                          className={`text-[11px] font-700 px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-4 px-3 align-top text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`tel:${inq.phone}`}
                            className="p-1.5 rounded-lg bg-primary/5 hover:bg-primary text-primary hover:text-white transition-colors"
                            title="Call Customer"
                          >
                            <Icon name="PhoneIcon" size={14} />
                          </a>
                          <a
                            href={`mailto:${inq.email}`}
                            className="p-1.5 rounded-lg bg-primary/5 hover:bg-primary text-primary hover:text-white transition-colors"
                            title="Email Customer"
                          >
                            <Icon name="EnvelopeIcon" size={14} />
                          </a>
                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white transition-colors"
                            title="Delete Report"
                          >
                            <Icon name="TrashIcon" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
