import {
    CompleteSentence,
    CompleteSentenceService,
} from '@/managers/complete-sentence/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';
import snakify from 'snakify-ts';

export default function useCompleteSentenceApi(): CompleteSentenceService {
  const initialData: CompleteSentence = {
    id: '',
    title: '',
    unitId: '',
    questionList: [],
    suggestWords: [],
  };
  const addCompleteSentence: CompleteSentenceService['addCompleteSentence'] =
    async (params) => {
      const { data, error } = await supabase
        .from('complete_sentences')
        .insert(snakify(params))
        .select<string, CompleteSentence>('*')
        .single();

      return {
        data: camelize(data) || initialData,
        flags: {
          isSuccess: !!data,
          isLoading: false,
          isError: !!error,
        },
      };
    };

  const addCompleteSentences: CompleteSentenceService['addCompleteSentences'] =
    async (params) => {
      const paramsSnakify = params.map((item) => snakify(item));
      const { data, error } = await supabase
        .from('complete_sentences')
        .insert(paramsSnakify)
        .select<string, CompleteSentence>('*');
      return {
        data: camelize(data) || [],
        flags: {
          isSuccess: !!data,
          isLoading: false,
          isError: !!error,
        },
      };
    };

  const updateCompleteSentence: CompleteSentenceService['updateCompleteSentence'] =
    async (params) => {
      const { data, error } = await supabase
        .from('complete_sentences')
        .update(snakify(params))
        .select<string, CompleteSentence>('*')
        .single();

      return {
        data: camelize(data) || initialData,
        flags: {
          isSuccess: !!data,
          isLoading: false,
          isError: !!error,
        },
      };
    };
  const deleteCompleteSentence: CompleteSentenceService['deleteCompleteSentence'] =
    async (id) => {
      const { error } = await supabase
        .from('complete_sentences')
        .delete()
        .eq('id', id);
      return {
        isSuccess: !error,
        isError: !!error,
        isLoading: false,
      };
    };

  const deleteCompleteSentences: CompleteSentenceService['deleteCompleteSentences'] =
    async (ids) => {
      const { error } = await supabase
        .from('complete_sentences')
        .delete()
        .in('id', ids);
      return {
        isSuccess: !error,
        isError: !!error,
        isLoading: false,
      };
    };
  return {
    addCompleteSentence,
    addCompleteSentences,
    updateCompleteSentence,
    deleteCompleteSentence,
    deleteCompleteSentences,
  };
}
