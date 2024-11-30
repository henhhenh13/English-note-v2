import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Typography } from '@mui/material';

type UnitDeleteModalProps = {
  onSubmit: () => Promise<void>;
};

const UnitDeleteModal = NiceModal.create(
  ({ onSubmit }: UnitDeleteModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="Unit Delete"
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
        <Typography>Do you want to delete this unit including videos and quizzes?</Typography>
      </ModalContainer>
    );
  },
);
export default UnitDeleteModal;
