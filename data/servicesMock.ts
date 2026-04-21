export interface Service {
  id: string;
  subcategoryId: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  ratingCount: string;
  image: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'ser1',
    subcategoryId: 'sub9',
    name: 'Full Home Deep Cleaning',
    price: 3499,
    originalPrice: 4299,
    duration: '4-6 hrs',
    rating: 4.88,
    ratingCount: '45K',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop',
    description: 'Thorough cleaning of every corner of your home using professional machines and eco-friendly chemicals.',
    inclusions: [
      'Deep cleaning of all rooms',
      'Kitchen degreasing',
      'Bathroom deep cleaning',
      'Floor scrubbing with machine',
      'Window & fan cleaning'
    ],
    exclusions: [
      'Removal of heavy debris',
      'Internal cleaning of cupboards',
      'Sofa shampooing (add-on)'
    ]
  },
  {
    id: 'ser2',
    subcategoryId: 'sub5',
    name: 'AC Gas Charging',
    price: 2499,
    originalPrice: 2999,
    duration: '60-90 min',
    rating: 4.82,
    ratingCount: '120K',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop',
    description: 'Complete leakage check, pressure testing, and precision gas refilling for optimal cooling.',
    inclusions: [
      'Gas pressure check',
      'Leakage repair (minor)',
      'Full gas refilling',
      'Performance testing'
    ],
    exclusions: [
      'Replacement of compressor',
      'PCB repair'
    ]
  },
  {
    id: 'ser3',
    subcategoryId: 'sub1',
    name: 'Classic Facial',
    price: 1299,
    originalPrice: 1599,
    duration: '45 min',
    rating: 4.90,
    ratingCount: '85K',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&auto=format&fit=crop',
    description: 'A relaxing facial using premium products to cleanse, exfoliate, and hydrate your skin for a natural glow.',
    inclusions: [
      'Cleansing',
      'Exfoliation',
      'Massage',
      'Hydrating Mask'
    ],
    exclusions: [
      'Tan removal (add-on)'
    ]
  },
  {
    id: 'ser4',
    subcategoryId: 'sub13',
    name: 'Switchbox Repair',
    price: 199,
    duration: '20 min',
    rating: 4.75,
    ratingCount: '12K',
    image: 'https://images.unsplash.com/photo-1621905252507-b35482cdca4b?q=80&w=400&auto=format&fit=crop',
    description: 'Expert repair or replacement of faulty switches and sockets in your home.',
    inclusions: [
      'Checking connections',
      'Switch replacement',
      'Final safety check'
    ],
    exclusions: [
      'Cost of new switch (if not provided)',
      'Concealed wiring repair'
    ]
  }
];
