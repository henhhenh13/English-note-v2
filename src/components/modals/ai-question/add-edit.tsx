import ModalContainer from '@/components/modals/container';
import AIQuestionItem from '@/components/sentense-with-ai/item';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
type AIQuestionAddEditModalProps = {
  mode: 'edit' | 'add';
  aiQuestion?: {
    title: string;
    questions: string[];
    description: string;
  };
  onSubmit: (aiQuestion: {
    title: string;
    questions: string[];
    description: string;
  }) => void;
};

const AIQuestionAddEditModal = NiceModal.create(
  ({
    mode,
    aiQuestion,
    onSubmit,
  }: AIQuestionAddEditModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [questions, setQuestions] = useState<string[]>(
      aiQuestion?.questions || [],
    );
    const [question, setQuestion] = useState<string>('');
    const [title, setTitle] = useState<string>(aiQuestion?.title || '');
    const [description, setDescription] = useState<string>(
      aiQuestion?.description || '',
    );

    const handleAddQuestion = useCallback(() => {
      setQuestions([...questions, question]);
      setQuestion('');
    }, [questions, question]);

    const handleDeleteQuestion = useCallback(
      (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
      },
      [questions],
    );

    return (
      <ModalContainer
        title={mode === 'add' ? 'AI Question Add' : 'AI Question Edit'}
        open={visible}
        titleColor="primary"
        submitButtonTitle={mode === 'add' ? 'Add' : 'Save changes'}
        onClose={remove}
        onSubmit={async () => {
          onSubmit({ title, questions, description });
          remove();
        }}
      >
        <Stack sx={{ width: 960 }} spacing={3} direction="row">
          <Stack sx={{ width: '45%' }} spacing={3}>
            <Paper sx={{ p: 2 }} elevation={4}>
              <Stack spacing={1}>
                <Typography variant="h6">AI Question</Typography>
                <TextField
                  label="Title"
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  multiline
                  rows={3}
                  label="Description"
                  size="small"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Stack>
            </Paper>
            <Paper sx={{ p: 2 }} elevation={4}>
              <Stack spacing={1}>
                <Typography variant="h6">Add Question</Typography>
                <TextField
                  label="Questions"
                  size="small"
                  multiline
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    sx={{ width: 'fit-content' }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </Button>{' '}
                </Stack>
              </Stack>
            </Paper>
          </Stack>

          <Paper
            sx={{
              p: 2,
              width: '55%',
              minHeight: 525,
              maxHeight: 525,
              overflowY: 'auto',
            }}
            elevation={4}
          >
            <Stack spacing={1}>
              {!!questions.length &&
                questions.map((question, index) => (
                  <AIQuestionItem
                    key={`${question}+${index}`}
                    question={question}
                    index={index + 1}
                    onDelete={() => handleDeleteQuestion(index)}
                  />
                ))}
            </Stack>
          </Paper>
        </Stack>
      </ModalContainer>
    );
  },
);
export default AIQuestionAddEditModal;
