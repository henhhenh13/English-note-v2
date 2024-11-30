import useQuizApi from '@/managers/quiz/api';
import { QuizService } from '@/managers/quiz/interface';

type UseQuizManager = {
  addQuiz: QuizService['addQuiz'];
  deleteQuiz: QuizService['deleteQuiz'];
  deleteQuizzes: QuizService['deleteQuizzes'];
  updateQuiz: QuizService['updateQuiz'];
  addQuizzes: QuizService['addQuizzes'];
};

export default function useQuizManager(): UseQuizManager {
  const { addQuiz, deleteQuiz, deleteQuizzes, updateQuiz, addQuizzes } =
    useQuizApi();

  return { addQuiz, deleteQuiz, deleteQuizzes, updateQuiz, addQuizzes };
}
