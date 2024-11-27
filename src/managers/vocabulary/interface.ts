import { ApiStatus } from '@/contains/type';

export type Vocabulary = {
  id: string;
  vocabulary: string;
  themeId: string;
  description: string | null;
  translation: string;
};

export type VocabularyApiService = {
  addVocabulary: (params: {
    themeId: string;
    vocabulary: string;
    translation: string;
    description: string | null;
  }) => Promise<{
    data: Vocabulary;
    flags: ApiStatus;
  }>;
  updateVocabulary: (params: Vocabulary) => Promise<{
    data: Vocabulary ;
    flags: ApiStatus;
  }>;
  deleteVocabulary: (id: string) => Promise<ApiStatus>;
};
