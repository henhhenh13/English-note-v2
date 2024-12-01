import ModalContainer from '@/components/modals/container';
import SentenceWithAiItem from '@/components/sentense-with-ai/item';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Paper, Stack, Typography } from '@mui/material';
type SentenceWithAiModalProps = {
  onSubmit: () => Promise<void>;
};

const SentenceWithAiModal = NiceModal.create(
  ({ onSubmit }: SentenceWithAiModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="Sentence with AI"
        open={visible}
        submitButtonColor="primary"
        titleColor="primary"
        onClose={remove}
        onSubmit={async () => {
          await onSubmit();
          remove();
        }}
      >
        <Stack sx={{ width: 660 }}>
          <Typography variant="h6" fontWeight="bold">
            Ask a friend these questions. Then write sentences about your friend
            and their family.
          </Typography>

          <Paper sx={{ p: 2 }} elevation={3}>
            <Stack spacing={2}>
              <SentenceWithAiItem />
              <SentenceWithAiItem />
              <SentenceWithAiItem />
              <SentenceWithAiItem />
            </Stack>
          </Paper>
        </Stack>
      </ModalContainer>
    );
  },
);
export default SentenceWithAiModal;
