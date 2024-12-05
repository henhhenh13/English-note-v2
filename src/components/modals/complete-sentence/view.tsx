import CompleteSentenceItem from '@/components/complete-sentence/item';
import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Chip, Paper, Stack, Typography } from '@mui/material';

const data = {
  title: 'Complete the sentence. Use words from the opposite page',
  words: ['washing', 'machine', 'text'],
  sentence: 'The washing machine is washing the text.',
};
const CompleteSentenceViewModal = NiceModal.create((): React.ReactElement => {
  const { visible, remove } = useModal();

  return (
    <ModalContainer
      title="Complete Sentence Add"
      open={visible}
      onClose={remove}
    >
      <Stack sx={{ px: 4, width: 800 }} spacing={1.5}>
        <Typography variant="h6" fontWeight="bold">
          {data.title}
        </Typography>
        <Paper sx={{ py: 1.5, px: 2 }} variant="outlined">
          <Stack spacing={1} direction="row" flexWrap="wrap">
            {data.words.map((word) => (
              <Chip key={word} label={word} variant="outlined" sx={{ px: 1 }} />
            ))}
            <Chip label="text" variant="outlined" sx={{ px: 1 }} />
          </Stack>
        </Paper>
        <Paper sx={{ py: 1.5, px: 2 }} elevation={4}>
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              maxWidth: '100%',
              minHeight: 400,
              height: 400,
              maxHeight: 400,
              overflowY: 'auto',
            }}
          >
            <CompleteSentenceItem />
            <CompleteSentenceItem />
            <CompleteSentenceItem />
            <CompleteSentenceItem />
            <CompleteSentenceItem />
            <CompleteSentenceItem />
            <CompleteSentenceItem />
          </Stack>
        </Paper>
      </Stack>
    </ModalContainer>
  );
});
export default CompleteSentenceViewModal;
