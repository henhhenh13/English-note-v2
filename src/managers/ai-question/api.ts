import { AIQuestion, AIQuestionsService } from './interface';
import { supabase } from '@/supabase-client';

import camelize from 'camelize-ts';
import snakify from 'snakify-ts';
type UseAiQuestionApi = {
  addAiQuestion: AIQuestionsService['addAiQuestion'];
  updateAiQuestion: AIQuestionsService['updateAiQuestion'];
  deleteAiQuestion: AIQuestionsService['deleteAiQuestion'];
  deleteAiQuestions: AIQuestionsService['deleteAiQuestions'];
};
export default function useAiQuestionApi(): UseAiQuestionApi {
  const initialAiQuestion: AIQuestion = {
    id: '',
    title: '',
    description: '',
    questions: [],
    unitId: '',
  };

  const addAiQuestion: UseAiQuestionApi['addAiQuestion'] = async (params: {
    title: string;
    description: string;
    questions: string[];
  }) => {
    const { data, error } = await supabase
      .from('ai_questions')
      .insert(params)
      .select<string, AIQuestion>('*')
      .single();

    return {
      data: camelize(data) || initialAiQuestion,
      flags: {
        isLoading: false,
        isError: !!error,
        isSuccess: !!data && !error,
      },
    };
  };

  const updateAiQuestion: UseAiQuestionApi['updateAiQuestion'] =
    async (params: {
      id: string;
      title: string;
      description: string;
      questions: string[];
    }) => {
      const { data, error } = await supabase
        .from('ai_questions')
        .update(snakify(params))
        .select<string, AIQuestion>('*')
        .single();

      return {
        data: camelize(data) || initialAiQuestion,
        flags: {
          isLoading: false,
          isError: !!error,
          isSuccess: !!data && !error,
        },
      };
    };

  const deleteAiQuestion: UseAiQuestionApi['deleteAiQuestion'] = async (
    id: string,
  ) => {
    const { error } = await supabase.from('ai_questions').delete().eq('id', id);

    return {
      isLoading: false,
      isError: !!error,
      isSuccess: !error,
    };
  };

  const deleteAiQuestions: UseAiQuestionApi['deleteAiQuestions'] = async (
    ids: string[],
  ) => {
    const { error } = await supabase
      .from('ai_questions')
      .delete()
      .in('id', ids);

    return {
      isLoading: false,
      isError: !!error,
      isSuccess: !error,
    };
  };

  return {
    addAiQuestion,
    updateAiQuestion,
    deleteAiQuestion,
    deleteAiQuestions,
  };
}
