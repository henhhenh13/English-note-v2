import { ApiStatus } from '@/contains/type';
import { Vocabulary } from '@/managers/vocabulary/interface';

export type Theme = {
  id: string;
  title: string;
  description: string;
  vocabularies: Vocabulary[];
};

export type ThemeState = {
  themes: Map<string, Theme>;
  flags: ApiStatus;
};

export type ThemesSelector = {
  themes: Theme[];
  flags: ApiStatus;
};

export type ThemeApiService = {
  fetchThemes: () => Promise<{
    data: Theme[];
    flags: ApiStatus;
  }>;
  updateTheme: (
    id: string,
    title: string,
    description: string,
  ) => Promise<{ data: Theme; flags: ApiStatus }>;
  addTheme: (
    title: string,
    description: string,
  ) => Promise<{ data: Theme; flags: ApiStatus }>;
  deleteTheme: (id: string) => Promise<ApiStatus>;
};
