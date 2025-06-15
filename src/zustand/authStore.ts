import { create } from 'zustand';
import axios from 'axios';
import { getSession, signIn, signOut } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified?: boolean;
  phone?: string;
  institution?: string;

}


interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  verificationStep: 'initial' | 'verification' | 'complete';
  verificationId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    institution: string;
    role: string;
    password: string;
  }) => Promise<void>;
  verifyEmail: (verificationCode: string, userData:{
    fullName: string;
    email: string;
    phone: string;
    institution: string;
    role: string;
    password: string;
  }, verificationId: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  simulateAuthCheck: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  verificationStep: 'initial',
  verificationId: null,

  login: async (email, password) => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    if (res?.error) throw new Error(res.error);
  
    const session = await getSession();
    if (!session || !session.user) throw new Error("Session not found");
  
    const user = session.user as User;
  
    set({
      isAuthenticated: true,
      user,
    });
  
    return user.role; // So component can redirect based on role
  },
  

  logout: async () => {
    await signOut({ redirect: false });
    set({ isAuthenticated: false, user: null });
  },

  register: async ({ fullName, email, phone, institution, role, password }) => {
    try {
      const res = await axios.post('/api/auth/register', {
        fullName,
        email,
        phone,
        institution,
        role,
        password,
      });

      const data = res.data;

      if (data.requiresVerification) {
        set({
          verificationStep: 'verification',
          verificationId: data.verificationId,
        });
        return;
      }

      // If verification not required (unlikely with current setup)
      set({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        verificationStep: 'complete',
      });
      localStorage.setItem('authToken', data.token);
    } catch (error: any) {
      console.error('Register error:', error.response?.data?.error || error.message);
      throw error;
    }
  },

  verifyEmail: async (verificationCode, userData, verificationId,) => {
    try {
      const res = await axios.post('/api/auth/register', {
        verificationCode,
        verificationId,
        ...userData
      });

      const data = res.data;

      set({
        isAuthenticated: true,
        user: { ...data.user, emailVerified: true },
        token: data.token,
        verificationStep: 'complete',
        verificationId: null,
      });

      localStorage.setItem('authToken', data.token);
    } catch (error: any) {
      console.error('Verification error:', error.response?.data?.error || error.message);
      throw error;
    }
  },

  resendVerification: async (email) => {
    try {
      const res = await axios.post('/api/auth/register', { email });
      const data = res.data;

      set({
        verificationId: data.verificationId,
      });
    } catch (error: any) {
      console.error('Resend error:', error.response?.data?.error || error.message);
      throw error;
    }
  },

  simulateAuthCheck: () => {
    setInterval(async () => {
      try {
        const res = await axios.get('/api/auth/session');
        const data = res.data;

        if (data.user && data.token) {
          set({
            isAuthenticated: true,
            user: data.user,
            token: data.token,
          });
          localStorage.setItem('authToken', data.token);
        } else {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            verificationStep: 'initial',
            verificationId: null,
          });
          localStorage.removeItem('authToken');
        }
      } catch {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          verificationStep: 'initial',
          verificationId: null,
        });
        localStorage.removeItem('authToken');
      }
    }, 5000);
  },
}));

export default useAuthStore;