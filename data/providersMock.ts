export interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  specialty: string[];
  bio: string;
  completedJobs: number;
}

export const PROVIDERS: Provider[] = [
  {
    id: 'pro1',
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 1250,
    experience: '8+ Years',
    specialty: ['Deep Cleaning', 'Kitchen Cleaning'],
    bio: 'Punctual and professional expert specializing in residential deep cleaning. I use industry-grade equipment for safe and deep cleaning.',
    completedJobs: 4500
  },
  {
    id: 'pro2',
    name: 'Amit Sharma',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 840,
    experience: '5+ Years',
    specialty: ['AC Repair', 'Electrical'],
    bio: 'Certified appliance technician with expertise in inverter ACs and modular wiring systems.',
    completedJobs: 2100
  },
  {
    id: 'pro3',
    name: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 4.95,
    reviewsCount: 2100,
    experience: '10+ Years',
    specialty: ['Salon', 'Facial', 'Massage'],
    bio: 'Professional beautician with a focus on luxury home spa treatments and organic skincare solutions.',
    completedJobs: 3800
  }
];
