export interface Subcategory {
  id: string;
  title: string;
  icon?: string;
  image?: string;
  badge?: string;
  badgeType?: 'sale' | 'time' | 'new';
}

export interface Category {
  id: string;
  title: string;
  rating: number;
  bookingsCount: string;
  image: string;
  heroImage: string;
  subcategories: Subcategory[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'cat1',
    title: 'Women\'s Salon & Spa',
    rating: 4.85,
    bookingsCount: '1.2M+',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      { id: 'sub1', title: 'Facial & Cleanup', icon: 'face-woman', badge: 'Popular' },
      { id: 'sub2', title: 'Manicure & Pedicure', icon: 'hand-water', badge: 'Trending' },
      { id: 'sub3', title: 'Waxing & Threading', icon: 'shimmer' },
      { id: 'sub4', title: 'Hair Care', icon: 'hair-dryer', badge: 'New', badgeType: 'new' },
    ]
  },
  {
    id: 'cat2',
    title: 'AC & Appliance Repair',
    rating: 4.78,
    bookingsCount: '800K+',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1621905252507-b35482cdca4b?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      { id: 'sub5', title: 'AC Service & Repair', icon: 'air-conditioner', badge: 'Bestseller' },
      { id: 'sub6', title: 'Refrigerator Repair', icon: 'fridge' },
      { id: 'sub7', title: 'Washing Machine', icon: 'washing-machine', badge: 'Sale', badgeType: 'sale' },
      { id: 'sub8', title: 'Microwave Repair', icon: 'microwave' },
    ]
  },
  {
    id: 'cat3',
    title: 'Home Cleaning',
    rating: 4.92,
    bookingsCount: '2.5M+',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      { id: 'sub9', title: 'Full Home Cleaning', icon: 'home-clean', badge: 'Warranty' },
      { id: 'sub10', title: 'Bathroom Cleaning', icon: 'shower' },
      { id: 'sub11', title: 'Kitchen Cleaning', icon: 'silverware-clean' },
      { id: 'sub12', title: 'Sofa Cleaning', icon: 'sofa', badge: '40% Off' },
    ]
  },
  {
    id: 'cat4',
    title: 'Electrician & Plumber',
    rating: 4.70,
    bookingsCount: '500K+',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1585713181935-d5f622cc2415?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      { id: 'sub13', title: 'Switch & Socket', icon: 'toggle-switch' },
      { id: 'sub14', title: 'Fan & Light', icon: 'fan', badge: 'Quick' },
      { id: 'sub15', title: 'Tap & Mixer', icon: 'water-pump' },
      { id: 'sub16', title: 'Toilet Repair', icon: 'toilet' },
    ]
  }
];
