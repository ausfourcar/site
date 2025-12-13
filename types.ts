export interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  transmission: 'Auto' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  seats: number;
  available: boolean;
  featured?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  path: string;
}
