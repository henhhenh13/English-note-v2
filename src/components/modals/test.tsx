import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useChat } from 'ai/react';

const TestModal = NiceModal.create((): React.ReactElement => {
  const { visible, remove } = useModal();
  const { input, handleInputChange, handleSubmit } = useChat({
    api: import.meta.env.VITE_GEMINI_API_URL,
  });

  return (
    <ModalContainer open={visible} onClose={remove}>
      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </ModalContainer>
  );
});
export default TestModal;
