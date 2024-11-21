import { GrammarSelector, GrammarState } from '@/managers/grammar/interface';
import { atom, selector } from 'recoil';

export const GRAMMAR_STATE = atom<GrammarState>({
  key: 'GRAMMAR_STATE',
  default: {
    list: new Map(),
    flags: {
      isLoading: true,
      isError: false,
      isSuccess: false,
    },
  },
});

export const GRAMMAR_SELECTOR = selector<GrammarSelector>({
  key: 'GRAMMAR_SELECTOR',
  get: ({ get }) => {
    const { list, flags } = get(GRAMMAR_STATE);
    return {
      list: Array.from(list.values()).map((item) => item),
      flags,
    };
  },
});
