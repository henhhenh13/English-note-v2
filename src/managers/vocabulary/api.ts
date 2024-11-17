import { supabase } from '@/supabase-client';

type UseVocabularyApi = {
  fetchVocabularies: () => Promise<void>;
};
export default function useVocabularyApi(): UseVocabularyApi {
  const fetchVocabularies = async () => {
    const { data } = await supabase.from('vocabularies').select('*');

    console.log(data);
  };

  return { fetchVocabularies };
}
