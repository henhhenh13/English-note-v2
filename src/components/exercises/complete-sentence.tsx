import { Stack } from '@mui/material';

import { Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { useModal } from '@ebay/nice-modal-react';
import CompleteSentenceViewModal from '@/components/modals/complete-sentence/view';
import { CompleteSentence } from '@/managers/complete-sentence/interface';

type ExerciseCompleteSentenceProps = {
  completeSentence: CompleteSentence;
};
export default function ExerciseCompleteSentence({
  completeSentence,
}: ExerciseCompleteSentenceProps) {
  const completeSentenceViewModal = useModal(CompleteSentenceViewModal);
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
        completeSentenceViewModal.show({
          completeSentence,
        });
      }}
    >
      <QuizIcon color="primary" />
      <Typography variant="body1">Complete Sentence</Typography>
    </Stack>
  );
}
