import { QuizService, Quiz } from '@/managers/quiz/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';
import snakify from 'snakify-ts';

type UseQuizApi = {
  addQuiz: QuizService['addQuiz'];
  addQuizzes: QuizService['addQuizzes'];
  deleteQuiz: QuizService['deleteQuiz'];
  deleteQuizzes: QuizService['deleteQuizzes'];
  updateQuiz: QuizService['updateQuiz'];
};

export default function useQuizApi(): UseQuizApi {
  const initialQuiz: Quiz = {
    id: '',
    title: '',
    description: '',
    unitId: '',
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

  const addQuizzes: QuizService['addQuizzes'] = async (params) => {
    const paramsSnakify = params.map((item) => snakify(item));
    const { data, error } = await supabase
      .from('quizzes')
      .insert(paramsSnakify)
      .select<string, Quiz>('*');

    const dataCamelize = data ? data.map((item) => camelize(item)) : [];
    return {
      data: dataCamelize,
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

  return { addQuiz, addQuizzes, deleteQuiz, deleteQuizzes, updateQuiz };
}
