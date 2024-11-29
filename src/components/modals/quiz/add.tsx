import ModalContainer from '@/components/modals/container';
import QuizForm from '@/components/quiz/add/form';
import QuizAddItem from '@/components/quiz/add/item';
import OptionsForm from '@/components/quiz/add/options-form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Paper, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type QuizAddModalProps = {
  mode: 'options' | 'quiz';
  onSubmit: () => Promise<void>;
};

const QuizAddModal = NiceModal.create(
  ({ mode, onSubmit }: QuizAddModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [title, setTitle] = useState<string>('');
    return (
      <ModalContainer
        title="Quiz Add"
        open={visible}
        submitButtonColor="primary"
        titleColor="primary"
        onClose={remove}
        onSubmit={async () => {
          await onSubmit();
          remove();
        }}
      >
        <Stack spacing={2} width={960} height={600}>
          <TextField
            label="Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Stack direction="row" spacing={4}>
            {mode === 'options' ? (
              <OptionsForm onAdd={() => {}} />
            ) : (
              <QuizForm onAdd={() => {}} />
            )}
            <Paper sx={{ p: 2, pr: 0, width: '60%' }} elevation={4}>
              <Stack spacing={1} sx={{ maxHeight: 490, overflowY: 'auto' }}>
                <QuizAddItem />
                <QuizAddItem />
                <QuizAddItem />
                <QuizAddItem />
                <QuizAddItem />
                <QuizAddItem />
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </ModalContainer>
    );
  },
);

export default QuizAddModal;
