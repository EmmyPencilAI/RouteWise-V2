import { CityConfig } from '../types';

export const NIGERIAN_CITIES: CityConfig[] = [
  {
    id: 'lagos',
    name: 'Lagos',
    state: 'Lagos State',
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
    ]
  },
  {
    id: 'abuja',
    name: 'Abuja (FCT)',
    state: 'Federal Capital Territory',
    popularJunctions: [
      'Wuse Market',
      'Wuse 2 (Banex)',
      'Area 1 Roundabout',
      'Federal Secretariat',
      'Gwarinpa (First Gate)',
      'Kubwa (Federal Housing)',
      'Airport Junction',
      'Maitama',
      'Lugbe (Federal Housing)',
      'Mararaba / Nyanya',
      'Jabi Motor Park',
      'Utako Market'
    ],
    popularRoutes: [
      { from: 'Wuse 2', to: 'Area 1' },
      { from: 'Gwarinpa', to: 'Federal Secretariat' },
      { from: 'Kubwa', to: 'Wuse Market' },
      { from: 'Lugbe', to: 'Area 1' }
    ],
    availableModes: ['Along', 'Taxi', 'Coaster', 'BRT', 'Keke', 'Walk'],
    emergencyNumbers: [
      { label: 'Abuja Emergency Control', number: '112' },
      { label: 'FCT Police Emergency', number: '08032003913' },
      { label: 'FRSC Rescue Line', number: '122' }
    ]
  },
  {
    id: 'ibadan',
    name: 'Ibadan',
    state: 'Oyo State',
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
      'Eleyele Water Works'
    ],
    popularRoutes: [
      { from: 'UI Gate', to: 'Dugbe' },
      { from: 'Bodija', to: 'Iwo Road' },
      { from: 'Challenge', to: 'Mokola' },
      { from: 'Ojoo', to: 'UI Gate' }
    ],
    availableModes: ['Micra', 'Danfo', 'Keke', 'Okada', 'Taxi', 'Walk'],
    emergencyNumbers: [
      { label: 'Oyo State Emergency', number: '615' },
      { label: 'Police Control Room', number: '08081768614' }
    ]
  },
  {
    id: 'portharcourt',
    name: 'Port Harcourt',
    state: 'Rivers State',
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
      'Aggrey Road'
    ],
    popularRoutes: [
      { from: 'Choba', to: 'Mile 1 Market' },
      { from: 'Rumuokoro', to: 'Garrison' },
      { from: 'Artillery', to: 'Waterlines' },
      { from: 'Oil Mill', to: 'Mile 1' }
    ],
    availableModes: ['Keke', 'Taxi', 'Danfo', 'Ferry', 'Walk'],
    emergencyNumbers: [
      { label: 'Rivers Emergency Response', number: '112' },
      { label: 'Police Distress Line', number: '08032003514' }
    ]
  },
  {
    id: 'kano',
    name: 'Kano',
    state: 'Kano State',
    popularJunctions: [
      'Sabon Gari Market',
      'Kofar Mata',
      'BUK New Site',
      'BUK Old Site',
      'Bata Roundabout',
      'Post Office Road',
      'Kasuwar Kurmi',
      'Fagge'
    ],
    popularRoutes: [
      { from: 'Sabon Gari', to: 'Kofar Mata' },
      { from: 'BUK New Site', to: 'Bata Roundabout' },
      { from: 'Post Office', to: 'Kasuwar Kurmi' }
    ],
    availableModes: ['Keke', 'Taxi', 'Walk'],
    emergencyNumbers: [
      { label: 'Kano State Emergency', number: '112' },
      { label: 'Kano Police Control', number: '08032419754' }
    ]
  },
  {
    id: 'enugu',
    name: 'Enugu',
    state: 'Enugu State',
    popularJunctions: [
      'Holy Ghost Park',
      'Independence Layout',
      'Abakpa Nike',
      'Ogui Road',
      'New Haven (Chime Ave)',
      'Polo Park Mall',
      'Gariki Market',
      'Otigba Junction'
    ],
    popularRoutes: [
      { from: 'Holy Ghost', to: 'Independence Layout' },
      { from: 'Abakpa', to: 'Ogui Road' },
      { from: 'New Haven', to: 'Gariki' }
    ],
    availableModes: ['Keke', 'Danfo', 'Taxi', 'Walk'],
    emergencyNumbers: [
      { label: 'Enugu Emergency Line', number: '112' },
      { label: 'Police Quick Response', number: '08032003702' }
    ]
  },
  {
    id: 'benincity',
    name: 'Benin City',
    state: 'Edo State',
    popularJunctions: [
      'Ring Road (King Square)',
      'Ugbowo (UNIBEN Main Gate)',
      'Ramash Park',
      'New Benin Market',
      'Ikpoba Hill',
      'Aduwawa',
      'Airport Road',
      'Sapele Road'
    ],
    popularRoutes: [
      { from: 'Ugbowo', to: 'Ring Road' },
      { from: 'New Benin', to: 'Ikpoba Hill' },
      { from: 'Ring Road', to: 'Airport Road' }
    ],
    availableModes: ['Danfo', 'Keke', 'Taxi', 'Okada', 'Walk'],
    emergencyNumbers: [
      { label: 'Edo Emergency Desk', number: '112' },
      { label: 'Police Control Line', number: '08037646272' }
    ]
  }
];
