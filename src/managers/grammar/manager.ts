import useGrammarApiService from '@/managers/grammar/api';

import { GrammarApiService } from '@/managers/grammar/interface';

type UseGrammarManager = {
  addGrammar: GrammarApiService['addGrammar'];   
  updateGrammar: GrammarApiService['updateGrammar'];
  deleteGrammar: GrammarApiService['deleteGrammar'];
};

export default function useGrammarManager(): UseGrammarManager {
  const { addGrammar, updateGrammar, deleteGrammar } = useGrammarApiService();

  return {
    addGrammar,
    updateGrammar,
    deleteGrammar,
  };
}
