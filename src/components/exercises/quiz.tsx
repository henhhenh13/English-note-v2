import { Stack } from '@mui/material';

import { Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizViewModal from '@/components/modals/quiz/view';
import { useModal } from '@ebay/nice-modal-react';
import { Quiz } from '@/managers/quiz/interface';
type ExerciseQuizProps = {
  quiz: Quiz;
};
export default function ExerciseQuiz({ quiz }: ExerciseQuizProps) {
  const quizViewModal = useModal(QuizViewModal);
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        gap: 1,
        width: 'fit-content',
        '&:hover': {
          color: 'primary.main',
          textDecoration: 'underline',
          transition: 'all 0.3s ease',
        },
      }}
      onClick={() => {
        quizViewModal.show({
          quiz,
        });
      }}
    >
      <QuizIcon color="primary" />
      <Typography variant="body1">{quiz.title}</Typography>
    </Stack>
  );
}
