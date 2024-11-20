import { ApiStatus } from '@/contains/type';
import { Vocabulary } from '@/managers/vocabulary/interface';

export type Theme = {
  id: string;
  title: string;
  description: string;
  vocabularies: Vocabulary[];
};

export type ThemeCollection = {
  list: Theme[];
  flags: ApiStatus;
};

export type ThemeApiService = {
  fetchThemes: () => Promise<ThemeCollection>;
  updateTheme: (
    id: string,
    title: string,
    description: string,
  ) => Promise<{ data: Theme | null; flags: ApiStatus }>;
  addTheme: (
    title: string,
    description: string,
  ) => Promise<{ data: Theme | null; flags: ApiStatus }>;
  deleteTheme: (id: string) => Promise<ApiStatus>;
};
