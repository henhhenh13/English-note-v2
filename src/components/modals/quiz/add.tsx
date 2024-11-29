import ModalContainer from '@/components/modals/container';
import QuizForm from '@/components/quiz/add/form';
import QuizAddList from '@/components/quiz/add/list';
import OptionsForm from '@/components/quiz/add/options-form';
import { QuizQuestionItem } from '@/managers/quiz/interface';
import generateUUID from '@/utils/generator-uuid';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Stack, TextField } from '@mui/material';
import { useCallback, useState } from 'react';

type QuizAddModalProps = {
  mode: 'options' | 'quiz';
  onSubmit: () => Promise<void>;
};

const QuizAddModal = NiceModal.create(
  ({ mode, onSubmit }: QuizAddModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [title, setTitle] = useState<string>('');
    const isMultipleChoice = mode === 'options';
    const [quizList, setQuizList] = useState<QuizQuestionItem[]>([]);

    const handleOptionsAdd = useCallback(
      (options: string[], correctOption: string, question: string) => {
        const quiz: QuizQuestionItem = {
          id: generateUUID(),
          question,
          options,
          answer: correctOption,
        };
        setQuizList((prev) => [...prev, quiz]);
      },
      [],
    );

    const handleQuizAdd = useCallback((answer: string, question: string) => {
      const quiz: QuizQuestionItem = {
        id: generateUUID(),
        question,
        options: [],
        answer,
      };
      setQuizList((prev) => [...prev, quiz]);
    }, []);

    const handleDeleteQuiz = useCallback((id: string) => {
      setQuizList((prev) => prev.filter((quiz) => quiz.id !== id));
    }, []);

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
            {isMultipleChoice ? (
              <OptionsForm onAdd={handleOptionsAdd} />
            ) : (
              <QuizForm onAdd={handleQuizAdd} />
            )}
            <QuizAddList
              isMultipleChoice={isMultipleChoice}
              quizList={quizList}
              onDelete={handleDeleteQuiz}
            />
          </Stack>
        </Stack>
      </ModalContainer>
    );
  },
);

export default QuizAddModal;
