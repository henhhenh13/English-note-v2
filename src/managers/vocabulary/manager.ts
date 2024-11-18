import useVocabularyApi from '@/managers/vocabulary/api';
import { VocabularyApiService } from '@/managers/vocabulary/interface';

type UseVocabularyManager = {
  updateVocabulary: VocabularyApiService['updateVocabulary'];
};

export default function useVocabularyManager(): UseVocabularyManager {
  const { updateVocabulary } = useVocabularyApi();
  return { updateVocabulary };
}
