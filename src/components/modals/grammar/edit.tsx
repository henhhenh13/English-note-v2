import Editor from '@/components/editor/ck-editor';
import ModalContainer from '@/components/modals/container';
import { Grammar } from '@/managers/grammar/interface';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type GrammarEditModalProps = {
  grammar: Grammar;
  onSubmit: (params: Grammar) => Promise<void>;
};
const GrammarEditModal = NiceModal.create(
  ({ grammar, onSubmit }: GrammarEditModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [title, setTitle] = useState(grammar.title);
    const [description, setDescription] = useState(grammar.description);
    const [content, setContent] = useState(grammar.content);

    return (
      <ModalContainer
        title="Grammar Edit"
        submitButtonTitle="Edit"
        open={visible}
        onClose={remove}
        onSubmit={async () => {
          await onSubmit({ ...grammar, title, description, content });
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
export default GrammarEditModal;
