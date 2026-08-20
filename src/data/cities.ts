import { CountryConfig, CityConfig, TransportModeConfig } from '../types';

export const NIGERIAN_TRANSPORT_MODES: TransportModeConfig[] = [
  { id: 'Danfo', name: 'Danfo', localName: 'Commercial Yellow/Striped Minibus', icon: '🚐', description: 'Standard commercial minibus for city routes' },
  { id: 'Keke', name: 'Keke', localName: 'Keke Marwa / Tricycle', icon: '🛺', description: '3-wheeled auto rickshaw for short-to-medium hops' },
  { id: 'BRT', name: 'BRT', localName: 'Bus Rapid Transit', icon: '🚌', description: 'High capacity regulated dedicated lane buses' },
  { id: 'Okada', name: 'Okada', localName: 'Commercial Motorcycle', icon: '🏍️', description: 'Motorcycle taxi for inner streets and quick connections' },
  { id: 'Along', name: 'Along', localName: 'Shared Car Taxi', icon: '🚗', description: 'Shared route cab picking commuters heading same direction' },
  { id: 'Micra', name: 'Micra', localName: 'Micra Taxi', icon: '🚘', description: 'Compact saloon cab popular in Western Nigerian cities' },
  { id: 'Coaster', name: 'Coaster', localName: 'Mid-sized Bus', icon: '🚍', description: '30-seater express buses on inter-district corridors' },
  { id: 'Taxi', name: 'Taxi', localName: 'Drop / City Cab', icon: '🚕', description: 'Private hire or dedicated city taxi' },
  { id: 'Ferry', name: 'Ferry', localName: 'Water Transit Boat', icon: '⛴️', description: 'Waterways passenger ferry service' },
  { id: 'A Daidaita Sahu', name: 'A Daidaita Sahu', localName: 'Kano Tricycle', icon: '🛺', description: 'Regulated tricycle transit in Northern Nigeria' },
  { id: 'Walk', name: 'Walk', localName: 'Foot Transfer', icon: '🚶', description: 'Walking connection between transit points' },
];

export const GHANA_TRANSPORT_MODES: TransportModeConfig[] = [
  { id: 'Tro Tro', name: 'Tro Tro', localName: 'Shared Minibus', icon: '🚐', description: 'Popular shared minibus across Ghana' },
  { id: 'Shared Taxi', name: 'Shared Taxi', localName: 'Station Cab', icon: '🚗', description: 'Station-based shared taxi' },
  { id: 'Bus', name: 'Aayalolo / Metro Mass', localName: 'City Transit Bus', icon: '🚌', description: 'Regulated public mass transit buses' },
  { id: 'Pragya', name: 'Pragya', localName: 'Tricycle', icon: '🛺', description: 'Commercial 3-wheeler' },
  { id: 'Okada', name: 'Okada', localName: 'Motorbike Taxi', icon: '🏍️', description: 'Two-wheeler motorbike taxi' },
  { id: 'Walk', name: 'Walk', localName: 'Foot Transfer', icon: '🚶', description: 'Walking connection between boarding points' },
];

export const KENYA_TRANSPORT_MODES: TransportModeConfig[] = [
  { id: 'Matatu', name: 'Matatu', localName: 'Shared Minibus', icon: '🚐', description: 'Iconic public minibus transport across Kenya' },
  { id: 'Boda Boda', name: 'Boda Boda', localName: 'Motorbike Taxi', icon: '🏍️', description: 'Motorcycle taxi for flexible neighborhood hops' },
  { id: 'Tuk Tuk', name: 'Tuk Tuk', localName: 'Auto Rickshaw', icon: '🛺', description: 'Three-wheel commercial taxi' },
  { id: 'Bus', name: 'City Bus', localName: 'Metro Bus', icon: '🚌', description: 'Scheduled municipal city buses' },
  { id: 'Walk', name: 'Walk', localName: 'Foot Transfer', icon: '🚶', description: 'Walking connection between stages' },
];

export const RWANDA_TRANSPORT_MODES: TransportModeConfig[] = [
  { id: 'Coaster Bus', name: 'Coaster Bus', localName: 'Express Minibus', icon: '🚍', description: 'Smart-card enabled public city buses' },
  { id: 'Moto', name: 'Moto', localName: 'Motorcycle Taxi', icon: '🏍️', description: 'Helmeted commercial motorbike service' },
  { id: 'Taxi', name: 'Taxi Voitures', localName: 'Cab Taxi', icon: '🚕', description: 'Registered metered city cabs' },
  { id: 'Walk', name: 'Walk', localName: 'Foot Transfer', icon: '🚶', description: 'Walking connection' },
];

export const COUNTRIES_DATA: CountryConfig[] = [
  {
    id: 'nigeria',
    name: 'Nigeria',
    code: 'NG',
    currency: 'NGN',
    currencySymbol: '₦',
    flag: '🇳🇬',
    isPrimaryMarket: true,
    emergencyNumbers: [
      { label: 'National Emergency Toll-Free', number: '112' },
      { label: 'Police Force Distress Line', number: '08031230112' },
      { label: 'FRSC Road Safety Rescue', number: '122' },
    ],
    availableModes: NIGERIAN_TRANSPORT_MODES,
    cities: [
      {
        id: 'lagos',
        name: 'Lagos',
        state: 'Lagos State',
        countryId: 'nigeria',
        popularJunctions: [
          'Ojota',
          'Yaba',
          'Oshodi',
          'Anthony',
          'Ikeja (Under Bridge)',
          'CMS / Marina',
          'Berger',
          'Obalende',
          'Lekki Phase 1',
          'Ajah',
          'Ikorodu Garage',
          'Agege Pen Cinema',
          'Costain',
          'Mile 2',
          'Surulere (National Stadium)',
          'Victoria Island (Eko Hotel)'
        ],
        popularRoutes: [
          { from: 'Ojota', to: 'Yaba' },
          { from: 'Ikeja', to: 'Lekki Phase 1' },
          { from: 'Oshodi', to: 'CMS' },
          { from: 'Berger', to: 'Obalende' },
          { from: 'Ikorodu', to: 'CMS' },
          { from: 'CMS', to: 'Ajah' }
        ],
        availableModes: ['Danfo', 'BRT', 'Keke', 'Okada', 'Taxi', 'Ferry', 'Walk'],
        emergencyNumbers: [
          { label: 'Lagos Emergency Line', number: '112' },
          { label: 'Lagos Emergency Dispatch', number: '767' },
          { label: 'LASTMA Traffic Control', number: '080000527862' },
          { label: 'Police Rapid Response (RRS)', number: '09053950347' }
        ],
        localDialectTip: 'Remember to call "Owa o" or "... wa o" before your junction.'
      },
      {
        id: 'abuja',
        name: 'Abuja (FCT)',
        state: 'Federal Capital Territory',
        countryId: 'nigeria',
        popularJunctions: [
          'Wuse Market',
          'Wuse 2 (Banex)',
          'Area 1 Roundabout',
          'Federal Secretariat',
          'Gwarinpa (First Gate)',
          'Kubwa (Federal Housing)',
          'Airport Junction',
          'Maitama (Transcorp)',
          'Lugbe (Federal Housing)',
          'Mararaba / Nyanya',
          'Jabi Motor Park',
          'Utako Market'
        ],
        popularRoutes: [
          { from: 'Wuse 2', to: 'Area 1' },
          { from: 'Gwarinpa', to: 'Federal Secretariat' },
          { from: 'Kubwa', to: 'Wuse Market' },
          { from: 'Lugbe', to: 'Area 1' },
          { from: 'Jabi', to: 'Maitama' }
        ],
        availableModes: ['Along', 'Taxi', 'Coaster', 'BRT', 'Keke', 'Walk'],
        emergencyNumbers: [
          { label: 'Abuja Emergency Control', number: '112' },
          { label: 'FCT Police Emergency', number: '08032003913' },
          { label: 'FRSC Rescue Line', number: '122' }
        ],
        localDialectTip: 'Flag green cabs shouting "Along" or specify your landmark.'
      },
      {
        id: 'portharcourt',
        name: 'Port Harcourt',
        state: 'Rivers State',
        countryId: 'nigeria',
        popularJunctions: [
          'Rumuokoro Flyover',
          'Garrison Junction',
          'Mile 1 Market (Diobu)',
          'Choba (Uniport Gate)',
          'Artillery Junction',
          'Waterlines Bus Stop',
          'Oil Mill Market',
          'Rumuola',
          'Borokiri Sandfilled',
          'Aggrey Road',
          'Eleme Junction',
          'Woji Junction'
        ],
        popularRoutes: [
          { from: 'Choba', to: 'Mile 1 Market' },
          { from: 'Rumuokoro', to: 'Garrison' },
          { from: 'Artillery', to: 'Waterlines' },
          { from: 'Oil Mill', to: 'Mile 1' },
          { from: 'Rumuola', to: 'Borokiri' }
        ],
        availableModes: ['Keke', 'Taxi', 'Danfo', 'Along', 'Ferry', 'Walk'],
        emergencyNumbers: [
          { label: 'Rivers Emergency Response', number: '112' },
          { label: 'Police Distress Line', number: '08032003514' }
        ],
        localDialectTip: 'Mention specific flyover side (Rumuokoro or Garrison underbridge).'
      },
      {
        id: 'ibadan',
        name: 'Ibadan',
        state: 'Oyo State',
        countryId: 'nigeria',
        popularJunctions: [
          'UI (University of Ibadan Gate)',
          'Bodija Market',
          'Iwo Road Interchange',
          'Dugbe (Cocoa House)',
          'Mokola Roundabout',
          'Challenge Bus Stop',
          'Ojoo Terminal',
          'Sango',
          'Gate / Agodi',
          'Eleyele Water Works',
          'Apata',
          'Ring Road'
        ],
        popularRoutes: [
          { from: 'UI Gate', to: 'Dugbe' },
          { from: 'Bodija', to: 'Iwo Road' },
          { from: 'Challenge', to: 'Mokola' },
          { from: 'Ojoo', to: 'UI Gate' },
          { from: 'Dugbe', to: 'Challenge' }
        ],
        availableModes: ['Micra', 'Danfo', 'Keke', 'Okada', 'Taxi', 'Walk'],
        emergencyNumbers: [
          { label: 'Oyo State Emergency', number: '615' },
          { label: 'Police Control Room', number: '08081768614' }
        ],
        localDialectTip: 'Micra taxis load 2 in front, 4 at the back.'
      },
      {
        id: 'kano',
        name: 'Kano',
        state: 'Kano State',
        countryId: 'nigeria',
        popularJunctions: [
          'Sabon Gari Market',
          'Kofar Mata',
          'BUK New Site',
          'BUK Old Site',
          'Bata Roundabout',
          'Post Office Road',
          'Kasuwar Kurmi',
          'Fagge',
          'Nasarawa GRA',
          'Dawanau Grain Market',
          'Yankaba Market',
          'Zoo Road'
        ],
        popularRoutes: [
          { from: 'Sabon Gari', to: 'Kofar Mata' },
          { from: 'BUK New Site', to: 'Bata Roundabout' },
          { from: 'Post Office', to: 'Kasuwar Kurmi' },
          { from: 'Zoo Road', to: 'Sabon Gari' }
        ],
        availableModes: ['A Daidaita Sahu', 'Taxi', 'Danfo', 'Okada', 'Walk'],
        emergencyNumbers: [
          { label: 'Kano State Emergency', number: '112' },
          { label: 'Kano Police Control', number: '08032419754' }
        ],
        localDialectTip: 'A Daidaita Sahu is the primary citywide tricycle service.'
      },
      {
        id: 'kaduna',
        name: 'Kaduna',
        state: 'Kaduna State',
        countryId: 'nigeria',
        popularJunctions: [
          'Kawo Bridge',
          'Central Market (Sheikh Gumi)',
          'Station Roundabout',
          'Barnawa Complex',
          'Stadium Roundabout',
          'Command Junction',
          'Tudun Wada',
          'Mando Motor Park',
          'Sabon Tasha',
          'Kasupda Junction'
        ],
        popularRoutes: [
          { from: 'Kawo', to: 'Central Market' },
          { from: 'Barnawa', to: 'Station Roundabout' },
          { from: 'Sabon Tasha', to: 'Central Market' },
          { from: 'Mando', to: 'Kawo' }
        ],
        availableModes: ['Keke', 'Taxi', 'Danfo', 'Along', 'Walk'],
        emergencyNumbers: [
          { label: 'Kaduna Emergency Line', number: '112' },
          { label: 'Kaduna Police Control', number: '08075391105' }
        ]
      },
      {
        id: 'enugu',
        name: 'Enugu',
        state: 'Enugu State',
        countryId: 'nigeria',
        popularJunctions: [
          'Holy Ghost Park',
          'Independence Layout',
          'Abakpa Nike',
          'Ogui Road',
          'New Haven (Chime Ave)',
          'Polo Park Mall',
          'Gariki Market',
          'Otigba Junction',
          'Old Park',
          'NOWAS Junction',
          'Emene Junction'
        ],
        popularRoutes: [
          { from: 'Holy Ghost', to: 'Independence Layout' },
          { from: 'Abakpa', to: 'Ogui Road' },
          { from: 'New Haven', to: 'Gariki' },
          { from: 'Gariki', to: 'Holy Ghost' }
        ],
        availableModes: ['Keke', 'Danfo', 'Taxi', 'Along', 'Walk'],
        emergencyNumbers: [
          { label: 'Enugu Emergency Line', number: '112' },
          { label: 'Police Quick Response', number: '08032003702' }
        ]
      },
      {
        id: 'benincity',
        name: 'Benin City',
        state: 'Edo State',
        countryId: 'nigeria',
        popularJunctions: [
          'Ring Road (King Square)',
          'Ugbowo (UNIBEN Main Gate)',
          'Ramash Park',
          'New Benin Market',
          'Ikpoba Hill',
          'Aduwawa',
          'Airport Road',
          'Sapele Road',
          'Upper Sakponba',
          'Oluku Junction'
        ],
        popularRoutes: [
          { from: 'Ugbowo', to: 'Ring Road' },
          { from: 'New Benin', to: 'Ikpoba Hill' },
          { from: 'Ring Road', to: 'Airport Road' },
          { from: 'Upper Sakponba', to: 'Ring Road' }
        ],
        availableModes: ['Danfo', 'Keke', 'Taxi', 'Okada', 'Walk'],
        emergencyNumbers: [
          { label: 'Edo Emergency Desk', number: '112' },
          { label: 'Police Control Line', number: '08037646272' }
        ]
      },
      {
        id: 'onitsha',
        name: 'Onitsha',
        state: 'Anambra State',
        countryId: 'nigeria',
        popularJunctions: [
          'Upper Iweka Interchange',
          'Main Market',
          'Head Bridge',
          'Borromeo Roundabout',
          'Awka Road',
          'Old Market Road',
          '3-3 Junction',
          'Fegge',
          'Ochanja Market',
          'Nkpor Junction'
        ],
        popularRoutes: [
          { from: 'Upper Iweka', to: 'Main Market' },
          { from: 'Borromeo', to: 'Upper Iweka' },
          { from: 'Nkpor', to: 'Head Bridge' },
          { from: '3-3', to: 'Main Market' }
        ],
        availableModes: ['Keke', 'Danfo', 'Along', 'Taxi', 'Okada', 'Walk'],
        emergencyNumbers: [
          { label: 'Anambra Emergency Line', number: '112' },
          { label: 'Anambra Police Distress', number: '07039194332' }
        ]
      },
      {
        id: 'aba',
        name: 'Aba',
        state: 'Abia State',
        countryId: 'nigeria',
        popularJunctions: [
          'Ariaria International Market',
          'Bata Junction',
          'Main Park (Milverton)',
          'Brass Junction (Faulks Road)',
          'Flyover (Osisioma)',
          'Ahia Ohuru (New Market)',
          'Port Harcourt Road Junction',
          'Opobo Junction',
          'Ogbor Hill'
        ],
        popularRoutes: [
          { from: 'Osisioma', to: 'Ariaria Market' },
          { from: 'Bata', to: 'Brass Junction' },
          { from: 'Milverton', to: 'Ogbor Hill' },
          { from: 'Ariaria', to: 'Ahia Ohuru' }
        ],
        availableModes: ['Keke', 'Danfo', 'Taxi', 'Along', 'Walk'],
        emergencyNumbers: [
          { label: 'Abia Emergency Line', number: '112' },
          { label: 'Police Quick Response', number: '08035415406' }
        ]
      },
      {
        id: 'owerri',
        name: 'Owerri',
        state: 'Imo State',
        countryId: 'nigeria',
        popularJunctions: [
          'Control Post Roundabout',
          'Wetheral Road Junction',
          'Douglas Road (Main Market)',
          'IMSG / Government House',
          'IMSU Roundabout',
          'Orji Flyover',
          'Nekede (Polytechnic Gate)',
          'Relief Market',
          'World Bank Roundabout',
          'Irete Industrial Layout'
        ],
        popularRoutes: [
          { from: 'Control Post', to: 'Wetheral' },
          { from: 'IMSU Gate', to: 'Douglas Road' },
          { from: 'Nekede', to: 'Relief Market' },
          { from: 'World Bank', to: 'Control Post' }
        ],
        availableModes: ['Keke', 'Taxi', 'Danfo', 'Along', 'Walk'],
        emergencyNumbers: [
          { label: 'Imo Emergency Line', number: '112' },
          { label: 'Imo Police Hotline', number: '08034773600' }
        ]
      },
      {
        id: 'uyo',
        name: 'Uyo',
        state: 'Akwa Ibom State',
        countryId: 'nigeria',
        popularJunctions: [
          'Plaza (Ibom Connection)',
          'Itam Peace Park',
          'Uniuyo Town Campus Gate',
          'Oron Road (Airport Junction)',
          'Ikpa Road',
          'Abak Road Roundabout',
          'Nwaniba Water Fountain',
          'Tropicana Complex',
          'Use Offot Junction'
        ],
        popularRoutes: [
          { from: 'Itam Peace Park', to: 'Ibom Plaza' },
          { from: 'Uniuyo Gate', to: 'Oron Road' },
          { from: 'Abak Road', to: 'Ibom Plaza' },
          { from: 'Plaza', to: 'Tropicana' }
        ],
        availableModes: ['Keke', 'Taxi', 'Danfo', 'Along', 'Walk'],
        emergencyNumbers: [
          { label: 'Akwa Ibom Emergency', number: '112' },
          { label: 'State Police Command', number: '08039213071' }
        ]
      },
      {
        id: 'calabar',
        name: 'Calabar',
        state: 'Cross River State',
        countryId: 'nigeria',
        popularJunctions: [
          'Watt Market Roundabout',
          'Marian Road (Ika Ika Oqua)',
          'Unical Main Gate (Etta Agbor)',
          'Mary Slessor Roundabout',
          '8 Miles Interchange',
          'EPZ Roundabout',
          'Murtala Mohammed Highway',
          'Goldie Street',
          'Anantigha (Local Govt HQ)'
        ],
        popularRoutes: [
          { from: 'Watt Market', to: 'Marian Road' },
          { from: 'Unical Gate', to: 'Mary Slessor' },
          { from: '8 Miles', to: 'Watt Market' },
          { from: 'Marian', to: 'Goldie Street' }
        ],
        availableModes: ['Taxi', 'Keke', 'Danfo', 'Okada', 'Walk'],
        emergencyNumbers: [
          { label: 'Cross River Emergency', number: '112' },
          { label: 'Police Quick Action', number: '08133568456' }
        ]
      },
      {
        id: 'jos',
        name: 'Jos',
        state: 'Plateau State',
        countryId: 'nigeria',
        popularJunctions: [
          'Terminus Market',
          'British America Junction',
          'Old Airport Junction',
          'Unijos Permanent Site Gate',
          'Bauchi Road Motor Park',
          'Bukuru Lowcost',
          'Secretariat Flyover',
          'Rayfield Resort Junction',
          'Farin Gada',
          'Tudun Wada'
        ],
        popularRoutes: [
          { from: 'Terminus', to: 'Old Airport' },
          { from: 'Unijos Gate', to: 'Terminus' },
          { from: 'British America', to: 'Bukuru' },
          { from: 'Farin Gada', to: 'Secretariat' }
        ],
        availableModes: ['Keke', 'Taxi', 'Along', 'Danfo', 'Walk'],
        emergencyNumbers: [
          { label: 'Plateau Emergency Desk', number: '112' },
          { label: 'Plateau Police Hotline', number: '08126375938' }
        ]
      },
      {
        id: 'ilorin',
        name: 'Ilorin',
        state: 'Kwara State',
        countryId: 'nigeria',
        popularJunctions: [
          'Post Office Roundabout',
          'Unilorin PS Gate (Tanke)',
          'Taiwo Road',
          'Challenge Junction',
          'Maraba Motor Park',
          'Geri Alimi Diamond Split',
          'Offa Garage',
          'Oja Oba (Emir Palace)',
          'Fate Road',
          'Gambari Junction'
        ],
        popularRoutes: [
          { from: 'Post Office', to: 'Unilorin Gate (Tanke)' },
          { from: 'Maraba', to: 'Taiwo Road' },
          { from: 'Offa Garage', to: 'Post Office' },
          { from: 'Geri Alimi', to: 'Oja Oba' }
        ],
        availableModes: ['Keke', 'Taxi', 'Danfo', 'Okada', 'Walk'],
        emergencyNumbers: [
          { label: 'Kwara Emergency Line', number: '112' },
          { label: 'Kwara Police Control', number: '09033871111' }
        ]
      },
      {
        id: 'akure',
        name: 'Akure',
        state: 'Ondo State',
        countryId: 'nigeria',
        popularJunctions: [
          'Oja Oba (Deji Palace)',
          'FUTA South Gate',
          'FUTA North Gate',
          'Cathedral Roundabout',
          'Oluwatuyi Roundabout',
          'Alagbaka (State Secretariat)',
          'Arakale Market Road',
          'Oyemekun Road',
          'Shagari Village Junction',
          'Oda Road'
        ],
        popularRoutes: [
          { from: 'Oja Oba', to: 'FUTA South Gate' },
          { from: 'Cathedral', to: 'Alagbaka' },
          { from: 'Arakale', to: 'Oluwatuyi' },
          { from: 'FUTA North', to: 'Cathedral' }
        ],
        availableModes: ['Taxi', 'Keke', 'Okada', 'Danfo', 'Walk'],
        emergencyNumbers: [
          { label: 'Ondo Emergency Line', number: '112' },
          { label: 'Police Quick Intervention', number: '07034313903' }
        ]
      },
      {
        id: 'abeokuta',
        name: 'Abeokuta',
        state: 'Ogun State',
        countryId: 'nigeria',
        popularJunctions: [
          'Panseke Roundabout',
          'Itoku Market (Adire Arcade)',
          'Kuto Motor Park',
          'Sapon Overhead Bridge',
          'FUNAAB Camp Gate',
          'Lafenwa Bridge / Market',
          'Omida Market',
          'Ibara Roundabout',
          'Asero Motor Park',
          'Oke-Mosan (Govt Secretariat)'
        ],
        popularRoutes: [
          { from: 'Panseke', to: 'FUNAAB Camp Gate' },
          { from: 'Kuto', to: 'Itoku Market' },
          { from: 'Lafenwa', to: 'Sapon' },
          { from: 'Ibara', to: 'Oke-Mosan' }
        ],
        availableModes: ['Taxi', 'Keke', 'Micra', 'Danfo', 'Okada', 'Walk'],
        emergencyNumbers: [
          { label: 'Ogun Emergency Line', number: '112' },
          { label: 'TRACE Traffic Corps', number: '08034062142' },
          { label: 'Police Control Room', number: '08081770416' }
        ]
      },
      {
        id: 'adoekiti',
        name: 'Ado-Ekiti',
        state: 'Ekiti State',
        countryId: 'nigeria',
        popularJunctions: [
          'Fajuyi Park & Pavilion',
          'EKSU Main Gate (Iworoko)',
          'Post Office Roundabout',
          'Oja Bisi Market',
          'Ajilosun (Old Garage)',
          'Basiri / Adebayo Road',
          'Irona Market',
          'Federal Poly Gate',
          'Ilawe Road Roundabout',
          'Okeyinmi'
        ],
        popularRoutes: [
          { from: 'Fajuyi Park', to: 'EKSU Gate' },
          { from: 'Post Office', to: 'Federal Poly Gate' },
          { from: 'Ajilosun', to: 'Fajuyi Park' },
          { from: 'Oja Bisi', to: 'Adebayo Road' }
        ],
        availableModes: ['Taxi', 'Keke', 'Okada', 'Danfo', 'Walk'],
        emergencyNumbers: [
          { label: 'Ekiti Emergency Desk', number: '112' },
          { label: 'Ekiti Police Command', number: '08062335577' }
        ]
      }
    ]
  },
  {
    id: 'ghana',
    name: 'Ghana',
    code: 'GH',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    flag: '🇬🇭',
    isPrimaryMarket: false,
    emergencyNumbers: [
      { label: 'National Emergency Line', number: '112' },
      { label: 'Ghana Police Dispatch', number: '191' },
      { label: 'Fire & Rescue Service', number: '192' }
    ],
    availableModes: GHANA_TRANSPORT_MODES,
    cities: [
      {
        id: 'accra',
        name: 'Accra',
        state: 'Greater Accra',
        countryId: 'ghana',
        popularJunctions: [
          'Madina Zongo Junction',
          'Kwame Nkrumah Circle',
          'Kaneshie Market',
          '37 Military Hospital',
          'Lapaz (Under Bridge)',
          'Tema Station (Accra Central)',
          'Achimota Overhead',
          'Legon (University of Ghana Gate)',
          'Osu (Oxford Street)',
          'Spintex Road Junction'
        ],
        popularRoutes: [
          { from: 'Madina', to: 'Circle' },
          { from: 'Lapaz', to: 'Kaneshie' },
          { from: 'Tema Station', to: 'Legon Gate' },
          { from: '37 Hospital', to: 'Osu' }
        ],
        availableModes: ['Tro Tro', 'Shared Taxi', 'Bus', 'Okada', 'Walk'],
        emergencyNumbers: [
          { label: 'Accra Police Emergency', number: '191' },
          { label: 'Accra Ambulance Service', number: '193' }
        ],
        localDialectTip: 'Tro Tro mate collects fare before you alight.'
      },
      {
        id: 'kumasi',
        name: 'Kumasi',
        state: 'Ashanti Region',
        countryId: 'ghana',
        popularJunctions: [
          'Kejetia Market Complex',
          'KNUST Main Gate',
          'Adum Central',
          'Suame Roundabout',
          'Asafo Interchange',
          'Tech Junction',
          'Santasi Roundabout',
          'Anloga Junction'
        ],
        popularRoutes: [
          { from: 'Kejetia', to: 'KNUST Gate' },
          { from: 'Suame', to: 'Adum Central' },
          { from: 'Asafo', to: 'Tech Junction' }
        ],
        availableModes: ['Tro Tro', 'Shared Taxi', 'Pragya', 'Walk'],
        emergencyNumbers: [
          { label: 'Kumasi Police Dispatch', number: '191' }
        ]
      }
    ]
  },
  {
    id: 'kenya',
    name: 'Kenya',
    code: 'KE',
    currency: 'KES',
    currencySymbol: 'KSh',
    flag: '🇰🇪',
    isPrimaryMarket: false,
    emergencyNumbers: [
      { label: 'National Emergency Line', number: '999' },
      { label: 'Kenya Police Service', number: '112' }
    ],
    availableModes: KENYA_TRANSPORT_MODES,
    cities: [
      {
        id: 'nairobi',
        name: 'Nairobi',
        state: 'Nairobi County',
        countryId: 'kenya',
        popularJunctions: [
          'CBD (Kencom / Ambassadeur)',
          'Westlands Stage',
          'Upper Hill Junction',
          'Eastleigh (First Avenue)',
          'Ngong Road (City Mortuary)',
          'Thika Road Mall (TRM)',
          'Githurai 45 Stage',
          'Kibera DC',
          'Kenyatta National Hospital'
        ],
        popularRoutes: [
          { from: 'CBD Kencom', to: 'Westlands' },
          { from: 'Eastleigh', to: 'CBD' },
          { from: 'Githurai 45', to: 'CBD' },
          { from: 'Ngong Road', to: 'Upper Hill' }
        ],
        availableModes: ['Matatu', 'Boda Boda', 'Bus', 'Tuk Tuk', 'Walk'],
        emergencyNumbers: [
          { label: 'Nairobi Police Control', number: '999' }
        ],
        localDialectTip: 'Check matatu route number (SACCO) at boarding stage.'
      }
    ]
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    code: 'RW',
    currency: 'RWF',
    currencySymbol: 'FRw',
    flag: '🇷🇼',
    isPrimaryMarket: false,
    emergencyNumbers: [
      { label: 'National Emergency Toll-Free', number: '112' },
      { label: 'Traffic Police Helpline', number: '113' }
    ],
    availableModes: RWANDA_TRANSPORT_MODES,
    cities: [
      {
        id: 'kigali',
        name: 'Kigali',
        state: 'Kigali City',
        countryId: 'rwanda',
        popularJunctions: [
          'Nyabugogo Bus Terminal',
          'Downtown Kigali (CBD)',
          'Remera (Giporoso)',
          'Kimironko Market',
          'Kacyiru (Minisiteri)',
          'Kicukiro Centre',
          'Gikondo Stage',
          'Nyamirambo (Biryogo)'
        ],
        popularRoutes: [
          { from: 'Nyabugogo', to: 'Downtown CBD' },
          { from: 'Remera', to: 'Kimironko' },
          { from: 'Downtown', to: 'Kacyiru' },
          { from: 'Kicukiro', to: 'Nyabugogo' }
        ],
        availableModes: ['Coaster Bus', 'Moto', 'Taxi', 'Walk'],
        emergencyNumbers: [
          { label: 'Rwanda Police Line', number: '112' }
        ],
        localDialectTip: 'Tap your smart transit card when boarding and alighting.'
      }
    ]
  }
];

// Helper: All Nigerian cities list for fast access
export const NIGERIAN_CITIES: CityConfig[] = COUNTRIES_DATA.find((c) => c.id === 'nigeria')?.cities || [];

// Helper: Find country by ID
export function getCountryById(countryId: string): CountryConfig {
  return COUNTRIES_DATA.find((c) => c.id === countryId) || COUNTRIES_DATA[0];
}

// Helper: Find city by ID across all countries
export function getCityById(cityId: string): CityConfig {
  for (const country of COUNTRIES_DATA) {
    const city = country.cities.find((c) => c.id === cityId);
    if (city) return city;
  }
  return NIGERIAN_CITIES[0];
}

// Helper: Get currency symbol for a given country or city
export function getCurrencySymbol(countryIdOrCityId: string): string {
  const country = COUNTRIES_DATA.find((c) => c.id === countryIdOrCityId);
  if (country) return country.currencySymbol;

  const city = getCityById(countryIdOrCityId);
  const parentCountry = COUNTRIES_DATA.find((c) => c.id === city.countryId);
  return parentCountry ? parentCountry.currencySymbol : '₦';
}

// Helper: Format fare range with dynamic currency symbol
export function formatFareRange(min: number, max: number, currencySymbol: string = '₦'): string {
  return `${currencySymbol}${min.toLocaleString()}–${currencySymbol}${max.toLocaleString()}`;
}

export function formatFare(amount: number, currencySymbol: string = '₦'): string {
  return `${currencySymbol}${amount.toLocaleString()}`;
}
