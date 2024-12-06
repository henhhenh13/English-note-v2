import { ApiStatus } from '@/contains/type';

export type CompleteSentence = {
  id: string;
  title: string;
  unitId: string;
  questionList: {
    selectedWords: { word: string; index: number; id: string }[];
    sentence: string;
    id: string;
  }[];
  suggestWords: string[] | null;
};

export type CompleteSentenceService = {
  addCompleteSentence: (params: {
    title: string;
    unitId: string;
    questionList: {
      selectedWords: { word: string; index: number; id: string }[];
      sentence: string;
      id: string;
    }[];
    suggestWords: string[] | null;
  }) => Promise<{
    data: CompleteSentence;
    flags: ApiStatus;
  }>;
  updateCompleteSentence: (
    params: CompleteSentence,
  ) => Promise<{ data: CompleteSentence; flags: ApiStatus }>;
  deleteCompleteSentence: (id: string) => Promise<ApiStatus>;
  deleteCompleteSentences: (ids: string[]) => Promise<ApiStatus>;
};
