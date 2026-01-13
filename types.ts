import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string; // e.g., "45 min"
  category: 'Hair' | 'Skin' | 'Makeup' | 'Spa';
  image: string;
  popular?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  specialty: string;
}

export interface Booking {
  id: string;
  serviceName: string;
  stylistName: string;
  date: string;
  time: string;
  price: number;
  customerName: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  isMember: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Regular Client"
  text: string;
  avatar: string;
  stars: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}