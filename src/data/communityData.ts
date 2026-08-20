import { CommunityPost } from '../types';

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    category: 'Fare',
    countryId: 'nigeria',
    city: 'Lagos',
    locationOrRoute: 'Ojota → Yaba',
    fareAmount: 900,
    currencySymbol: '₦',
    transportMode: 'Danfo',
    text: 'Paid ₦900 just now at Anthony. Conductor is not collecting ₦1000 change so hold exact money.',
    timeAgo: '10 minutes ago',
    timestamp: Date.now() - 10 * 60 * 1000,
    stars: 18,
    confirms: 7,
    comments: [
      { id: 'c1', userName: 'Tunde K.', text: 'Thanks for the headsup on change!', timeAgo: '6m ago' },
      { id: 'c2', userName: 'Amina B.', text: 'Same here, Oshodi leg was ₦350.', timeAgo: '3m ago' }
    ]
  },
  {
    id: 'post-2',
    category: 'Traffic',
    countryId: 'nigeria',
    city: 'Lagos',
    locationOrRoute: 'Oshodi Underbridge',
    transportMode: 'Danfo',
    text: 'Heavy slow-moving traffic towards Mile 2 because of a broken-down trailer right at the interchange.',
    timeAgo: '15 minutes ago',
    timestamp: Date.now() - 15 * 60 * 1000,
    stars: 32,
    confirms: 11,
    comments: [
      { id: 'c3', userName: 'Emeka O.', text: 'LASTMA is already on ground clearing it.', timeAgo: '4m ago' }
    ]
  },
  {
    id: 'post-3',
    category: 'Transport',
    countryId: 'nigeria',
    city: 'Lagos',
    locationOrRoute: 'Yaba BRT Terminal',
    transportMode: 'BRT',
    text: 'Buses are loading rapidly towards Ikorodu now. Normal queue length, roughly 5-7 mins wait time.',
    timeAgo: '24 minutes ago',
    timestamp: Date.now() - 24 * 60 * 1000,
    stars: 14,
    confirms: 9,
    comments: []
  },
  {
    id: 'post-4',
    category: 'Safety',
    countryId: 'nigeria',
    city: 'Lagos',
    locationOrRoute: 'Costain Roundabout',
    text: 'Area is calm and street lights are active. Police patrol vehicle parked near the bus stop.',
    timeAgo: '35 minutes ago',
    timestamp: Date.now() - 35 * 60 * 1000,
    stars: 25,
    confirms: 15,
    comments: [
      { id: 'c4', userName: 'Bisi M.', text: 'Good to know for those doing night transit.', timeAgo: '18m ago' }
    ]
  },
  {
    id: 'post-5',
    category: 'Fare',
    countryId: 'nigeria',
    city: 'Abuja (FCT)',
    locationOrRoute: 'Wuse 2 → Area 1',
    fareAmount: 300,
    currencySymbol: '₦',
    transportMode: 'Along',
    text: 'Standard along price from Banex to Area 1 is still ₦300 for green cabs.',
    timeAgo: '42 minutes ago',
    timestamp: Date.now() - 42 * 60 * 1000,
    stars: 12,
    confirms: 8,
    comments: []
  },
  {
    id: 'post-6',
    category: 'Traffic',
    countryId: 'nigeria',
    city: 'Port Harcourt',
    locationOrRoute: 'Rumuokoro Flyover',
    transportMode: 'Keke',
    text: 'Flyover approach is clear today. Keke queue moving fast towards Choba & Uniport.',
    timeAgo: '48 minutes ago',
    timestamp: Date.now() - 48 * 60 * 1000,
    stars: 17,
    confirms: 10,
    comments: []
  },
  {
    id: 'post-7',
    category: 'Road',
    countryId: 'nigeria',
    city: 'Ibadan',
    locationOrRoute: 'Iwo Road Interchange',
    transportMode: 'Micra',
    text: 'Pothole patch work ongoing near the motor park. Expect brief 5 mins queue.',
    timeAgo: '1 hour ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    stars: 19,
    confirms: 14,
    comments: []
  },
  {
    id: 'post-8',
    category: 'Transport',
    countryId: 'nigeria',
    city: 'Kano',
    locationOrRoute: 'Sabon Gari → Kofar Mata',
    transportMode: 'A Daidaita Sahu',
    text: 'Tricycle operators available at Bata Roundabout. Fares are regular ₦150 per drop.',
    timeAgo: '1 hour ago',
    timestamp: Date.now() - 65 * 60 * 1000,
    stars: 15,
    confirms: 9,
    comments: []
  },
  {
    id: 'post-9',
    category: 'Fare',
    countryId: 'nigeria',
    city: 'Enugu',
    locationOrRoute: 'Holy Ghost → Independence Layout',
    fareAmount: 200,
    currencySymbol: '₦',
    transportMode: 'Keke',
    text: 'Direct keke from Holy Ghost to Government House junction is ₦200.',
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 120 * 60 * 1000,
    stars: 11,
    confirms: 6,
    comments: []
  }
];
