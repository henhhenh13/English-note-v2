import QuizItem from '@/components/quiz/item';
import { Quiz } from '@/managers/quiz/interface';
import { Paper, Stack, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
type QuizListProps = {
  questions: Quiz['questionList'];
  totalUserAnswer: number;
};
export default function QuizList({
  questions,
  totalUserAnswer,
}: QuizListProps) {
  return (
    <Paper sx={{ p: 2 }} elevation={4}>
      <Stack
        spacing={6}
        sx={{
          maxHeight: 320,
          minHeight: 320,
          overflowY: 'auto',
        }}
      >
        <TransitionGroup>
          {!!questions.length &&
            questions.map((question, index) => (
              <Collapse sx={{ mb: 1 }} key={question.id}>
                <QuizItem
                  {...question}
                  index={index + 1 + totalUserAnswer}
                  isActive={index === 0}
                />
              </Collapse>
            ))}
        </TransitionGroup>
      </Stack>
    </Paper>
  );
}
