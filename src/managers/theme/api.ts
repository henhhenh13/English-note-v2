import { Theme, ThemeApiService } from '@/managers/theme/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';

type UseThemeApi = {
  fetchThemes: ThemeApiService['fetchThemes'];
};

export default function useThemeApi(): UseThemeApi {
  const fetchThemes: ThemeApiService['fetchThemes'] = async () => {
    const { data, error } = await supabase
      .from('themes')
      .select<string, Theme>('*, vocabularies(*)');

    return {
      list: camelize(data) || [],
      flags: {
        isLoading: false,
        isSuccess: true,
        isError: !!error,
      },
    };
  };
  return {
    fetchThemes,
  };
}
