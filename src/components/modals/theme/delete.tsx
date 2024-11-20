import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Typography } from '@mui/material';

type ThemeDeleteModalProps = {
  id: string;
  onSubmit: (id: string) => Promise<void>;
};

const ThemeDeleteModal = NiceModal.create(
  ({ id, onSubmit }: ThemeDeleteModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="Theme Delete"
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
        <Typography>Do you want to delete this theme?</Typography>
      </ModalContainer>
    );
  },
);
export default ThemeDeleteModal;
