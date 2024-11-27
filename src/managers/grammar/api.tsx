import { Grammar } from '@/managers/grammar/interface';

import { GrammarApiService } from '@/managers/grammar/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';

type UseGrammarApiService = {
  addGrammar: GrammarApiService['addGrammar'];
  updateGrammar: GrammarApiService['updateGrammar'];
  deleteGrammar: GrammarApiService['deleteGrammar'];
  fetchGrammars: GrammarApiService['fetchGrammars'];
};

export default function useGrammarApiService(): UseGrammarApiService {
  const initialGrammar: Grammar = {
    id: '',
    title: '',
    description: '',
    content: '',
  };
  const fetchGrammars: GrammarApiService['fetchGrammars'] = async () => {
    const { data, error } = await supabase.from('grammars').select('*');
    return {
      data: data || [],
      flags: {
        isLoading: false,
        isError: !!error,
        isSuccess: !!data,
      },
    };
  };

  const addGrammar: UseGrammarApiService['addGrammar'] = async (params: {
    title: string;
    description: string;
    content: string;
  }) => {
    const { data, error } = await supabase
      .from('grammars')
      .insert(params)
      .select<string, Grammar>('*')
      .single();

    return {
      data: camelize(data) || initialGrammar,
      flags: {
        isLoading: false,
        isError: !!error,
        isSuccess: !!data,
      },
    };
  };

  const updateGrammar: UseGrammarApiService['updateGrammar'] = async (
    params: Grammar,
  ) => {
    const { data, error } = await supabase
      .from('grammars')
      .update(params)
      .eq('id', params.id)
      .select<string, Grammar>('*')
      .single();

    return {
      data: camelize(data) || initialGrammar,
      flags: {
        isLoading: false,
        isError: !!error,
        isSuccess: !!data,
      },
    };
  };

  const deleteGrammar: UseGrammarApiService['deleteGrammar'] = async (
    id: string,
  ) => {
    const { error } = await supabase.from('grammars').delete().eq('id', id);
    return {
      isLoading: false,
      isError: !!error,
      isSuccess: !error,
    };
  };

  return {
    addGrammar,
    updateGrammar,
    deleteGrammar,
    fetchGrammars,
  };
}
