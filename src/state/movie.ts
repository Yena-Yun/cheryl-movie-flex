import { atom } from 'recoil';
import { IMovie } from 'utils/types/movieType';

export const movieState = atom<IMovie[]>({
  key: 'movieState',
  default: [],
});
