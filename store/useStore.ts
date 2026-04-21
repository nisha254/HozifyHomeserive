import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Service {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: any;
  rating?: string | number;
  reviews?: string;
  duration?: string;
  originalPrice?: number;
  description?: string;
}

interface AppState {
  cart: Service[];
  addToCart: (service: Omit<Service, 'quantity'>) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  
  // Auth state
  isAuthenticated: boolean;
  user: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    dob?: string;
    gender?: 'Male' | 'Female' | 'Other';
    profilePhoto?: string;
    referral?: string;
    emergencyContact?: {
      name: string;
      phone: string;
    };
  } | null;
  hasCompletedOnboarding: boolean;
  login: (user: any) => void;
  setUser: (user: any) => void;
  logout: () => void;
  completeOnboarding: () => void;
  updateProfile: (profile: Partial<NonNullable<AppState['user']>>) => void;

  // Location/Area state
  location: {
    areaType?: 'urban' | 'rural';
    city?: string;
    area?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
    fullAddress?: string;
    isAutoDetected?: boolean;
  } | null;
  setLocation: (location: AppState['location']) => void;
  injectDemoData: () => void;
  resetStore: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (service) => set((state) => {
        const existing = state.cart.find(s => s.id === service.id);
        if (existing) {
          return { cart: state.cart.map(s => s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s) };
        }
        return { cart: [...state.cart, { ...service, quantity: 1 }] };
      }),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(s => s.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: quantity === 0 
          ? state.cart.filter(s => s.id !== id) 
          : state.cart.map(s => s.id === id ? { ...s, quantity } : s)
      })),
      clearCart: () => set({ cart: [] }),
      cartTotal: () => get().cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      
      isAuthenticated: false,
      user: null,
      hasCompletedOnboarding: false,
      login: (user) => set({ isAuthenticated: true, user: { ...get().user, ...user } }),
      setUser: (user) => set({ user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      updateProfile: (profile) => set((state) => ({ 
        user: state.user ? { ...state.user, ...profile } : profile as any
      })),

      location: null,
      setLocation: (location) => set({ location }),

      injectDemoData: () => set({
          isAuthenticated: true,
          hasCompletedOnboarding: true,
          user: {
              firstName: 'Kanha',
              lastName: 'Meena',
              phone: '8085270415',
              email: 'kanha.meena@hozify.com',
              dob: '1995-05-15',
              gender: 'Male',
              profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
              referral: 'HOZ50',
          },
          location: {
              areaType: 'urban',
              city: 'New Delhi',
              area: 'Green Park',
              district: 'South Delhi',
              state: 'Delhi',
              pincode: '110016',
              fullAddress: 'C-24, Green Park Extension, New Delhi',
              isAutoDetected: true
          },
          cart: []
      }),
      resetStore: () => set({
          cart: [],
          isAuthenticated: false,
          user: null,
          hasCompletedOnboarding: false,
          location: null
      })
    }),
    {
      name: 'hozify-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        cart: state.cart, 
        isAuthenticated: state.isAuthenticated, 
        user: state.user,
        location: state.location,
        hasCompletedOnboarding: state.hasCompletedOnboarding
      }), // only persist these fields
    }
  )
);
