import { ApiStatus } from '@/contains/type';

export type Quiz = {
  id: string;
  title: string;
  description: string;
  isMultipleChoice: boolean;
  questionList: {
    id: string;
    question: string;
    options: string[];
    answer: string;
  }[];
};

export type QuizState = {
  quizzes: Map<string, Quiz>;
  flags: ApiStatus;
};

export type QuizSelector = {
  quizzes: Quiz[];
  flags: ApiStatus;
};

export type QuizService = {
  addQuiz: (quiz: {
    title: string;
    description: string;
    isMultipleChoice: boolean;
    questionList: Quiz['questionList'];
  }) => Promise<{ data: Quiz; flags: ApiStatus }>;
  deleteQuiz: (quizId: string) => Promise<ApiStatus>;
  deleteQuizzes: (quizIds: string[]) => Promise<ApiStatus>;
  updateQuiz: (quiz: Quiz) => Promise<{ data: Quiz; flags: ApiStatus }>;
};
