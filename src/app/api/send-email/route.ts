import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, date, isTest, customRecipients, customEnabled } = body;

    // Fetch dynamic email settings from Firestore
    let notificationsEnabled = true;
    // Default recipients requested by client
    const defaultRecipients = ['sgs.london2015@gmail.com', 'digitalbotsolutions@gmail.com'];
    let recipients = process.env.ADMIN_EMAIL_RECIPIENT
      ? process.env.ADMIN_EMAIL_RECIPIENT.split(',').map((s) => s.trim()).filter(Boolean)
      : defaultRecipients;
    if (recipients.length === 0) recipients = defaultRecipients;
    let senderName = 'ShalomGlobal Notifications';
    let subjectPrefix = '🔔 New ShalomGlobal Lead';

    try {
      const docRef = doc(db, 'site_content', 'main_content');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.emailSettings) {
          if (typeof data.emailSettings.notificationsEnabled === 'boolean') {
            notificationsEnabled = data.emailSettings.notificationsEnabled;
          }
          if (Array.isArray(data.emailSettings.recipients) && data.emailSettings.recipients.length > 0) {
            recipients = data.emailSettings.recipients;
          }
          if (data.emailSettings.senderName) {
            senderName = data.emailSettings.senderName;
          }
          if (data.emailSettings.subjectPrefix) {
            subjectPrefix = data.emailSettings.subjectPrefix;
          }
        }
      }
    } catch (firestoreErr) {
      console.warn('Could not read Firestore emailSettings in API, using defaults:', firestoreErr);
    }

    // Overrides from test action or direct payload
    if (customRecipients && Array.isArray(customRecipients) && customRecipients.length > 0) {
      recipients = customRecipients;
    }
    if (typeof customEnabled === 'boolean') {
      notificationsEnabled = customEnabled;
    }

    // Check if notifications are disabled (unless this is a manual test email)
    if (!notificationsEnabled && !isTest) {
      return NextResponse.json({
        success: true,
        skipped: true,
        message: 'Email notifications are currently deactivated in dashboard settings.',
      });
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER || 'zingbiteuk@gmail.com';
    const pass = process.env.SMTP_PASS || 'yyozpzropaysxtah';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
      },
    });

    const emailSubject = isTest
      ? `🧪 Test Notification from ShalomGlobal Admin Portal`
      : `${subjectPrefix}: ${name || 'Customer'} (${service || 'Service Request'})`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #1B263B; padding: 24px 30px; text-align: left; }
          .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; }
          .header p { color: #a0aec0; margin: 4px 0 0 0; font-size: 13px; }
          .badge { display: inline-block; background: ${isTest ? '#3182ce' : '#386641'}; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; }
          .body { padding: 30px; }
          .field { margin-bottom: 16px; }
          .field-label { font-size: 11px; font-weight: 700; color: #718096; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .field-value { font-size: 15px; font-weight: 600; color: #1a202c; }
          .message-box { background: #FAF8F3; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 20px; }
          .footer { background: #f8fafc; padding: 16px 30px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #718096; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">${isTest ? 'System Test' : 'New Customer Lead'}</div>
            <h1>${isTest ? 'Email System Verification' : 'ShalomGlobal Service Inquiry'}</h1>
            <p>${isTest ? 'This is a test notification from your Admin Dashboard.' : 'A new customer has submitted an inquiry through the website.'}</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${name || (isTest ? 'Admin Verification Test' : 'N/A')}</div>
            </div>
            <div class="field">
              <div class="field-label">Service Requested</div>
              <div class="field-value" style="color: #386641;">${service || (isTest ? 'Notification Delivery Test' : 'General Enquiry')}</div>
            </div>
            <div class="field">
              <div class="field-label">Phone Number</div>
              <div class="field-value">${phone ? `<a href="tel:${phone}" style="color: #1B263B; text-decoration: none;">📞 ${phone}</a>` : '07493109832'}</div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value">${email ? `<a href="mailto:${email}" style="color: #1B263B; text-decoration: none;">✉️ ${email}</a>` : 'admin@shalomglobalsolution.co.uk'}</div>
            </div>
            <div class="field">
              <div class="field-label">Submission Date</div>
              <div class="field-value">${date || new Date().toLocaleString('en-GB')}</div>
            </div>
            <div class="message-box">
              <div class="field-label">Message Details:</div>
              <p style="margin: 6px 0 0 0; font-size: 14px; color: #2d3748; line-height: 1.6; white-space: pre-wrap;">${message || (isTest ? 'Your automated mail integration is fully active and working properly! Future customer inquiries will be dispatched directly to all configured recipients.' : 'No additional message provided.')}</p>
            </div>
          </div>
          <div class="footer">
            Delivered to: <strong>${recipients.join(', ')}</strong><br />
            Sent automatically from <strong>ShalomGlobal</strong> via <em>${user}</em>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"${senderName}" <${user}>`,
      to: recipients.join(', '),
      replyTo: email || recipients[0],
      subject: emailSubject,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      deliveredTo: recipients,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('Error sending email notification:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send email notification' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
