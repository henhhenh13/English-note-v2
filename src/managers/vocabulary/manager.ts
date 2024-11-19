import useVocabularyApi from '@/managers/vocabulary/api';
import { VocabularyApiService } from '@/managers/vocabulary/interface';

type UseVocabularyManager = {
  updateVocabulary: VocabularyApiService['updateVocabulary'];
  deleteVocabulary: VocabularyApiService['deleteVocabulary'];
  addVocabulary: VocabularyApiService['addVocabulary'];
};

export default function useVocabularyManager(): UseVocabularyManager {
  const { updateVocabulary, deleteVocabulary, addVocabulary } =
    useVocabularyApi();
  return { updateVocabulary, deleteVocabulary, addVocabulary };
}
