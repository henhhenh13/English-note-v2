import AIQuestionModal from '@/components/modals/ai-question/view';
import { useModal } from '@ebay/nice-modal-react';
import { Stack, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import { AIQuestion } from '@/managers/ai-question/interface';

type ExerciseAIQuestionProps = {
  aiQuestion: AIQuestion;
};
export default function ExerciseAIQuestion({
  aiQuestion,
}: ExerciseAIQuestionProps) {
  const aiQuestionModal = useModal(AIQuestionModal);
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
        aiQuestionModal.show({
          aiQuestion,
        });
      }}
    >
      <SmartToyIcon color="primary" />
      <Typography variant="body1">{aiQuestion.title}</Typography>
    </Stack>
  );
}
