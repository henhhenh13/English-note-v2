import ThemeList from '@/components/themes/list';
import useThemeManager from '@/managers/theme/manager';
import { useEffect } from 'react';

export default function VocabularyPage() {
  const { fetchThemes, flags } = useThemeManager();
  useEffect(() => {
    if (flags.isLoading) {
      fetchThemes();
    }
  }, [fetchThemes, flags.isLoading]);

  return <ThemeList />;
}
