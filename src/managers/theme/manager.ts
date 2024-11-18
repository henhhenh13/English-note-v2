import { ApiStatus } from '@/contains/type';
import useThemeApi from '@/managers/theme/api';
import { ThemeCollection } from '@/managers/theme/interface';
import { THEMES_SELECTOR, THEMES_STATE } from '@/managers/theme/state';
import { Vocabulary } from '@/managers/vocabulary/interface';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type UseThemeManager = {
  fetchThemes: () => Promise<ApiStatus>;
  themes: ThemeCollection['list'];
  flags: ThemeCollection['flags'];
  updateVocabularyThemeId: (vocabulary: Vocabulary) => void
};

export default function useThemeManager(): UseThemeManager {
  const { fetchThemes: fetchThemesApi } = useThemeApi();
  const setThemeState = useSetRecoilState(THEMES_STATE);
  const themeCollection = useRecoilValue(THEMES_SELECTOR);

  const fetchThemes = useCallback(async () => {
    const { list, flags } = await fetchThemesApi();

    if (flags.isSuccess) {
      setThemeState((prevState) => {
        list.forEach((item) => {
          prevState.list.set(item.id, item);
        });

        return {
          ...prevState,
          flags,
        };
      });
    }

    return flags;
  }, [fetchThemesApi, setThemeState]);

  const updateVocabularyThemeId = useCallback(
    async (vocabulary: Vocabulary) => {
      setThemeState((prevState) => {
        const themeId = vocabulary.themeId
        const currentTheme = prevState.list.get(themeId);
        if (currentTheme) {
          const newVocabularies = currentTheme?.vocabularies.map((item) => {
            return item.id === vocabulary.id ? vocabulary : item;
          });

          prevState.list.set(themeId, {
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
    themes: themeCollection.list,
    flags: themeCollection.flags,
    updateVocabularyThemeId
  };
}
