import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Typography } from '@mui/material';

type VocabularyDeleteModalProps = {
  id: string;
  onSubmit: (id: string) => Promise<void>;
};

const VocabularyDeleteModal = NiceModal.create(
  ({ id, onSubmit }: VocabularyDeleteModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="Vocabulary Delete"
        open={visible}
        submitButtonColor="error"
        titleColor="error"
        submitButtonTitle="Delete"
        onClose={remove}
        onSubmit={async () => {
          await onSubmit(id);
          remove();
        }}
      >
        <Typography>Do you want to delete this vocabulary</Typography>
      </ModalContainer>
    );
  },
);
export default VocabularyDeleteModal;
