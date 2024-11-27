import useQuizApi from '@/managers/quiz/api';
import { QuizService } from '@/managers/quiz/interface';

type UseQuizManager = {
  addQuiz: QuizService['addQuiz'];
  deleteQuiz: QuizService['deleteQuiz'];
  deleteQuizzes: QuizService['deleteQuizzes'];
  updateQuiz: QuizService['updateQuiz'];
};

export default function useQuizManager(): UseQuizManager {
  const { addQuiz, deleteQuiz, deleteQuizzes, updateQuiz } = useQuizApi();

  return { addQuiz, deleteQuiz, deleteQuizzes, updateQuiz };
}
