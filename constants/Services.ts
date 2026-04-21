export const SERVICES: Record<string, any[]> = {
  'Full Home Deep Cleaning': [
    { id: 's1', name: '1 BHK Deep Cleaning', price: 2999, rating: '4.8', reviews: '1.2k', description: 'Deep cleaning of all rooms, kitchen, and bathroom. Includes floor mopping, window cleaning, and dusting.' },
    { id: 's2', name: '2 BHK Deep Cleaning', price: 3999, rating: '4.9', reviews: '2.5k', description: 'Comprehensive cleaning for 2BHK. High-power vacuuming, chemical cleaning of bathrooms, and kitchen degreasing.' },
    { id: 's3', name: '3 BHK Deep Cleaning', price: 4999, rating: '4.7', reviews: '3.1k', description: 'Complete deep cleaning for 3BHK homes. Professional equipment and eco-friendly chemicals used.' },
  ],
  'Bathroom Cleaning': [
    { id: 's4', name: 'Classic Bathroom Cleaning', price: 499, rating: '4.6', reviews: '5k+', description: 'Deep cleaning of tiles, floor, and standard fittings.' },
    { id: 's5', name: 'Intense Bathroom Cleaning', price: 799, rating: '4.9', reviews: '8k+', description: 'Machine scrub of floors, stain removal from tiles, and sanitization.' },
  ],
  'Switch/Socket Repair': [
    { id: 's6', name: 'Switch/Socket Replacement', price: 149, rating: '4.8', reviews: '10k+', description: 'Replacement of single switch or socket. Exclusive of spare costs.' },
    { id: 's7', name: 'Inverter Configuration', price: 599, rating: '4.9', reviews: '1k+', description: 'Setting up and testing inverter connections.' },
  ],
  'AC Repair & Service': [
    { id: 's8', name: 'AC Power Saver Service', price: 699, rating: '4.9', reviews: '20k+', description: 'Deep cleaning of filters, cooling coils, and drain trays. Improves cooling significantly.' },
    { id: 's9', name: 'AC Gas Charging', price: 2499, rating: '4.7', reviews: '4k+', description: 'Full gas leak test and recharge. Fixed price including labor.' },
  ],
  // Add more as needed, or a generic fallback
};

export const getServicesBySubcategory = (subcategory: string) => {
  return SERVICES[subcategory] || [
    { id: `gen-${subcategory}-1`, name: `${subcategory} Standard Service`, price: 499, rating: '4.5', reviews: '100+', description: 'High quality professional service.' },
    { id: `gen-${subcategory}-2`, name: `${subcategory} Premium Service`, price: 899, rating: '4.8', reviews: '50+', description: 'Extended premium service with extra attention to detail.' },
  ];
};
