import { ApiStatus } from '@/contains/type';

export type AIQuestion = {
  id: string;
  title: string;
  description: string;
  question: string;
  unitId: string;
};

export type AnswerFromAI = {
  wrongWords: string[];
  correctAnswer: string;
  explanation: string;
  percent: number;
};

export type AIQuestionsService = {
  addAiQuestion: (question: {
    title: string;
    description: string;
    question: string;
  }) => Promise<{ data: AIQuestion; flags: ApiStatus }>;
  deleteAiQuestion: (id: string) => Promise<ApiStatus>;
  deleteAiQuestions: (ids: string[]) => Promise<ApiStatus>;
  updateAiQuestion: (
    question: AIQuestion,
  ) => Promise<{ data: AIQuestion; flags: ApiStatus }>;
};
