import { TIME_PAUSE_WITH_AI } from '@/contains/global';
import { AnswerFromAI } from '@/managers/ai-question/interface';
import useGeminiApi from '@/managers/gemini/api';
import { getPromptQuiz, cleanText } from '@/managers/gemini/helper';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseGemini = {
  isLoading: boolean;
  getAnswerFromAI: (question: string, answer: string) => Promise<AnswerFromAI>;
  isPaused: boolean;
  pauseTime: number;
};

export const useGemini = (): UseGemini => {
  const { fetchText } = useGeminiApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const getAnswerFromAI = useCallback(
    async (question: string, answer: string): Promise<AnswerFromAI> => {
      setIsLoading(true);
      const explanation = await fetchText(getPromptQuiz(question, answer));

      setIsLoading(false);
      setPauseTime(TIME_PAUSE_WITH_AI);
      setIsPaused(true);
      return JSON.parse(cleanText(explanation));
    },
    [fetchText],
  );

  useEffect(() => {
    if (isPaused && !timer.current && pauseTime > 0) {
      timer.current = setInterval(() => {
        setPauseTime((prev) => {
          const time = prev - 1000;
          if (time === 0 && timer.current) {
            setIsPaused(false);
            clearInterval(timer.current);
            timer.current = null;
          }
          return time;
        });
      }, 1000);
    }
  }, [pauseTime, isPaused]);

  return {
    isLoading,
    getAnswerFromAI,
    isPaused,
    pauseTime,
  };
};
