import { Button, Stack } from '@mui/material';

import { Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { useModal } from '@ebay/nice-modal-react';
import { Quiz } from '@/managers/quiz/interface';
import QuizAddEditModal from '@/components/modals/quiz/add-edit';
type ExerciseQuizEditProps = {
  quiz: Omit<Quiz, 'id' | 'unitId'>;
  onEdit: (quiz: Omit<Quiz, 'id' | 'unitId'>) => void;
  onDelete: () => void;
};
export default function ExerciseQuizEdit({
  quiz,
  onEdit,
  onDelete,
}: ExerciseQuizEditProps) {
  const quizAddEditModal = useModal(QuizAddEditModal);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '100%',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        onClick={() => {
          quizAddEditModal.show({
            mode: 'edit',
            quiz,
            onSubmit: (quiz) => {
              onEdit(quiz);
            },
          });
        }}
        sx={{
          cursor: 'pointer',
          width: '100%',
          '&:hover': {
            color: 'primary.main',
            textDecoration: 'underline',
            transition: 'all 0.3s ease',
          },
        }}
      >
        <QuizIcon color="primary" />
        <Typography variant="body1">{quiz.title}</Typography>
      </Stack>
      <Button
        sx={{ ml: 'auto' }}
        variant="contained"
        size="small"
        color="error"
        onClick={onDelete}
      >
        Delete
      </Button>
    </Stack>
  );
}
