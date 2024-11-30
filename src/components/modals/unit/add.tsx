import CustomMenu, { CustomMenuProps } from '@/components/menu';
import ModalContainer from '@/components/modals/container';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Divider, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoAddModal from '@/components/modals/video/add';
import ExerciseVideo from '@/components/exercises/video';
import useUnitsManager from '@/managers/unit/manager';
import useVideoManager from '@/managers/video/manager';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizAddEditModal from '@/components/modals/quiz/add-edit';
import { Quiz } from '@/managers/quiz/interface';
import ExerciseQuizEdit from '@/components/exercises/edit-quiz';
import useQuizManager from '@/managers/quiz/manager';

const UnitAddModal = NiceModal.create((): React.ReactElement => {
  const { visible, remove } = useModal();
  const { addUnit, addVideosOnUnitByUnitId, addQuizzesOnUnitByUnitId } =
    useUnitsManager();
  const { addQuizzes } = useQuizManager();
  const { addVideos } = useVideoManager();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const videoAddModal = useModal(VideoAddModal);
  const quizAddEditModal = useModal(QuizAddEditModal);

  const [videos, setVideos] = useState<
    { description: string; url: string; title: string }[]
  >([]);
  const [quizzes, setQuizzes] = useState<Omit<Quiz, 'id' | 'unitId'>[]>([]);

  const handleVideoAdd = useCallback(
    (params: { description: string; url: string; title: string }) => {
      setVideos([...videos, params]);
    },
    [videos],
  );

  const handleVideoEdit = useCallback(
    (
      params: { title: string; description: string; url: string },
      index: number,
    ) => {
      setVideos((prevState) => {
        return prevState.map((video, i) => (i === index ? params : video));
      });
    },
    [],
  );

  const handleQuizAdd = useCallback(
    async (quiz: Omit<Quiz, 'id' | 'unitId'>) => {
      setQuizzes((prevState) => [...prevState, quiz]);
    },
    [],
  );

  const handleQuizEdit = useCallback(
    (quiz: Omit<Quiz, 'id' | 'unitId'>, index: number) => {
      setQuizzes((prevState) => {
        return prevState.map((item, i) => (i === index ? quiz : item));
      });
    },
    [],
  );

  const menuItems: CustomMenuProps['items'] = useMemo(() => {
    return [
      {
        title: 'Video',
        icon: YouTubeIcon,
        iconColor: 'error',
        onClick: () => videoAddModal.show({ onSubmit: handleVideoAdd }),
      },
      {
        title: 'Quiz',
        icon: QuizIcon,
        iconColor: 'primary',
        onClick: () =>
          quizAddEditModal.show({
            mode: 'add',
            isMultipleChoice: false,
            onSubmit: async (quiz) => {
              await handleQuizAdd(quiz);
            },
          }),
      },
      {
        title: 'Quiz: Multiple Choice',
        icon: QuizIcon,
        iconColor: 'primary',
        onClick: () =>
          quizAddEditModal.show({
            mode: 'add',
            isMultipleChoice: true,
            onSubmit: async (quiz) => {
              await handleQuizAdd(quiz);
            },
          }),
      },
    ];
  }, [videoAddModal, handleVideoAdd, quizAddEditModal, handleQuizAdd]);

  const handleAddUnit = useCallback(async () => {
    const { data, flags } = await addUnit({ title, description });
    if (flags.isSuccess && !!data) {
      const videosWithUnitId = videos.map((video) => ({
        ...video,
        unitId: data.id,
      }));

      const quizzesWithUnitId = quizzes.map((quiz) => ({
        ...quiz,
        unitId: data.id,
      }));

      const { data: videosData, flags: videosFlags } =
        await addVideos(videosWithUnitId);

      const { data: quizzesData, flags: quizzesFlags } =
        await addQuizzes(quizzesWithUnitId);

      if (videosFlags.isSuccess && !!videosData) {
        addVideosOnUnitByUnitId(data.id, videosData);
      }

      if (quizzesFlags.isSuccess && !!quizzesData) {
        addQuizzesOnUnitByUnitId(data.id, quizzesData);
      }
    }
  }, [
    addUnit,
    title,
    description,
    videos,
    quizzes,
    addVideos,
    addQuizzes,
    addVideosOnUnitByUnitId,
    addQuizzesOnUnitByUnitId,
  ]);

  const handleVideoDelete = useCallback((index: number) => {
    setVideos((prevState) => prevState.filter((__, i) => i !== index));
  }, []);

  return (
    <ModalContainer
      title="Unit Add"
      submitButtonTitle="Add"
      open={visible}
      onClose={remove}
      maxWidth="lg"
      onSubmit={async () => {
        await handleAddUnit();
        remove();
      }}
    >
      <Stack spacing={2} sx={{ width: 720, height: 565 }}>
        <TextField
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          minRows={3}
          variant="outlined"
          multiline
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Lessons</Typography>
          <CustomMenu buttonTitle="Add More" items={menuItems} />
        </Stack>
        <Divider />

        <Stack spacing={1} divider={<Divider />}>
          {!!videos &&
            videos.map((video, index) => (
              <ExerciseVideo
                key={video.url}
                {...video}
                mode="edit"
                onEdit={(params) => handleVideoEdit(params, index)}
                onDelete={() => handleVideoDelete(index)}
              />
            ))}
          {!!quizzes &&
            quizzes.map((quiz, index) => (
              <ExerciseQuizEdit
                key={`${quiz.title}-${index}`}
                quiz={quiz}
                onEdit={(params) => handleQuizEdit(params, index)}
              />
            ))}
        </Stack>
      </Stack>
    </ModalContainer>
  );
});
export default UnitAddModal;
