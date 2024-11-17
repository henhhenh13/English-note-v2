import { ApiStatus } from '@/contains/type';
import { Theme, ThemeCollection } from '@/managers/theme/interface';
import { atom, selector } from 'recoil';

export type ThemeState = {
  list: Map<string, Theme>;
  flags: ApiStatus;
};

export const THEMES_STATE = atom<ThemeState>({
  key: 'themesState',
  default: {
    list: new Map(),
    flags: {
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
  },
});

export const THEMES_SELECTOR = selector<ThemeCollection>({
  key: 'themesSelector',
  get: ({ get }) => {
    const { list, flags } = get(THEMES_STATE);


    return {
      list: Array.from(list.values()).map((item) => item),
      flags,
    };
  },
});
