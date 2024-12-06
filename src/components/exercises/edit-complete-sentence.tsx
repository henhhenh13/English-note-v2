import { useModal } from '@ebay/nice-modal-react';
import { Button, Stack, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import CompleteSentenceEditAddModal from '@/components/modals/complete-sentence/edit-add';

type ExerciseCompleteSentenceEditProps = {
  completeSentence: {
    title: string;
    suggestWords: string[];
    questionList: {
      sentence: string;
      selectedWords: { index: number; word: string; id: string }[];
    }[];
  };
  onEdit: (completeSentence: {
    title: string;
    suggestWords: string[];
    questionList: {
      sentence: string;
      selectedWords: { index: number; word: string; id: string }[];
    }[];
  }) => void;
  onDelete: () => void;
};
export default function ExerciseCompleteSentenceEdit({
  completeSentence,
  onEdit,
  onDelete,
}: ExerciseCompleteSentenceEditProps) {
  const completeSentenceEditAddModal = useModal(CompleteSentenceEditAddModal);
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
          completeSentenceEditAddModal.show({
            mode: 'edit',
            completeSentence,
            onSubmit: (completeSentence) => {
              onEdit(completeSentence);
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
        <SmartToyIcon color="primary" />
        <Typography variant="body1">{completeSentence.title}</Typography>
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
