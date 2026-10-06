'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';
import DashboardShell from '@/app/dashboard/components/DashboardShell';

export default function EmailSettingsPage() {
  const { content, updateSection, isSyncing, lastSavedAt } = useCMS();
  const defaultRecipients = ['sgs.london2015@gmail.com', 'digitalbotsolutions@gmail.com', 'info@shalomgsolutions.co.uk'];
  const currentSettings = content?.emailSettings || {
    notificationsEnabled: true,
    recipients: defaultRecipients,
    senderName: 'ShalomGlobal Service Enquiry',
    subjectPrefix: '🔔 New ShalomGlobal Service Enquiry',
  };

  const [enabled, setEnabled] = useState(currentSettings.notificationsEnabled);
  const [recipients, setRecipients] = useState<string[]>(currentSettings.recipients || defaultRecipients);
  const [newEmailInput, setNewEmailInput] = useState('');
  const [senderName, setSenderName] = useState(currentSettings.senderName || 'ShalomGlobal Service Enquiry');
  const [subjectPrefix, setSubjectPrefix] = useState(currentSettings.subjectPrefix || '🔔 New ShalomGlobal Service Enquiry');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (content?.emailSettings) {
      setEnabled(content.emailSettings.notificationsEnabled ?? true);
      setRecipients(content.emailSettings.recipients || defaultRecipients);
      setSenderName(content.emailSettings.senderName || 'ShalomGlobal Service Enquiry');
      setSubjectPrefix(content.emailSettings.subjectPrefix || '🔔 New ShalomGlobal Service Enquiry');
    }
  }, [content]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (!newPassword || newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Passwords do not match. Please re-enter.' });
      return;
    }

    try {
      localStorage.setItem('shalom_admin_password_custom', newPassword);
    } catch (e) {}

    const success = await updateSection('adminSecurity', {
      adminPassword: newPassword,
      adminEmails: content?.adminSecurity?.adminEmails || [
        'info@shalomgsolutions.co.uk',
        'sgs.london2015@gmail.com',
        'digitalbotsolutions@gmail.com',
        'rahulbadugu22@gmail.com',
      ],
    });

    if (success) {
      setPasswordStatus({
        type: 'success',
        message: 'Administrator password updated successfully! It is now active for future logins.',
      });
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordStatus({ type: 'error', message: 'Failed to update password. Please try again.' });
    }
  };

  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newEmailInput.trim().toLowerCase();
    if (!clean || !clean.includes('@')) return;
    if (!recipients.includes(clean)) {
      setRecipients([...recipients, clean]);
    }
    setNewEmailInput('');
  };

  const handleRemoveRecipient = (emailToRemove: string) => {
    if (recipients.length <= 1) {
      alert('You must keep at least one recipient email address.');
      return;
    }
    setRecipients(recipients.filter((r) => r !== emailToRemove));
  };

  const handleSave = async () => {
    const updated = {
      notificationsEnabled: enabled,
      recipients,
      senderName,
      subjectPrefix,
    };

    const success = await updateSection('emailSettings', updated);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleSendTestEmail = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isTest: true,
          name: 'Admin Test Verification',
          service: 'Email System Verification',
          phone: '07493109832',
          email: recipients[0] || 'admin@shalomglobalsolution.co.uk',
          message: 'This is an instant verification email sent from your ShalomGlobal Admin Portal. Your email dispatch pipeline is fully working!',
          customRecipients: recipients,
          customEnabled: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTestResult({
          success: true,
          message: `Test email successfully dispatched to: ${recipients.join(', ')}`,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Failed to dispatch test email',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Network error while sending test email',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/15 text-secondary text-xs font-700 rounded-full mb-1">
            <Icon name="EnvelopeIcon" size={14} />
            Email Dispatch &amp; Notification Control
          </div>
          <h1 className="text-2xl font-800 text-primary tracking-tight">
            Dynamic Email Notifications
          </h1>
          <p className="text-xs text-muted-foreground font-500">
            Control automated email alerts when customers submit inquiries on your website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSendTestEmail}
            disabled={testing}
            className="px-4 py-2.5 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-white text-xs font-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {testing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                <span>Sending Test Email...</span>
              </>
            ) : (
              <>
                <Icon name="PaperAirplaneIcon" size={14} />
                <span>Send Test Email</span>
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={isSyncing}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-navy-light text-white text-xs font-700 shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Icon name="CloudArrowUpIcon" size={16} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-700 flex items-center gap-2 animate-fadeIn">
          <Icon name="CheckCircleIcon" size={18} className="text-emerald-600" />
          <span>Email notification settings successfully updated in the database!</span>
        </div>
      )}

      {testResult && (
        <div
          className={`p-4 rounded-2xl border text-xs font-700 flex items-center gap-2 animate-fadeIn ${
            testResult.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <Icon
            name={testResult.success ? 'CheckCircleIcon' : 'ExclamationTriangleIcon'}
            size={18}
            className={testResult.success ? 'text-emerald-600' : 'text-rose-600'}
          />
          <span>{testResult.message}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card space-y-8">
        {/* Toggle Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-cream-dark/30 border border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-800 text-primary">Automated Email Notifications</h3>
              <span
                className={`text-[10px] font-800 uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                  enabled
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {enabled ? 'Active / ON' : 'Deactivated / OFF'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-500">
              When activated, an instant notification email is dispatched every time a visitor submits a contact form.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              enabled ? 'bg-secondary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                enabled ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Recipients Management */}
        <div className="space-y-4">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm font-800 text-primary flex items-center gap-2">
              <Icon name="EnvelopeOpenIcon" size={16} className="text-secondary" />
              Recipient Email Addresses (Where emails are sent)
            </h3>
            <p className="text-xs text-muted-foreground font-500">
              Add the email addresses that should receive incoming lead alerts. You can add multiple emails.
            </p>
          </div>

          {/* Add Email Form */}
          <form onSubmit={handleAddRecipient} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter email address (e.g. manager@example.co.uk)..."
                value={newEmailInput}
                onChange={(e) => setNewEmailInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Icon name="PlusCircleIcon" size={16} />
              </div>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-700 hover:bg-navy-light transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Icon name="PlusIcon" size={14} />
              Add Email
            </button>
          </form>

          {/* Active Recipients List */}
          <div className="space-y-2 pt-2">
            {recipients.map((rec, idx) => (
              <div
                key={rec}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-cream-dark/20 border border-border hover:bg-cream-dark/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-700 text-primary">{rec}</span>
                    {idx === 0 && (
                      <span className="ml-2 text-[10px] font-700 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Primary Recipient
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveRecipient(rec)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Remove this email"
                >
                  <Icon name="TrashIcon" size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sender & Template Customization */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm font-800 text-primary flex items-center gap-2">
              <Icon name="Cog6ToothIcon" size={16} className="text-secondary" />
              Email Sender &amp; Subject Template
            </h3>
            <p className="text-xs text-muted-foreground font-500">
              Customize how the notification looks in your inbox.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-700 text-primary uppercase tracking-wider">
                Sender Display Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. ShalomGlobal Notifications"
                className="w-full px-3.5 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-700 text-primary uppercase tracking-wider">
                Email Subject Prefix
              </label>
              <input
                type="text"
                value={subjectPrefix}
                onChange={(e) => setSubjectPrefix(e.target.value)}
                placeholder="e.g. 🔔 New ShalomGlobal Lead"
                className="w-full px-3.5 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Server Info Card */}
        <div className="p-4 rounded-2xl bg-cream-dark/25 border border-border space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 text-primary font-700">
            <Icon name="ServerIcon" size={14} className="text-secondary" />
            SMTP Relay Configuration
          </div>
          <p>
            Connected to <strong>smtp.gmail.com (zingbiteuk@gmail.com)</strong>. Emails are dispatched securely via TLS.
          </p>
        </div>

        {/* Bottom Save Action */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-500">
            Click <strong>Save Settings</strong> to store email preferences to database.
          </span>
          <button
            onClick={handleSave}
            disabled={isSyncing}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-navy-light text-white text-xs font-700 shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Icon name="CheckIcon" size={16} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Admin Security & Password Management Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card space-y-6">
        <div className="border-b border-border pb-4 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 text-amber-700 text-xs font-700 rounded-full mb-1">
              <Icon name="LockClosedIcon" size={14} />
              Admin Portal Security
            </div>
            <h2 className="text-xl font-800 text-primary tracking-tight">
              Administrator Password Management
            </h2>
            <p className="text-xs text-muted-foreground font-500">
              Update the master login password for the ShalomGlobal Admin Dashboard.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Security Active
          </div>
        </div>

        {passwordStatus && (
          <div
            className={`p-4 rounded-2xl border text-xs font-700 flex items-center gap-2 animate-fadeIn ${
              passwordStatus.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <Icon
              name={passwordStatus.type === 'success' ? 'CheckCircleIcon' : 'ExclamationTriangleIcon'}
              size={18}
              className={passwordStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}
            />
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-700 text-primary uppercase tracking-wider">
                New Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3.5 py-2.5 pr-10 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary"
                >
                  <Icon name={showPass ? 'EyeSlashIcon' : 'EyeIcon'} size={15} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-700 text-primary uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full px-3.5 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-xs font-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Minimum 6 characters. Letters, numbers &amp; symbols allowed.
            </span>
            <button
              type="submit"
              disabled={isSyncing}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-navy-light text-white text-xs font-700 shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Icon name="KeyIcon" size={16} />
              <span>Update Password</span>
            </button>
          </div>
        </form>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-start gap-3">
          <Icon name="ShieldCheckIcon" size={18} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong>Authorized Administrator Emails:</strong>
            <div className="mt-1 flex flex-wrap gap-2">
              {['info@shalomgsolutions.co.uk', 'sgs.london2015@gmail.com', 'digitalbotsolutions@gmail.com', 'rahulbadugu22@gmail.com'].map((em) => (
                <span key={em} className="px-2.5 py-0.5 rounded-full bg-white border border-amber-200 font-mono text-[11px] text-primary">
                  {em}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </DashboardShell>
  );
}
