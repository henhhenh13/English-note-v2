import ModalContainer from '@/components/modals/container';
import { Vocabulary } from '@/managers/vocabulary/interface';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';

type VocabularyAddModalProps = {
  onSubmit: (params: Omit<Vocabulary, 'id' | 'themeId'>) => Promise<void>;
};
const VocabularyAddModal = NiceModal.create(
  ({ onSubmit }: VocabularyAddModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [vocabulary, setVocabulary] = useState('');
    const [translation, setTranslation] = useState('');
    const [description, setDescription] = useState('');

    return (
      <ModalContainer
        title="Vocabulary Add"
        submitButtonTitle="Add"
        open={visible}
        onClose={remove}
        onSubmit={async () => {
          await onSubmit({ vocabulary, translation, description });
          remove();
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              label="Vocabulary"
              value={vocabulary}
              onChange={(e) => setVocabulary(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
            />
          </Stack>
          <TextField
            minRows={3}
            variant="outlined"
            multiline
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
      </ModalContainer>
    );
  },
);
export default VocabularyAddModal;
