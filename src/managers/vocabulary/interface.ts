import { ApiStatus } from '@/contains/type';

export type Vocabulary = {
  id: string;
  vocabulary: string;
  themeId: string;
  description: string | null;
  translation: string;
};

export type VocabularyApiService = {
  updateVocabulary: (params: Vocabulary) => Promise<{
    data: Vocabulary | null;
    flags: ApiStatus;
  }>;
};
