import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Typography } from '@mui/material';

type GrammarDeleteModalProps = {
  onSubmit: () => Promise<void>;
};

const GrammarDeleteModal = NiceModal.create(
  ({ onSubmit }: GrammarDeleteModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="Grammar Delete"
        open={visible}
        submitButtonColor="error"
        titleColor="error"
        submitButtonTitle="Delete"
        onClose={remove}
        onSubmit={async () => {
          await onSubmit();
          remove();
        }}
      >
        <Typography>Do you want to delete this grammar?</Typography>
      </ModalContainer>
    );
  },
);
export default GrammarDeleteModal;
