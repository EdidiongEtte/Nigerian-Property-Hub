import heroImg from '../../assets/hero.jpg';
import living1 from '../../assets/living_1.jpg';
import living2 from '../../assets/living_2.jpg';
import living3 from '../../assets/living_3.jpg';
import apt1 from '../../assets/apartment_1.jpg';
import apt2 from '../../assets/apartment_2.jpg';

export interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  period?: 'month' | 'year'; // For rent
  type: 'rent' | 'sale';
  propertyType: 'Apartment' | 'House' | 'Duplex' | 'Land' | 'Commercial';
  location: {
    address: string;
    area: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    toilets: number;
    sqm?: number;
  };
  images: string[];
  description: string;
  agent: {
    name: string;
    phone: string;
    agency?: string;
    verified: boolean;
  };
  featured?: boolean;
}

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Luxury 4 Bedroom Detached Duplex with BQ',
    price: 150000000,
    currency: '₦',
    type: 'sale',
    propertyType: 'Duplex',
    location: {
      address: 'Admiralty Way',
      area: 'Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.4474,
      lng: 3.4723,
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      toilets: 5,
      sqm: 450,
    },
    images: [heroImg, living1, living2],
    description: 'A beautiful newly built 4 bedroom detached duplex with a boys quarter. Features include a fully fitted kitchen, stamped concrete floor, swimming pool, ample parking space, and modern finishing. Located in a secure and serene estate in Lekki Phase 1.',
    agent: {
      name: 'Adeola Properties',
      phone: '08012345678',
      agency: 'Adeola & Co Real Estate',
      verified: true,
    },
    featured: true,
  },
  {
    id: 'prop-2',
    title: 'Modern 2 Bedroom Serviced Apartment',
    price: 4500000,
    currency: '₦',
    period: 'year',
    type: 'rent',
    propertyType: 'Apartment',
    location: {
      address: 'Adeola Odeku Street',
      area: 'Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.4300,
      lng: 3.4180,
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      toilets: 3,
    },
    images: [apt1, living2],
    description: 'Well finished and serviced 2 bedroom apartment in Victoria Island. 24/7 power supply, top notch security, fitted kitchen, gym, and swimming pool available. Service charge applies.',
    agent: {
      name: 'Chuks Emmanuel',
      phone: '09087654321',
      verified: true,
    },
    featured: true,
  },
  {
    id: 'prop-3',
    title: 'Spacious 5 Bedroom Mansion',
    price: 250000000,
    currency: '₦',
    type: 'sale',
    propertyType: 'House',
    location: {
      address: 'Gana Street',
      area: 'Maitama',
      city: 'Abuja',
      state: 'FCT',
      lat: 9.0833,
      lng: 7.4950,
    },
    features: {
      bedrooms: 5,
      bathrooms: 5,
      toilets: 6,
      sqm: 800,
    },
    images: [heroImg, living3, living1],
    description: 'Luxurious 5 bedroom mansion located in the heart of Maitama. Features lush green areas, large parking space for up to 8 cars, 2 rooms BQ, smart home automation, and top tier security.',
    agent: {
      name: 'Capital Homes',
      phone: '08099887766',
      agency: 'Capital Homes Ltd',
      verified: false,
    },
  },
  {
    id: 'prop-4',
    title: 'Cozy 3 Bedroom Flat for Rent',
    price: 2000000,
    currency: '₦',
    period: 'year',
    type: 'rent',
    propertyType: 'Apartment',
    location: {
      address: 'Tombia Street',
      area: 'GRA Phase 2',
      city: 'Port Harcourt',
      state: 'Rivers',
      lat: 4.8156,
      lng: 7.0050,
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      toilets: 4,
    },
    images: [apt2, living1],
    description: 'Neatly finished 3 bedroom apartment in a serene neighborhood in GRA Phase 2. Prepaid meter, borehole water, security gatehouse, and ample parking space.',
    agent: {
      name: 'Ngozi Properties',
      phone: '07011223344',
      verified: true,
    },
  },
  {
    id: 'prop-5',
    title: 'Contemporary 4 Bedroom Terrace',
    price: 65000000,
    currency: '₦',
    type: 'sale',
    propertyType: 'House',
    location: {
      address: 'Aka Road',
      area: 'Ewet Housing Estate',
      city: 'Uyo',
      state: 'Akwa Ibom',
      lat: 5.0389,
      lng: 7.9095,
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      toilets: 5,
    },
    images: [apt1, living3],
    description: 'Newly built contemporary 4 bedroom terrace house. Features POP ceilings, tiled floors, wardrobe in all rooms, and a fitted kitchen.',
    agent: {
      name: 'Iboms Realtors',
      phone: '08122334455',
      agency: 'Iboms Realtors',
      verified: true,
    },
  },
  {
    id: 'prop-6',
    title: 'Affordable 1 Bedroom Mini Flat',
    price: 800000,
    currency: '₦',
    period: 'year',
    type: 'rent',
    propertyType: 'Apartment',
    location: {
      address: 'Herbert Macaulay Way',
      area: 'Yaba',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.5147,
      lng: 3.3828,
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      toilets: 1,
    },
    images: [apt2, living2],
    description: 'Standard room and parlor self contain (mini flat) in Yaba. Fenced and gated compound, clean water, and accessible road.',
    agent: {
      name: 'Oluwaseun',
      phone: '08055667788',
      verified: false,
    },
  },
];
