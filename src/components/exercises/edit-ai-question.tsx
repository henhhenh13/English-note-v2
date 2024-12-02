import { useModal } from '@ebay/nice-modal-react';
import { Button, Stack, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import AIQuestionAddEditModal from '@/components/modals/ai-question/add-edit';

type ExerciseAIQuestionEditProps = {
  aiQuestion: {
    title: string;
    questions: string[];
    description: string;
  };
  onEdit: (aiQuestion: {
    title: string;
    questions: string[];
    description: string;
  }) => void;
  onDelete: () => void;
};
export default function ExerciseAIQuestionEdit({
  aiQuestion,
  onEdit,
  onDelete,
}: ExerciseAIQuestionEditProps) {
  const aiQuestionAddEditModal = useModal(AIQuestionAddEditModal);
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        width: '100%',
        '&:hover': {
          color: 'primary.main',
          textDecoration: 'underline',
          transition: 'all 0.3s ease',
        },
      }}
      onClick={() => {
        aiQuestionAddEditModal.show({
          mode: 'edit',
          aiQuestion,
          onSubmit: (aiQuestion) => {
            onEdit(aiQuestion);
          },
        });
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <SmartToyIcon color="primary" />
        <Typography variant="body1">{aiQuestion.title}</Typography>
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
