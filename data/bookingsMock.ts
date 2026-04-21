export interface Booking {
  id: string;
  serviceName: string;
  categoryName: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  date: string;
  time: string;
  price: number;
  providerName?: string;
  address: string;
}

export const BOOKINGS: Booking[] = [
  {
    id: 'BK101',
    serviceName: 'Full Home Deep Cleaning',
    categoryName: 'Home Cleaning',
    status: 'completed',
    date: '2024-03-15',
    time: '10:00 AM',
    price: 3499,
    providerName: 'Rajesh Kumar',
    address: 'C-24, Green Park, New Delhi'
  },
  {
    id: 'BK102',
    serviceName: 'AC Gas Charging',
    categoryName: 'AC Repair',
    status: 'upcoming',
    date: '2024-04-12',
    time: '11:00 AM',
    price: 2499,
    providerName: 'Amit Sharma',
    address: '102, Shanti Kunj, Sector 21, Gurgaon'
  },
  {
    id: 'BK103',
    serviceName: 'Classic Facial',
    categoryName: 'Salon & Spa',
    status: 'cancelled',
    date: '2024-02-28',
    time: '04:00 PM',
    price: 1299,
    address: 'A-41, Vasant Vihar, New Delhi'
  }
];
