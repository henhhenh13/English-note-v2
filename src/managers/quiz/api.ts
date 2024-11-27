import { QuizService, Quiz } from '@/managers/quiz/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';
import snakify from 'snakify-ts';

type UseQuizApi = {
  addQuiz: QuizService['addQuiz'];
  deleteQuiz: QuizService['deleteQuiz'];
  deleteQuizzes: QuizService['deleteQuizzes'];
  updateQuiz: QuizService['updateQuiz'];
};

export default function useQuizApi(): UseQuizApi {
  const initialQuiz: Quiz = {
    id: '',
    title: '',
    description: '',
    isMultipleChoice: false,
    questionList: [],
  };

  const addQuiz: QuizService['addQuiz'] = async (params) => {
    const { data, error } = await supabase
      .from('quizzes')
      .insert(snakify(params))
      .select<string, Quiz>('*')
      .single();
    return {
      data: camelize(data ?? initialQuiz),
      flags: {
        isSuccess: !error && !!data,
        isLoading: false,
        isError: !!error,
      },
    };
  };

  const deleteQuiz: QuizService['deleteQuiz'] = async (id) => {
    const { error } = await supabase.from('quizzes').delete().eq('id', id);
    return {
      isSuccess: !error,
      isLoading: false,
      isError: !!error,
    };
  };

  const deleteQuizzes: QuizService['deleteQuizzes'] = async (ids) => {
    const { error } = await supabase.from('quizzes').delete().in('id', ids);
    return {
      isSuccess: !error,
      isLoading: false,
      isError: !!error,
    };
  };

  const updateQuiz: QuizService['updateQuiz'] = async (params) => {
    const { data, error } = await supabase
      .from('quizzes')
      .update(snakify(params))
      .select<string, Quiz>('*')
      .single();
    return {
      data: camelize(data) || initialQuiz,
      flags: {
        isSuccess: !error && !!data,
        isLoading: false,
        isError: !!error,
      },
    };
  };

  return { addQuiz, deleteQuiz, deleteQuizzes, updateQuiz };
}
