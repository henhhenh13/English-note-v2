import useCompleteSentenceApi from '@/managers/complete-sentence/api';
import { CompleteSentenceService } from '@/managers/complete-sentence/interface';

export default function useCompleteSentenceManager(): CompleteSentenceService {
  const {
    addCompleteSentence,
    addCompleteSentences,
    updateCompleteSentence,
    deleteCompleteSentence,
    deleteCompleteSentences,
  } = useCompleteSentenceApi();

  return {
    addCompleteSentence,
    addCompleteSentences,
    updateCompleteSentence,
    deleteCompleteSentence,
    deleteCompleteSentences,
  };
}
