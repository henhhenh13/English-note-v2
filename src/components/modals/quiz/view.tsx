import ModalContainer from '@/components/modals/container';
import QuizList from '@/components/quiz/list';
import useToastManager from '@/hooks/use-toast';
import { Quiz } from '@/managers/quiz/interface';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

type QuizViewModalProps = {
  quiz: Quiz;
};

const QuizViewModal = NiceModal.create(
  ({ quiz }: QuizViewModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const { successToast, errorToast } = useToastManager();
    const [userAnswerIds, setUserAnswerIds] = useState<string[]>([]);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [newQuestionList, setNewQuestionList] = useState<
      Quiz['questionList']
    >(quiz.questionList);
    const [isError, setIsError] = useState<boolean>(false);

    const clearUserAnswer = useCallback(() => {
      setUserAnswer('');
    }, []);

    const currentQuestion = useMemo(() => {
      return newQuestionList[0];
    }, [newQuestionList]);

    console.log(currentQuestion);

    const handleSubmitAnswer = useCallback(
      (inputAnswer?: string) => {
        const answer = inputAnswer || userAnswer;
        const isCorrect =
          answer.trim().toLowerCase() ===
          currentQuestion?.answer.toLocaleLowerCase();
        if (isCorrect) {
          setNewQuestionList((prev) =>
            prev.filter((question) => question.id !== currentQuestion?.id),
          );
          setUserAnswerIds([...userAnswerIds, currentQuestion?.id]);
          successToast('Correct Answer');
          clearUserAnswer();
        } else {
          errorToast('Wrong Answer');
          setIsError(true);
        }
      },
      [
        clearUserAnswer,
        currentQuestion?.answer,
        currentQuestion?.id,
        errorToast,
        successToast,
        userAnswer,
        userAnswerIds,
      ],
    );

    return (
      <ModalContainer
        title="Quiz View"
        open={visible}
        submitButtonColor="primary"
        titleColor="primary"
        onClose={remove}
      >
        <Stack spacing={2} width={640}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Typography variant="h6">{quiz.title}</Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <span>{userAnswerIds.length}</span>/
              <span>{quiz.questionList.length}</span>
            </Stack>
          </Stack>

          <QuizList
            userAnswer={userAnswer}
            totalUserAnswer={userAnswerIds.length}
            questions={newQuestionList}
          />

          <Paper sx={{ p: 2 }} elevation={4}>
            <Stack spacing={1}>
              <Typography variant="body1" fontWeight={500}>
                Question: {currentQuestion?.question}
              </Typography>

              {quiz.isMultipleChoice ? (
                <Stack direction="row" spacing={1}>
                  {currentQuestion?.options.map((option, index) => (
                    <Button
                      key={`${option}-${index}`}
                      variant="outlined"
                      size="small"
                      onClick={() => handleSubmitAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Stack>
              ) : (
                <TextField
                  label="Your Answer"
                  size="small"
                  error={isError}
                  value={userAnswer}
                  autoFocus
                  onChange={(e) => {
                    setIsError(false);
                    setUserAnswer(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                      handleSubmitAnswer();
                    }
                  }}
                />
              )}
            </Stack>
          </Paper>
        </Stack>
      </ModalContainer>
    );
  },
);

export default QuizViewModal;
