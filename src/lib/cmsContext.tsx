'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultCMSContent, CMSContent, ServiceCardItem, ServiceDetailItem } from './cmsData';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface CMSContextType {
  content: CMSContent;
  updateSection: <K extends keyof CMSContent>(section: K, data: CMSContent[K]) => Promise<boolean>;
  resetSection: <K extends keyof CMSContent>(section: K) => Promise<boolean>;
  resetAll: () => Promise<boolean>;
  addService: (card: ServiceCardItem, detail: ServiceDetailItem) => Promise<boolean>;
  updateService: (id: string, card: ServiceCardItem, detail: ServiceDetailItem) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  isLoading: boolean;
  isSyncing: boolean;
  lastSavedAt: string | null;
}

const CMSContext = createContext<CMSContextType>({
  content: defaultCMSContent,
  updateSection: async () => false,
  resetSection: async () => false,
  resetAll: async () => false,
  addService: async () => false,
  updateService: async () => false,
  deleteService: async () => false,
  isLoading: false,
  isSyncing: false,
  lastSavedAt: null,
});

const FIRESTORE_COLLECTION = 'site_content';
const FIRESTORE_DOC = 'main_content';
const LOCAL_STORAGE_KEY = 'shalom_cms_content_v1';
const LOCAL_SAVED_TIME_KEY = 'shalom_cms_last_saved_v1';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CMSContent>(defaultCMSContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // Initialize from LocalStorage first for instant hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        const savedTime = localStorage.getItem(LOCAL_SAVED_TIME_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setContent((prev) => ({ ...prev, ...parsed }));
        }
        if (savedTime) {
          setLastSavedAt(savedTime);
        }
      } catch (e) {
        console.error('Error parsing local CMS content', e);
      }
    }

    // Subscribe to Firestore for real-time live site updates
    let unsubscribe = () => {};
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const remoteData = docSnap.data() as Partial<CMSContent>;
          setContent((prev) => {
            const merged = { ...prev, ...remoteData };
            if (typeof window !== 'undefined') {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
            }
            return merged;
          });
          const time = new Date().toLocaleTimeString();
          setLastSavedAt(time);
          if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_SAVED_TIME_KEY, time);
          }
        }
        setIsLoading(false);
      }, (err) => {
        console.warn('Firestore snapshot notice (Spark offline/rules fallback):', err.message);
        setIsLoading(false);
      });
    } catch (err: any) {
      console.warn('Firestore subscription notice:', err?.message);
      setIsLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const updateSection = async <K extends keyof CMSContent>(
    section: K,
    data: CMSContent[K]
  ): Promise<boolean> => {
    setIsSyncing(true);
    const updatedContent = {
      ...content,
      [section]: data,
    };

    // Optimistic local update
    setContent(updatedContent);
    const nowTime = new Date().toLocaleTimeString();
    setLastSavedAt(nowTime);

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
      localStorage.setItem(LOCAL_SAVED_TIME_KEY, nowTime);
    }

    // Persist to Firestore
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      await setDoc(docRef, updatedContent, { merge: true });
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.warn('Firestore setDoc notice (saved locally as fallback):', err?.message);
      setIsSyncing(false);
      return true;
    }
  };

  const resetSection = async <K extends keyof CMSContent>(section: K): Promise<boolean> => {
    return updateSection(section, defaultCMSContent[section]);
  };

  const resetAll = async (): Promise<boolean> => {
    setIsSyncing(true);
    setContent(defaultCMSContent);
    const nowTime = new Date().toLocaleTimeString();
    setLastSavedAt(nowTime);

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultCMSContent));
      localStorage.setItem(LOCAL_SAVED_TIME_KEY, nowTime);
    }

    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      await setDoc(docRef, defaultCMSContent);
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.warn('Firestore resetDoc notice:', err?.message);
      setIsSyncing(false);
      return true;
    }
  };

  const addService = async (card: ServiceCardItem, detail: ServiceDetailItem): Promise<boolean> => {
    setIsSyncing(true);
    const existingServices = content?.servicesBento?.services || [];
    const rawSlug = card.id || card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const serviceId = rawSlug || `service-${Date.now()}`;
    const updatedCard: ServiceCardItem = { ...card, id: serviceId };

    const updatedServices = existingServices.some((s) => s.id === serviceId)
      ? existingServices.map((s) => (s.id === serviceId ? updatedCard : s))
      : [...existingServices, updatedCard];

    const updatedServiceDetail = {
      ...(content?.serviceDetail || {}),
      [serviceId]: detail,
    };

    const updatedContent: CMSContent = {
      ...content,
      servicesBento: {
        ...content.servicesBento,
        services: updatedServices,
      },
      serviceDetail: updatedServiceDetail,
    };

    setContent(updatedContent);
    const nowTime = new Date().toLocaleTimeString();
    setLastSavedAt(nowTime);

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
      localStorage.setItem(LOCAL_SAVED_TIME_KEY, nowTime);
    }

    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      await setDoc(docRef, updatedContent, { merge: true });
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.warn('Firestore addService notice (saved locally as fallback):', err?.message);
      setIsSyncing(false);
      return true;
    }
  };

  const updateService = async (id: string, card: ServiceCardItem, detail: ServiceDetailItem): Promise<boolean> => {
    setIsSyncing(true);
    const existingServices = content?.servicesBento?.services || [];
    const updatedServices = existingServices.map((s) => (s.id === id ? { ...card, id } : s));
    const updatedServiceDetail = {
      ...(content?.serviceDetail || {}),
      [id]: detail,
    };

    const updatedContent: CMSContent = {
      ...content,
      servicesBento: {
        ...content.servicesBento,
        services: updatedServices,
      },
      serviceDetail: updatedServiceDetail,
    };

    setContent(updatedContent);
    const nowTime = new Date().toLocaleTimeString();
    setLastSavedAt(nowTime);

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
      localStorage.setItem(LOCAL_SAVED_TIME_KEY, nowTime);
    }

    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      await setDoc(docRef, updatedContent, { merge: true });
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.warn('Firestore updateService notice (saved locally as fallback):', err?.message);
      setIsSyncing(false);
      return true;
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    setIsSyncing(true);
    const existingServices = content?.servicesBento?.services || [];
    const updatedServices = existingServices.filter((s) => s.id !== id);
    const updatedServiceDetail = { ...(content?.serviceDetail || {}) };
    delete updatedServiceDetail[id];

    const updatedContent: CMSContent = {
      ...content,
      servicesBento: {
        ...content.servicesBento,
        services: updatedServices,
      },
      serviceDetail: updatedServiceDetail,
    };

    setContent(updatedContent);
    const nowTime = new Date().toLocaleTimeString();
    setLastSavedAt(nowTime);

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
      localStorage.setItem(LOCAL_SAVED_TIME_KEY, nowTime);
    }

    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      await setDoc(docRef, updatedContent, { merge: true });
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.warn('Firestore deleteService notice (saved locally as fallback):', err?.message);
      setIsSyncing(false);
      return true;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        updateSection,
        resetSection,
        resetAll,
        addService,
        updateService,
        deleteService,
        isLoading,
        isSyncing,
        lastSavedAt,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
