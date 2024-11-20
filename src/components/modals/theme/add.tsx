import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';

type ThemeAddModalProps = {
  onSubmit: (title: string, description: string) => Promise<void>;
};

const ThemeAddModal = NiceModal.create(({ onSubmit }: ThemeAddModalProps) => {
  const { visible, remove } = useModal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ModalContainer
      title="Theme Add"
      submitButtonTitle="Add"
      open={visible}
      onClose={remove}
      onSubmit={async () => {
        await onSubmit(title, description);
        remove();
      }}
    >
      <Stack spacing={2} minWidth={400}>
        <TextField
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          rows={4}
          multiline
          variant="outlined"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Stack>
    </ModalContainer>
  );
});

export default ThemeAddModal;
