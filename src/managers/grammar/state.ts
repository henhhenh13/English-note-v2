import { GrammarSelector, GrammarState } from '@/managers/grammar/interface';
import { atom, selector } from 'recoil';

export const GRAMMAR_STATE = atom<GrammarState>({
  key: 'GRAMMAR_STATE',
  default: {
    grammars: new Map(),
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
    const { grammars, flags } = get(GRAMMAR_STATE);
    return {
      grammars: Array.from(grammars.values()).map((item) => item),
      flags,
    };
  },
});
