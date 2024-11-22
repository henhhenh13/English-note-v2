import Editor from '@/components/editor/ck-editor';
import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type GrammarAddModalProps = {
  onSubmit: (
    title: string,
    description: string,
    content: string,
  ) => Promise<void>;
};
const GrammarAddModal = NiceModal.create(
  ({ onSubmit }: GrammarAddModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    return (
      <ModalContainer
        title="Grammar Add"
        submitButtonTitle="Add"
        open={visible}
        onClose={remove}
        onSubmit={async () => {
          await onSubmit(title, description, content);
          remove();
        }}
      >
        <Stack spacing={2} sx={{ px: 4 }}>
          <TextField
            variant="outlined"
            label="Title"
            color="primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Description"
            color="primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        <Box sx={{ mt: 2, minWidth: 825, minHeight: 450 }}>
          <Editor initialData={content} onChange={(text) => setContent(text)} />
        </Box>
      </ModalContainer>
    );
  },
);
export default GrammarAddModal;
