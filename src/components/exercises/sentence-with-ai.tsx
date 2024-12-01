import SentenceWithAiModal from '@/components/modals/sentence-with-ai/view';
import { useModal } from '@ebay/nice-modal-react';
import { Stack, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

export default function SentenceWithAi() {
  const sentenceWithAiModal = useModal(SentenceWithAiModal);
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
        sentenceWithAiModal.show({
          onSubmit: async () => {},
        });
      }}
    >
      <QuizIcon color="primary" />
      <Typography variant="body1">Sentence with AI</Typography>
    </Stack>
  );
}
