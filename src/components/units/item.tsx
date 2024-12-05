import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Unit } from '@/managers/unit/interface';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ExerciseVideo from '@/components/exercises/video';
import CustomMenu, { CustomMenuProps } from '@/components/menu';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useVideoManager from '@/managers/video/manager';
import useToastManager from '@/hooks/use-toast';
import { useCallback } from 'react';
import { useMemo } from 'react';
import useUnitsManager from '@/managers/unit/manager';
import { useModal } from '@ebay/nice-modal-react';
import UnitDeleteModal from '@/components/modals/unit/delete';
import ExerciseQuiz from '@/components/exercises/quiz';
import useQuizManager from '@/managers/quiz/manager';
import ExerciseAIQuestion from '@/components/exercises/ai-question';
import useAiQuestionManager from '@/managers/ai-question/manager';
import ExerciseCompleteSentence from '@/components/exercises/complete-sentence';
type UnitItemProps = {
  unit: Unit;
};
export default function UnitItem({ unit }: UnitItemProps) {
  const { deleteVideos } = useVideoManager();
  const { deleteUnit } = useUnitsManager();
  const { deleteQuizzes } = useQuizManager();
  const { deleteAiQuestions } = useAiQuestionManager();
  const { successToast } = useToastManager();
  const unitDeleteModal = useModal(UnitDeleteModal);

  const handleDeleteUnit = useCallback(async () => {
    const videoIds = unit.videos.map((video) => video.id);
    const quizIds = unit.quizzes.map((quiz) => quiz.id);
    const aiQuestionIds = unit.aiQuestions.map((aiQuestion) => aiQuestion.id);
    const { isSuccess: isSuccessVideo } = await deleteVideos(videoIds);
    const { isSuccess: isSuccessQuiz } = await deleteQuizzes(quizIds);
    const { isSuccess: isSuccessAiQuestion } =
      await deleteAiQuestions(aiQuestionIds);
    if (isSuccessVideo && isSuccessQuiz && isSuccessAiQuestion) {
      successToast('Videos, quizzes and ai questions deleted successfully');
      const { isSuccess } = await deleteUnit(unit.id);
      if (isSuccess) {
        successToast('Unit deleted successfully');
      }
    }
  }, [
    deleteAiQuestions,
    deleteQuizzes,
    deleteUnit,
    deleteVideos,
    successToast,
    unit.aiQuestions,
    unit.id,
    unit.quizzes,
    unit.videos,
  ]);

  const menuItems: CustomMenuProps['items'] = useMemo(
    () => [
      {
        title: 'Delete',
        icon: DeleteForeverIcon,
        iconColor: 'error',
        onClick: () => unitDeleteModal.show({ onSubmit: handleDeleteUnit }),
      },
    ],
    [handleDeleteUnit, unitDeleteModal],
  );

  return (
    <Paper elevation={5} sx={{ py: 1, px: 2 }}>
      <Stack direction="row" spacing={3} alignItems="center" mb={2}>
        <Paper sx={{ p: 1 }} elevation={3}>
          <CastForEducationIcon fontSize="medium" color="primary" />
        </Paper>
        <Stack width="100%">
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight="bold">
              {unit.title}
            </Typography>
            <CustomMenu items={menuItems} />
          </Stack>
          <Typography variant="body1">{unit.description}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <div>
        <Accordion disableGutters sx={{ boxShadow: 'none', border: 'none' }}>
          <AccordionSummary
            sx={{
              minHeight: 40,
              maxHeight: 40,
              '&.Mui-expanded': { minHeight: 40 },
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h6">Exercises</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              {!!unit.videos &&
                unit.videos.map((video) => (
                  <ExerciseVideo
                    id={video.id}
                    key={video.id}
                    url={video.url}
                    title={video.title}
                    description={video.description}
                  />
                ))}

              {!!unit.quizzes &&
                unit.quizzes.map((quiz) => (
                  <ExerciseQuiz quiz={quiz} key={quiz.id} />
                ))}
              {!!unit.aiQuestions &&
                unit.aiQuestions.map((aiQuestion) => (
                  <ExerciseAIQuestion
                    aiQuestion={aiQuestion}
                    key={aiQuestion.id}
                  />
                ))}
              <ExerciseCompleteSentence />
            </Stack>
          </AccordionDetails>
        </Accordion>
      </div>
    </Paper>
  );
}
