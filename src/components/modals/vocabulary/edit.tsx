import ModalContainer from '@/components/modals/container';
import { Vocabulary } from '@/managers/vocabulary/interface';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';

type VocabularyEditModalProps = {
  onSubmit: (params: Vocabulary) => Promise<void>;
} & Vocabulary;
const VocabularyEditModal = NiceModal.create(
  ({
    vocabulary,
    translation,
    description,
    themeId,
    id,
    onSubmit,
  }: VocabularyEditModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [newVocabulary, setNewVocabulary] = useState(vocabulary);
    const [newTranslation, setNewTranslation] = useState(translation);
    const [newDescription, setNewDescription] = useState(description);

    return (
      <ModalContainer
        title="Vocabulary Edit"
        open={visible}
        onClose={remove}
        onSubmit={async () => {
          await onSubmit({
            themeId,
            id,
            vocabulary: newVocabulary,
            translation: newTranslation,
            description: newDescription,
          });
          remove();
        }}
      >
        <Stack spacing={2} minWidth={425}>
          <TextField
            variant="outlined"
            label="Vocabulary"
            value={newVocabulary}
            onChange={(e) => setNewVocabulary(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Translation"
            value={newTranslation}
            onChange={(e) => setNewTranslation(e.target.value)}
          />
          <TextField
            variant="outlined"
            multiline
            label="Translation"
            value={newDescription || ''}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Stack>
      </ModalContainer>
    );
  },
);
export default VocabularyEditModal;
