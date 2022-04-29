import { atom } from 'recoil';

export const paramState = atom({
  key: 'paramState',
  default: {
    query: '',
    display: 0,
  },
});
