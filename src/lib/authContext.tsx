'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: User | { email: string; uid: string } | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const ADMIN_EMAILS = ['rahulbadugu22@gmail.com', 'sgs.london2015@gmail.com', 'digitalbotsolutions@gmail.com'];
const ADMIN_PASS = '7981255989';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  isAdmin: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { email: string; uid: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local fallback first
    if (typeof window !== 'undefined') {
      const cachedAuth = localStorage.getItem('shalom_admin_auth');
      if (cachedAuth) {
        try {
          const parsed = JSON.parse(cachedAuth);
          if (parsed?.email && ADMIN_EMAILS.includes(parsed.email.toLowerCase())) {
            setUser(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('shalom_admin_auth', JSON.stringify({ email: firebaseUser.email, uid: firebaseUser.uid }));
        }
      } else {
        const cached = typeof window !== 'undefined' ? localStorage.getItem('shalom_admin_auth') : null;
        if (!cached) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check against authorized email
    if (!ADMIN_EMAILS.includes(cleanEmail)) {
      return { success: false, error: 'Unauthorized email address. Only authorized administrators can access this dashboard.' };
    }

    try {
      // 1. Try Firebase Auth sign-in
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      setUser(userCredential.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('shalom_admin_auth', JSON.stringify({ email: userCredential.user.email, uid: userCredential.user.uid }));
      }
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase signIn failed, attempting auto-create or fallback:', err?.code, err?.message);

      // If user is not found in Firebase Auth yet, try creating it automatically
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/invalid-credential') {
        try {
          const newCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
          setUser(newCredential.user);
          if (typeof window !== 'undefined') {
            localStorage.setItem('shalom_admin_auth', JSON.stringify({ email: newCredential.user.email, uid: newCredential.user.uid }));
          }
          return { success: true };
        } catch (createErr: any) {
          console.warn('Firebase createUser failed:', createErr?.message);
        }
      }

      // If direct match with provided credentials, allow access with local admin state
      if (ADMIN_EMAILS.includes(cleanEmail) && cleanPass === ADMIN_PASS) {
        const fallbackAdmin = { email: cleanEmail, uid: 'admin_shalom_' + cleanEmail.split('@')[0] };
        setUser(fallbackAdmin);
        if (typeof window !== 'undefined') {
          localStorage.setItem('shalom_admin_auth', JSON.stringify(fallbackAdmin));
        }
        return { success: true };
      }

      return { success: false, error: err?.message || 'Invalid email or password' };
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.error('Signout error', e);
    }
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shalom_admin_auth');
    }
  };

  const isAdmin = Boolean(user && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
