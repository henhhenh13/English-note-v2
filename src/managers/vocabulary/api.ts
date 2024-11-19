import {
  Vocabulary,
  VocabularyApiService,
} from '@/managers/vocabulary/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';
import snakify from 'snakify-ts';

type UseVocabularyApi = {
  fetchVocabularies: () => Promise<void>;
  updateVocabulary: VocabularyApiService['updateVocabulary'];
  deleteVocabulary: VocabularyApiService['deleteVocabulary'];
  addVocabulary: VocabularyApiService['addVocabulary'];
};
export default function useVocabularyApi(): UseVocabularyApi {
  const fetchVocabularies = async () => {
    const { data } = await supabase.from('vocabularies').select('*');

    console.log(data);
  };

  const updateVocabulary: VocabularyApiService['updateVocabulary'] = async (
    params,
  ) => {
    const { data, error } = await supabase
      .from('vocabularies')
      .update({ ...snakify(params) })
      .eq('id', params.id)
      .select<string, Vocabulary>('*')
      .single();

    return {
      data: camelize(data),
      flags: {
        isSuccess: !!data,
        isLoading: false,
        isError: !!error,
      },
    };
  };

  const deleteVocabulary: VocabularyApiService['deleteVocabulary'] = async (
    id,
  ) => {
    const { error } = await supabase.from('vocabularies').delete().eq('id', id);

    return {
      isSuccess: true,
      isLoading: false,
      isError: !!error,
    };
  };

  const addVocabulary: VocabularyApiService['addVocabulary'] = async (
    params,
  ) => {
    const { data, error } = await supabase
      .from('vocabularies')
      .insert({ ...snakify(params) })
      .select<string, Vocabulary>('*')
      .single();

    return {
      data: camelize(data),
      flags: {
        isSuccess: !!data,
        isLoading: false,
        isError: !!error,
      },
    };
  };

  return {
    fetchVocabularies,
    updateVocabulary,
    deleteVocabulary,
    addVocabulary,
  };
}
