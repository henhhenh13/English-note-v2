import { ApiStatus } from '@/contains/type';
import useGrammarApiService from '@/managers/grammar/api';

import {
    GrammarSelector
} from '@/managers/grammar/interface';
import { GRAMMAR_SELECTOR, GRAMMAR_STATE } from '@/managers/grammar/state';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type UseGrammarManager = {
  addGrammar: (params: { title: string; description: string; content: string }) => Promise<ApiStatus>;
  updateGrammar: (params: { id: string; title: string; description: string; content: string }) => Promise<ApiStatus>;
  deleteGrammar: (id: string) => Promise<ApiStatus>;
  fetchGrammars: () => Promise<ApiStatus>;
  flags: GrammarSelector['flags'];
  grammars: GrammarSelector['grammars'];
};

export default function useGrammarManager(): UseGrammarManager {
  const {
    addGrammar: addGrammarApi,
    updateGrammar: updateGrammarApi,
    deleteGrammar: deleteGrammarApi,
    fetchGrammars: fetchGrammarsApi,
  } = useGrammarApiService();
  const { flags, grammars } = useRecoilValue(GRAMMAR_SELECTOR);
  const setGrammarState = useSetRecoilState(GRAMMAR_STATE);

  const fetchGrammars = useCallback(async () => {
    const { data, flags } = await fetchGrammarsApi();

    if (!!data && flags.isSuccess) {
      setGrammarState((prevState) => {
        data.forEach((grammar) => {
          prevState.grammars.set(grammar.id, grammar);
        });

        return {
          ...prevState,
          flags,
        };
      });
    }

    return flags;
  }, [fetchGrammarsApi, setGrammarState]);

  const addGrammar: UseGrammarManager['addGrammar'] = useCallback(
    async (params) => {
      const { data, flags } = await addGrammarApi(params);
      if (!!data && flags.isSuccess) {
        setGrammarState((prevState) => {
          prevState.grammars.set(data.id, data);
          return { ...prevState, flags };
        });
      }

      return flags;
    },
    [addGrammarApi, setGrammarState],
  );

  const updateGrammar: UseGrammarManager['updateGrammar'] = useCallback(async (params) => {
      const { data, flags } = await updateGrammarApi(params);
      if (!!data && flags.isSuccess) {
        setGrammarState((prevState) => {
          prevState.grammars.set(data.id, data);
          return { ...prevState, flags };
        });
      }
      return flags;
    },
    [updateGrammarApi, setGrammarState],
  );

  const deleteGrammar: UseGrammarManager['deleteGrammar'] = useCallback(
    async (id) => {
      const flags = await deleteGrammarApi(id);
      if (flags.isSuccess) {
        setGrammarState((prevState) => {
          prevState.grammars.delete(id);
          return { ...prevState, flags };
        });
      }
      return flags;
    },
    [deleteGrammarApi, setGrammarState],
  );

  return {
    addGrammar,
    updateGrammar,
    deleteGrammar,
    fetchGrammars,
    flags,
    grammars,
  };
}
