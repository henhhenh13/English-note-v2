import ModalContainer from '@/components/modals/container';
import QuizForm from '@/components/quiz/add/form';
import QuizAddList from '@/components/quiz/add/list';
import OptionsForm from '@/components/quiz/add/options-form';
import { Quiz, QuizQuestionItem } from '@/managers/quiz/interface';
import generateUUID from '@/utils/generator-uuid';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Stack, TextField } from '@mui/material';
import { useCallback, useState } from 'react';

type QuizAddEditModalProps = {
  mode: 'edit' | 'add';
  isMultipleChoice: boolean;
  quiz?: Omit<Quiz, 'id' | 'unitId'>;
  onSubmit: (quiz: Omit<Quiz, 'id' | 'unitId'>) => void;
};

const QuizAddEditModal = NiceModal.create(
  ({
    mode,
    isMultipleChoice,
    quiz,
    onSubmit,
  }: QuizAddEditModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [newTitle, setNewTitle] = useState<string>(quiz?.title || '');
    const [newDescription, setNewDescription] = useState<string>(
      quiz?.description || '',
    );
    const [quizList, setQuizList] = useState<QuizQuestionItem[]>(
      quiz?.questionList || [],
    );

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

    const handleSubmit = useCallback(() => {
      onSubmit({
        title: newTitle,
        description: newDescription,
        isMultipleChoice,
        questionList: quizList,
      });
    }, [onSubmit, newTitle, newDescription, isMultipleChoice, quizList]);

    return (
      <ModalContainer
        title={mode === 'edit' ? 'Quiz Edit' : 'Quiz Add'}
        open={visible}
        submitButtonColor="primary"
        titleColor="primary"
        submitButtonTitle={mode === 'edit' ? 'Save changes' : 'Add'}
        onClose={remove}
        onSubmit={async () => {
          handleSubmit();
          remove();
        }}
      >
        <Stack spacing={2} width={960} height={600}>
          <TextField
            label="Title"
            size="small"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <TextField
            label="Description"
            size="small"
            multiline
            rows={2}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
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

export default QuizAddEditModal;
