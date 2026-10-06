import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed';

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date?: string;
  status?: InquiryStatus;
  estimatedValue?: string;
  createdAt?: any;
}

const LOCAL_INQUIRIES_KEY = 'shalom_live_inquiries_v3';

export async function submitInquiry(
  inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id?: string }> {
  const item: Inquiry = {
    ...inquiry,
    status: 'New',
    date: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  // Cache locally
  if (typeof window !== 'undefined') {
    try {
      const existing: Inquiry[] = JSON.parse(
        localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]'
      );
      const localItem = { ...item, id: 'local_' + Date.now() };
      localStorage.setItem(
        LOCAL_INQUIRIES_KEY,
        JSON.stringify([localItem, ...existing])
      );
    } catch (e) {
      console.error(e);
    }
  }

  // Send Email Notification via API
  try {
    const isStaticHost = typeof window !== 'undefined' && !window.location.hostname.includes('vercel.app') && !window.location.hostname.includes('localhost');
    const endpoint = isStaticHost
      ? 'https://shalomglobalsolutions.vercel.app/api/send-email'
      : (process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/send-email` : '/api/send-email');

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).catch((e) => console.warn('Email notification dispatch error:', e));
  } catch (e) {
    console.warn('Email trigger error:', e);
  }

  // Firestore submission
  try {
    const colRef = collection(db, 'inquiries');
    const docRef = await addDoc(colRef, {
      ...item,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.warn('Firestore addDoc fallback notice:', err?.message);
    return { success: true, id: 'local_saved' };
  }
}

export function subscribeInquiries(callback: (inquiries: Inquiry[]) => void): () => void {
  try {
    const colRef = collection(db, 'inquiries');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Inquiry[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...(d.data() as Omit<Inquiry, 'id'>) });
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(list));
        }
        callback(list);
      },
      (err) => {
        console.warn('Firestore subscription fallback notice:', err.message);
        callback(getFallbackInquiries());
      }
    );
    return unsubscribe;
  } catch (e) {
    callback(getFallbackInquiries());
    return () => {};
  }
}

function getFallbackInquiries(): Inquiry[] {
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(
        localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]'
      );
      return existing;
    } catch (e) {
      console.error(e);
    }
  }
  return [];
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const colRef = collection(db, 'inquiries');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: Inquiry[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...(d.data() as Omit<Inquiry, 'id'>) });
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(list));
    }
    return list;
  } catch (err: any) {
    console.warn('Firestore getDocs fallback notice:', err?.message);
  }

  return getFallbackInquiries();
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const existing: Inquiry[] = JSON.parse(
        localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]'
      );
      const updated = existing.map((i) => (i.id === id ? { ...i, status } : i));
      localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }

  try {
    if (!id.startsWith('local_')) {
      await updateDoc(doc(db, 'inquiries', id), { status });
    }
    return true;
  } catch (err: any) {
    console.warn('Firestore updateDoc fallback notice:', err?.message);
    return true;
  }
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const existing: Inquiry[] = JSON.parse(
        localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]'
      );
      const filtered = existing.filter((i: Inquiry) => i.id !== id);
      localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  }

  try {
    if (!id.startsWith('local_')) {
      await deleteDoc(doc(db, 'inquiries', id));
    }
    return true;
  } catch (err: any) {
    console.warn('Firestore deleteDoc fallback notice:', err?.message);
    return true;
  }
}
