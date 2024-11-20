import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';

type ThemeEditModalProps = {
  title: string;
  description: string;
  onSubmit: (title: string, description: string) => Promise<void>;
};
const ThemeEditModal = NiceModal.create(
  ({ title, description, onSubmit }: ThemeEditModalProps) => {
    const { visible, remove } = useModal();
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    return (
      <ModalContainer
        title="Theme Edit"
        submitButtonTitle="Save changes"
        open={visible}
        onClose={remove}
        onSubmit={async () => {
          await onSubmit(newTitle, newDescription);
          remove();
        }}
      >
        <Stack spacing={2} minWidth={400}>
          <TextField
            variant="outlined"
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            rows={4}
            multiline
            variant="outlined"
            label="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Stack>
      </ModalContainer>
    );
  },
);

export default ThemeEditModal;
