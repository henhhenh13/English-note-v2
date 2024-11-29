import QuizAddItem from '@/components/quiz/add/item';
import { QuizQuestionItem } from '@/managers/quiz/interface';
import { Paper, Stack } from '@mui/material';

type QuizAddListProps = {
  quizList: QuizQuestionItem[];
  isMultipleChoice: boolean;
  onDelete: (id: string) => void;
};

export default function QuizAddList({
  quizList,
  isMultipleChoice,
  onDelete,
}: QuizAddListProps) {
  return (
    <Paper sx={{ p: 2, width: '60%' }} elevation={4}>
      <Stack
        spacing={1}
        sx={{ minHeight: 490, maxHeight: 490, overflowY: 'auto' }}
      >
        {!!quizList.length &&
          quizList.map((quiz, index) => (
            <QuizAddItem
              isMultipleChoice={isMultipleChoice}
              key={quiz.id}
              {...quiz}
              index={index + 1}
              onDelete={() => onDelete(quiz.id)}
            />
          ))}
      </Stack>
    </Paper>
  );
}
