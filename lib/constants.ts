import { StoreLocation } from '@/types/reward';

export const GOOGLE_REVIEW_URL =
  'https://www.google.com/maps/place/Subway/@39.5164734,-104.7698351,17z/data=!3m1!5s0x876c91e50839f297:0x5ae61b7bbb114260!4m17!1m8!3m7!1s0x876c91e5ae649ef5:0xa65ddddfab66ede3!2s11017+S+Parker+Rd,+Parker,+CO+80134,+USA!3b1!8m2!3d39.5164734!4d-104.7672602!16s%2Fg%2F11bw41yqn4!3m7!1s0x876c91e31a3b6361:0xfd3d5f7e5412abca!8m2!3d39.516461!4d-104.767263!9m1!1b1!16s%2Fg%2F1th0yvnv?entry=ttu&g_ep=EgoyMDI2MDcyOC4wIKXMDSoASAFQAw%3D%3D';

export const PRIMARY_LOCATION: StoreLocation = {
  id: 'parker-11017',
  address: '11017 S Parker Rd',
  cityStateZip: 'Parker, CO 80134, United States',
  fullAddress: '11017 S Parker Rd, Parker, CO 80134, United States',
  isPrimary: true,
};

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'parker-11017',
    address: '11017 S Parker Rd',
    cityStateZip: 'Parker, CO 80134, United States',
    fullAddress: '11017 S Parker Rd, Parker, CO 80134, United States',
    isPrimary: true,
  },
];

export const APP_THEME = {
  primaryGreen: '#007A33',
  darkGreen: '#005C26',
  yellow: '#FFC72C',
  white: '#FFFFFF',
  background: '#F8F8F8',
  borderRadius: '24px',
  boxShadow: '0 12px 30px rgba(0,0,0,.12)',
  transition: '300ms ease',
};

export const STORAGE_KEYS = {
  STATE: 'subway_reward_flow_state_v1',
};
