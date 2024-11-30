import { Stack } from '@mui/material';

import { Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { useModal } from '@ebay/nice-modal-react';
import { Quiz } from '@/managers/quiz/interface';
import QuizAddEditModal from '@/components/modals/quiz/add-edit';
type ExerciseQuizEditProps = {
  quiz: Omit<Quiz, 'id' | 'unitId'>;
  onEdit: (quiz: Omit<Quiz, 'id' | 'unitId'>) => void;
};
export default function ExerciseQuizEdit({
  quiz,
  onEdit,
}: ExerciseQuizEditProps) {
  const quizAddEditModal = useModal(QuizAddEditModal);
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
        quizAddEditModal.show({
          mode: 'edit',
          quiz,
          onSubmit: (quiz) => onEdit(quiz),
        });
      }}
    >
      <QuizIcon color="primary" />
      <Typography variant="body1">{quiz.title}</Typography>
    </Stack>
  );
}
