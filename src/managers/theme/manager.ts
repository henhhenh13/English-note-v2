import { ApiStatus } from '@/contains/type';
import useThemeApi from '@/managers/theme/api';
import { ThemeCollection } from '@/managers/theme/interface';
import { THEMES_SELECTOR, THEMES_STATE } from '@/managers/theme/state';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type UseThemeManager = {
  fetchThemes: () => Promise<ApiStatus>;
  themes: ThemeCollection['list'];
  flags: ThemeCollection['flags'];
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

  return {
    fetchThemes,
    themes: themeCollection.list,
    flags: themeCollection.flags,
  };
}
