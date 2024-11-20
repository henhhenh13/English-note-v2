import { Theme, ThemeApiService } from '@/managers/theme/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';

type UseThemeApi = {
  fetchThemes: ThemeApiService['fetchThemes'];
  addTheme: ThemeApiService['addTheme'];
  updateTheme: ThemeApiService['updateTheme'];
  deleteTheme: ThemeApiService['deleteTheme'];
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
        isSuccess: !!data,
        isError: !!error,
      },
    };
  };

  const addTheme: ThemeApiService['addTheme'] = async (
    title: string,
    description: string,
  ) => {
    const { data, error } = await supabase
      .from('themes')
      .insert({ title, description })
      .select<string, Theme>('*, vocabularies(*)')
      .single();

    return {
      data: camelize(data),
      flags: {
        isLoading: false,
        isSuccess: !!data,
        isError: !!error,
      },
    };
  };

  const updateTheme: ThemeApiService['updateTheme'] = async (
    id: string,
    title: string,
    description: string,
  ) => {
    const { data, error } = await supabase
      .from('themes')
      .update({ title, description })
      .eq('id', id)
      .select<string, Theme>('*, vocabularies(*)')
      .single();

    return {
      data: camelize(data),
      flags: {
        isLoading: false,
        isSuccess: !!data,
        isError: !!error,
      },
    };
  };

  const deleteTheme: ThemeApiService['deleteTheme'] = async (id) => {
    const { error } = await supabase.from('themes').delete().eq('id', id);

    return {
      isError: !!error,
      isLoading: false,
      isSuccess: true,
    };
  };

  return {
    fetchThemes,
    addTheme,
    updateTheme,
    deleteTheme,
  };
}
