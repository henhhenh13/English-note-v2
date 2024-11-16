import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const TestModal = NiceModal.create((): React.ReactElement => {
  const { visible, remove } = useModal();

  return <ModalContainer open={visible} onClose={remove} />;
});
export default TestModal;
