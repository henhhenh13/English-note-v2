import { ThemesSelector, ThemeState } from '@/managers/theme/interface';
import { atom, selector } from 'recoil';



export const THEMES_STATE = atom<ThemeState>({
  key: 'themesState',
  default: {
    themes: new Map(),
    flags: {
      isLoading: true,
      isSuccess: false,
      isError: false,
    },
  },
});

export const THEMES_SELECTOR = selector<ThemesSelector>({
  key: 'themesSelector',
  get: ({ get }) => {
    const { themes, flags } = get(THEMES_STATE);


    return {
      themes: Array.from(themes.values()).map((item) => item),
      flags,
    };
  },
});
