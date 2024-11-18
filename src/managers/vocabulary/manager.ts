import useVocabularyApi from '@/managers/vocabulary/api';
import { VocabularyApiService } from '@/managers/vocabulary/interface';

type UseVocabularyManager = {
  updateVocabulary: VocabularyApiService['updateVocabulary'];
  deleteVocabulary: VocabularyApiService['deleteVocabulary'];
};

export default function useVocabularyManager(): UseVocabularyManager {
  const { updateVocabulary, deleteVocabulary } = useVocabularyApi();
  return { updateVocabulary, deleteVocabulary };
}
