'use client';

import { useEffect } from 'react';
import { app } from '@/lib/firebase';
import { getAnalytics, isSupported } from 'firebase/analytics';

export default function FirebaseAnalytics() {
  useEffect(() => {
    try {
      isSupported()
        .then((supported) => {
          if (supported) {
            try {
              getAnalytics(app);
            } catch (e) {
              // Ignore already-initialized or blocked analytics
            }
          }
        })
        .catch(() => {});
    } catch (e) {
      // Ignore
    }
  }, []);

  return null;
}
