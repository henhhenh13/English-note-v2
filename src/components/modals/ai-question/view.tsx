import ModalContainer from '@/components/modals/container';
import AIQuestionItem from '@/components/sentense-with-ai/item';
import { AIQuestion } from '@/managers/ai-question/interface';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Paper, Stack, Typography } from '@mui/material';
type AIQuestionModalProps = {
  aiQuestion: AIQuestion;
};

const AIQuestionModal = NiceModal.create(
  ({ aiQuestion }: AIQuestionModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="AI Question"
        open={visible}
        titleColor="primary"
        onClose={remove}
      >
        <Stack sx={{ width: 660 }} spacing={1.5}>
          <Typography variant="h6" fontWeight="bold">
            {aiQuestion.title}
          </Typography>

          <Paper sx={{ p: 2 }} elevation={3}>
            <Stack spacing={2}>
              {aiQuestion.questions.map((question, index) => (
                <AIQuestionItem
                  question={question}
                  index={index + 1}
                  key={`question-${index}`}
                />
              ))}
            </Stack>
          </Paper>
        </Stack>
      </ModalContainer>
    );
  },
);
export default AIQuestionModal;
