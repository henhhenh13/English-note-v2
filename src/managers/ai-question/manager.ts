import { AIQuestionsService } from '@/managers/ai-question/interface';
import useAiQuestionApi from './api';

type UseAiQuestionManager = {
  addAiQuestion: AIQuestionsService['addAiQuestion'];
  addAiQuestions: AIQuestionsService['addAiQuestions'];
  updateAiQuestion: AIQuestionsService['updateAiQuestion'];
  deleteAiQuestion: AIQuestionsService['deleteAiQuestion'];
  deleteAiQuestions: AIQuestionsService['deleteAiQuestions'];
};

export default function useAiQuestionManager(): UseAiQuestionManager {
  const {
    addAiQuestion,
    addAiQuestions,
    updateAiQuestion,
    deleteAiQuestion,
    deleteAiQuestions,
  } = useAiQuestionApi();

  return {
    addAiQuestion,
    addAiQuestions,
    updateAiQuestion,
    deleteAiQuestion,
    deleteAiQuestions,
  };
}
