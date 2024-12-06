import CompleteSentenceItem from '@/components/complete-sentence/item';
import ModalContainer from '@/components/modals/container';
import { CompleteSentence } from '@/managers/complete-sentence/interface';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Chip, Paper, Stack, Typography } from '@mui/material';

type CompleteSentenceViewModalProps = {
  completeSentence: CompleteSentence;
};
const CompleteSentenceViewModal = NiceModal.create(
  ({
    completeSentence,
  }: CompleteSentenceViewModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="Complete Sentence Add"
        open={visible}
        onClose={remove}
      >
        <Stack sx={{ px: 4, width: 800 }} spacing={1.5}>
          <Typography variant="h6" fontWeight="bold">
            {completeSentence.title}
          </Typography>
          <Paper sx={{ py: 1.5, px: 2 }} variant="outlined">
            <Stack spacing={1} direction="row" flexWrap="wrap">
              {!!completeSentence.suggestWords &&
                completeSentence.suggestWords.map((word) => (
                  <Chip
                    key={word}
                    label={word}
                    variant="outlined"
                    sx={{ px: 1 }}
                  />
                ))}
            </Stack>
          </Paper>
          <Paper sx={{ py: 1.5, px: 2, mt: 2 }} elevation={4}>
            <Stack
              spacing={2}
              sx={{
                width: '100%',
                maxWidth: '100%',
                height: 500,
                maxHeight: 500,
                overflowY: 'auto',
              }}
            >
              {!!completeSentence.questionList.length &&
                completeSentence.questionList.map((question, index) => (
                  <CompleteSentenceItem key={index} {...question} />
                ))}
            </Stack>
          </Paper>
        </Stack>
      </ModalContainer>
    );
  },
);
export default CompleteSentenceViewModal;
