import { ApiStatus } from '@/contains/type';
import useThemeApi from '@/managers/theme/api';
import { ThemesSelector } from '@/managers/theme/interface';
import { THEMES_SELECTOR, THEMES_STATE } from '@/managers/theme/state';
import { Vocabulary } from '@/managers/vocabulary/interface';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type UseThemeManager = {
  fetchThemes: () => Promise<ApiStatus>;
  addTheme: (title: string, description: string) => Promise<ApiStatus>;
  updateTheme: (
    id: string,
    title: string,
    description: string,
  ) => Promise<ApiStatus>;
  deleteTheme: (id: string) => Promise<ApiStatus>;
  themes: ThemesSelector['themes'];
  flags: ThemesSelector['flags'];
  addVocabularyByThemeId: (vocabulary: Vocabulary) => void;
  updateVocabularyByThemeId: (vocabulary: Vocabulary) => void;
  deleteVocabularyByThemeId: (vocabularyId: string, themeId: string) => void;
};

export default function useThemeManager(): UseThemeManager {
  const {
    fetchThemes: fetchThemesApi,
    addTheme: addThemeApi,
    updateTheme: updateThemeApi,
    deleteTheme: deleteThemeThemeApi,
  } = useThemeApi();
  const setThemeState = useSetRecoilState(THEMES_STATE);
  const { themes, flags } = useRecoilValue(THEMES_SELECTOR);

  const fetchThemes = useCallback(async () => {
    const { data, flags } = await fetchThemesApi();

    if (flags.isSuccess) {
      setThemeState((prevState) => {
        data.forEach((item) => {
          prevState.themes.set(item.id, item);
        });

        return {
          ...prevState,
          flags,
        };
      });
    }

    return flags;
  }, [fetchThemesApi, setThemeState]);

  const addTheme: UseThemeManager['addTheme'] = useCallback(
    async (title, description) => {
      const { data, flags } = await addThemeApi(title, description);
      if (!!data && flags.isSuccess) {
        setThemeState((prevState) => {
          prevState.themes.set(data.id, data);

          return { ...prevState };
        });
      }
      return flags;
    },

    [addThemeApi, setThemeState],
  );

  const updateTheme: UseThemeManager['updateTheme'] = useCallback(
    async (id, title, description) => {
      const { data, flags } = await updateThemeApi(id, title, description);
      if (!!data && flags.isSuccess) {
        setThemeState((prevState) => {
          prevState.themes.set(id, data);

          return { ...prevState };
        });
      }
      return flags;
    },

    [setThemeState, updateThemeApi],
  );

  const deleteTheme: UseThemeManager['deleteTheme'] = useCallback(
    async (id) => {
      const flags = await deleteThemeThemeApi(id);
      if (flags.isSuccess) {
        setThemeState((prevState) => {
          prevState.themes.delete(id);

          return { ...prevState };
        });
      }
      return flags;
    },

    [deleteThemeThemeApi, setThemeState],
  );

  const addVocabularyByThemeId = useCallback(
    async (vocabulary: Vocabulary) => {
      setThemeState((prevState) => {
        const themeId = vocabulary.themeId;
        const currentTheme = prevState.themes.get(themeId);
        if (currentTheme) {
          const newVocabularies = [...currentTheme.vocabularies, vocabulary];

          prevState.themes.set(themeId, {
            ...currentTheme,
            vocabularies: newVocabularies,
          });
        }

        return { ...prevState };
      });
    },
    [setThemeState],
  );

  const updateVocabularyByThemeId = useCallback(
    async (vocabulary: Vocabulary) => {
      setThemeState((prevState) => {
        const themeId = vocabulary.themeId;
        const currentTheme = prevState.themes.get(themeId);
        if (currentTheme) {
          const newVocabularies = currentTheme?.vocabularies.map((item) => {
            return item.id === vocabulary.id ? vocabulary : item;
          });

          prevState.themes.set(themeId, {
            ...currentTheme,
            vocabularies: newVocabularies,
          });
        }

        return { ...prevState };
      });
    },
    [setThemeState],
  );

  const deleteVocabularyByThemeId = useCallback(
    async (vocabularyId: string, themeId: string) => {
      setThemeState((prevState) => {
        const currentTheme = prevState.themes.get(themeId);
        if (currentTheme) {
          const newVocabularies = currentTheme.vocabularies.filter((item) => {
            return item.id !== vocabularyId;
          });

          prevState.themes.set(themeId, {
            ...currentTheme,
            vocabularies: newVocabularies,
          });
        }

        return { ...prevState };
      });
    },
    [setThemeState],
  );

  return {
    fetchThemes,
    themes,
    flags,
    updateVocabularyByThemeId,
    deleteVocabularyByThemeId,
    addVocabularyByThemeId,
    addTheme,
    updateTheme,
    deleteTheme,
  };
}
