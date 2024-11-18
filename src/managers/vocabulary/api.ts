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
        isSuccess: true,
        isLoading: false,
        isError: !!error,
      },
    };
  };

  return { fetchVocabularies, updateVocabulary };
}
