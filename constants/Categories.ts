export interface Subcategory {
  title: string;
  icon?: string;
  localIcon?: any;
  image?: any; // Added for the new grid layout
  badge?: string;
  badgeType?: 'sale' | 'time' | 'new';
}

export interface Section {
  title?: string;
  items: Subcategory[];
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
}

export interface Category {
  id: string;
  title: string;
  rating?: number;
  bookingsCount?: string;
  heroImages?: any[];
  offers?: Offer[];
  sections: Section[];
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    title: 'Home Cleaning Services',
    rating: 4.82,
    bookingsCount: '12.4 M',
    heroImages: [
      { uri: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800' },
    ],
    offers: [
      { id: 'o1', title: '40% off above ₹600', subtitle: '20% now, 20% next: SPREE_40', code: 'SPREE_40' },
      { id: 'o2', title: 'Flat ₹100 off', subtitle: 'On your first cleaning: CLEAN100', code: 'CLEAN100' },
    ],
    sections: [
      {
        title: 'Popular Services',
        items: [
          { title: 'Full Home Deep Cleaning', icon: 'home-clean', image: 'https://static.vecteezy.com/system/resources/thumbnails/046/841/849/small/woman-house-cleaning-transparent-free-png.png', badge: 'Best Seller' },
          { title: 'Bathroom Cleaning', icon: 'shower', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ryUDhqlaiF_AJxOhYUIPxAHMVx8XnntVKTokMov-dg9r3j1dtvkpJYSXmFKUdWLdZ8msznVO5dSkywZZzzN3cjk&s&ec=121630504', badge: '4.8 rating' },
          { title: 'Kitchen Cleaning', icon: 'silverware-clean', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1LAbAQ6_sCvMiocfZU9lLaMKUtaLzjDHEjA&s' },
          { title: 'Sofa & Carpet Cleaning', icon: 'sofa', image: 'https://cdn-icons-png.flaticon.com/512/995/995053.png', badge: 'Sale', badgeType: 'sale' },
          { title: 'Water Tank Cleaning', icon: 'water-boiler', image: 'https://cdn-icons-png.flaticon.com/512/995/995053.png' },
          { title: 'Office Cleaning', icon: 'office-building-marker', image: 'https://cdn-icons-png.flaticon.com/512/995/995053.png', badge: 'New', badgeType: 'new' },
        ]
      }
    ],
  },
  {
    id: '2',
    title: 'Salon & Spa Services',
    rating: 4.85,
    bookingsCount: '17.1 M',
    heroImages: [
      { uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800' },
    ],
    offers: [
      { id: 'o1', title: '40% off above ₹600', subtitle: '20% now, 20% next: SPREE_40', code: 'SPREE_40' },
      { id: 'o2', title: '50% off above ₹800', subtitle: 'Professional Glow Mask: GLAM50', code: 'GLAM50' },
    ],
    sections: [
      {
        title: 'Trending at Home',
        items: [
          { title: 'Facial & Cleanup', icon: 'face-woman', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2M4JMYSZCzYX95rR44l38M4pkEshyXK0Dg&s', badge: 'Popular' },
          { title: 'Hair Cut & Styling', icon: 'content-cut', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmor7oP26BWW32ts9CMxHgkHMtLFBRrHuCw&s' },
          { title: 'Hair Spa & Treatment', icon: 'hair-dryer', image: 'https://static.vecteezy.com/system/resources/thumbnails/058/043/921/small/stunning-woman-with-flowing-hair-on-clear-backdrop-png.png', badge: 'New', badgeType: 'new' },
          { title: 'Waxing', icon: 'shimmer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo90EgZTnBdCRT2Ltr-MHRQ9BDp63HoQDOmA&s', badge: 'Top Rated' },
          { title: 'Makeup Services', icon: 'lipstick', image: 'https://static.vecteezy.com/system/resources/thumbnails/035/197/725/small/cosmetics-products-transparent-background-fashion-outfit-profucts-png.png' },
          { title: 'Massage Therapy', icon: 'spa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQluzeBipDFDI5YZsICxPeXBEOezABLen1G1w&s', badge: 'Luxury' },
        ]
      }
    ],
  },
  {
    id: '3',
    title: 'Electrician Services',
    rating: 4.78,
    bookingsCount: '8.2 M',
    heroImages: [
      { uri: 'https://5.imimg.com/data5/SELLER/Default/2024/6/429178565/EC/FF/DY/76226430/electrician-services.jpeg' },
    ],
    offers: [
      { id: 'o1', title: 'Flat ₹50 off', subtitle: 'On your first electrical repair: ELEC50', code: 'ELEC50' },
    ],
    sections: [
      {
        items: [
          { title: 'Electrical Repair', icon: 'power-plug', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Ks4oeV618mHuhdvV9xjq-CWW-l_EWTuqPQ&s', badge: 'Certified' },
          { title: 'Fan Repair', icon: 'fan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTumuDaIautAfR17TpTgVHMnhZBuKSjcGo_nw&s' },
          { title: 'Switch & Socket', icon: 'power-socket-uk', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaX3E3KXkk1HC56kySKjXsroediBHdk-Jk4w&s' },
          { title: 'Inverter Repair', icon: 'battery-check', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSlPqmFh8go6vlReHixkfil89g5_PIV_OhPQ&s', badge: 'Critical' },
        ]
      }
    ],
  },
  {
    id: '4',
    title: 'Plumbing Services',
    rating: 4.8,
    bookingsCount: '9.5 M',
    heroImages: [
      { uri: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800' },
    ],
    sections: [
      {
        items: [
          { title: 'Tap & Shower', icon: 'water-pump', image: 'https://cdn-icons-png.flaticon.com/512/3201/3201509.png', badge: 'Quick' },
          { title: 'Toilet Repair', icon: 'toilet', image: 'https://cdn-icons-png.flaticon.com/512/3201/3201509.png' },
          { title: 'Pipe Leakage', icon: 'pipe-leak', image: 'https://cdn-icons-png.flaticon.com/512/3201/3201509.png', badge: 'Emergency' },
          { title: 'Water Tank', icon: 'water-boiler', image: 'https://cdn-icons-png.flaticon.com/512/3201/3201509.png' },
        ]
      }
    ],
  },
  {
    id: '5',
    title: 'Appliance Repair Services',
    rating: 4.75,
    bookingsCount: '11.0 M',
    heroImages: [
      { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnM9PbepR_LdLtmS5N2IhFNN-W3QwR0c1cjA&s' },
    ],
    sections: [
      {
        title: 'Most Booked',
        items: [
          { title: 'AC Repair & Service', icon: 'air-conditioner', image: 'https://cdn-icons-png.flaticon.com/512/910/910114.png', badge: 'Expert' },
          { title: 'Washing Machine', icon: 'washing-machine', image: 'https://cdn-icons-png.flaticon.com/512/3003/3003984.png' },
          { title: 'Refrigerator Repair', icon: 'fridge-outline', image: 'https://cdn-icons-png.flaticon.com/512/869/869502.png', badge: 'New' },
          { title: 'Water Purifier', icon: 'water-filter', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1jasbJR_BcTOlQODSt0b9uRBmYWrFEEU1A&s' },
          { title: 'Microwave Repair', icon: 'microwave', image: 'https://cdn-icons-png.flaticon.com/512/2160/2160350.png' },
          { title: 'Television Repair', icon: 'television', image: 'https://cdn-icons-png.flaticon.com/512/3075/3075902.png' },
          { title: 'Geyser Repair', icon: 'water-boiler', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1jasbJR_BcTOlQODSt0b9uRBmYWrFEEU1A&s' },
        ]
      }
    ],
  },
  {
    id: '6',
    title: 'Pest Control Services',
    rating: 4.9,
    bookingsCount: '5.2 M',
    sections: [
      {
        title: 'Protection Services',
        items: [
          { title: 'Termite Control', icon: 'bug-check', image: 'https://cdn-icons-png.flaticon.com/512/2800/2800047.png', badge: 'Warranty' },
          { title: 'Cockroach Control', icon: 'bug', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_B6FwV9CyzW3isZGH2mKxleCYglImpdlv1A&s' },
          { title: 'Bed Bug Treatment', icon: 'bed', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVAiZ-f_qGhFBzk9iikTgWw43uuUSU7Qc1GA&s', badge: '90 Days' },
          { title: 'Mosquito Control', icon: 'ebike-light', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9Uu2fhQDvJgi0xTo0d_juyvyY12xcuz1bw&s' },
          { title: 'Rodent Control', icon: 'rodent', image: 'https://cdn-icons-png.flaticon.com/512/2800/2800047.png' },
        ]
      }
    ],
  },
  {
    id: '7',
    title: 'Carpenter Services',
    rating: 4.81,
    bookingsCount: '4.5 M',
    sections: [
      {
        items: [
          { title: 'Furniture Repair', icon: 'hammer-wrench', image: 'https://cdn-icons-png.flaticon.com/512/6134/6134704.png', badge: 'Skillful' },
          { title: 'Door/Window Repair', icon: 'door', image: 'https://cdn-icons-png.flaticon.com/512/6134/6134704.png' },
          { title: 'Modular Furniture Setup', icon: 'wardrobe', image: 'https://cdn-icons-png.flaticon.com/512/6134/6134704.png', badge: 'Premium' },
          { title: 'Custom Woodwork', icon: 'saw-blade', image: 'https://cdn-icons-png.flaticon.com/512/6134/6134704.png' },
        ]
      }
    ],
  },
  {
    id: '8',
    title: 'Painting & Makeover',
    rating: 4.88,
    bookingsCount: '2.1 M',
    sections: [
      {
        items: [
          { title: 'Interior Painting', icon: 'format-paint', image: 'https://cdn-icons-png.flaticon.com/512/2972/2972175.png', badge: 'Popular' },
          { title: 'Exterior Painting', icon: 'home-paint-outline', image: 'https://cdn-icons-png.flaticon.com/512/2972/2972175.png', badge: 'Top Rated' },
          { title: 'Wall Texture', icon: 'texture-box', image: 'https://cdn-icons-png.flaticon.com/512/2972/2972175.png' },
          { title: 'Waterproofing', icon: 'water-check', image: 'https://cdn-icons-png.flaticon.com/512/2972/2972175.png' },
        ]
      }
    ],
  },
  {
    id: '9',
    title: 'Automobile Services',
    rating: 4.72,
    bookingsCount: '6.8 M',
    sections: [
      {
        items: [
          { title: 'Car Repair', icon: 'car-cog', image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png', badge: 'Mechanic' },
          { title: 'Bike Repair', icon: 'motorbike', image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png' },
          { title: 'Car Wash', icon: 'car-wash', image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png', badge: 'Quick' },
          { title: 'Emergency Mechanic', icon: 'tools', image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png', badge: '24/7' },
          { title: 'Battery Jump Start', icon: 'battery-charging', image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png' },
        ]
      }
    ],
  },
  {
    id: '10',
    title: 'Agriculture Services',
    rating: 4.92,
    bookingsCount: '1.2 M',
    sections: [
      {
        items: [
          { title: 'Tractor Services', icon: 'tractor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBhRVjkaBhy2tZcTmwZ6rfA5O-dSY0X7qhtg&s', badge: 'Heavy' },
          { title: 'Crop Spraying', icon: 'spray', image: 'https://png.pngtree.com/png-vector/20240327/ourmid/pngtree-farmer-sprays-pesticide-agriculture-concept-colored-flat-graphic-png-image_12226316.png' },
          { title: 'Harvesting Services', icon: 'reap', image: 'https://png.pngtree.com/png-clipart/20201223/ourmid/pngtree-hand-drawn-harvesting-wheat-awns-planting-and-harvesting-wheat-farmers-png-image_2608164.jpg', badge: 'Seasonal' },
          { title: 'Irrigation Setup', icon: 'sprinkler-variant', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVqw0eVp4oCg2yKRdQgBZQnJkSCB8DCVIPow&s' },
          { title: 'Farming Consultation', icon: 'account-tie-voice', image: 'https://cdn-icons-png.flaticon.com/512/2816/2816694.png', badge: 'Expert' },
        ]
      }
    ],
  },
  {
    id: '11',
    title: 'Healthcare Services',
    rating: 4.95,
    bookingsCount: '3.4 M',
    sections: [
      {
        items: [
          { title: 'Doctor Home Visit', icon: 'doctor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxsaR54P9uNRGRyI20kNtXV79_cTAQYBRfg&s', badge: 'Urgent' },
          { title: 'RMP Doctor Services', icon: 'hospital-marker', image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png' },
          { title: 'First Aid Service', icon: 'medical-bag', image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png', badge: 'Essentials' },
          { title: 'Nursing Care', icon: 'mother-heart', image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png' },
          { title: 'Physiotherapy', icon: 'human-handsup', image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png', badge: 'Certified' },
        ]
      }
    ],
  },
  {
    id: '12',
    title: 'Family Events Services',
    rating: 4.89,
    bookingsCount: '1.8 M',
    sections: [
      {
        items: [
          { title: 'Birthday Planning', icon: 'cake-variant', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png', badge: 'Party' },
          { title: 'Wedding Setup', icon: 'ring', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png' },
          { title: 'Catering Services', icon: 'silverware-fork-knife', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png', badge: 'Best Taste' },
          { title: 'Decoration Services', icon: 'balloon', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png' },
          { title: 'DJ & Sound', icon: 'speaker-multiple', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png', badge: 'High End' },
        ]
      }
    ],
  },
  {
    id: '13',
    title: 'Machinery & Equipment Rental',
    rating: 4.7,
    bookingsCount: '1.1 M',
    sections: [
      {
        items: [
          { title: 'Construction Machinery Rental', icon: 'crane', image: 'https://cdn-icons-png.flaticon.com/512/1063/1063346.png', badge: 'Heavy Duties' },
          { title: 'Agri machinery', icon: 'combine-harvester', image: 'https://cdn-icons-png.flaticon.com/512/1063/1063346.png', badge: 'New' },
          { title: 'JCB / Excavator Rental', icon: 'excavator', image: 'https://cdn-icons-png.flaticon.com/512/1063/1063346.png', badge: 'Available' },
          { title: 'Tools Rental', icon: 'toolbox', image: 'https://cdn-icons-png.flaticon.com/512/1063/1063346.png' },
        ]
      }
    ],
  },
  {
    id: 'men-salon',
    title: "Men's Salon & Massage",
    rating: 4.86,
    bookingsCount: '10.5 M',
    sections: [
      {
        title: 'Hair & Beard',
        items: [
          { title: 'Haircut & Styling', icon: 'content-cut', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnN1mHqHIe3PacT2WjJSXSFWQAiTcU9NRfg&s', badge: 'Expert' },
          { title: 'Beard Grooming / Shave', icon: 'razor-double-edge', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkcvl0HRCFDVfAVUIuHGTfAHkUNPrvlMNrQ&s', badge: 'Certified' },
          { title: 'Hair Color', icon: 'palette', image: 'https://static.vecteezy.com/system/resources/thumbnails/051/689/900/small/faux-hawk-undercut-stylish-men-hair-wig-fashionable-hairstyle-front-view-isolate-on-transparency-background-png.png' },
        ]
      },
      {
        title: 'Skin & Relaxation',
        items: [
          { title: 'Body Massage', icon: 'spa', image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', badge: 'Relaxing' },
          { title: 'Face Care / Cleanup', icon: 'face-man', image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
          { title: 'Hair Spa', icon: 'air-filter', image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        ]
      }
    ],
  }
];
