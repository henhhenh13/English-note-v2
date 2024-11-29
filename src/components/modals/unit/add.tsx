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
import QuizAddModal from '@/components/modals/quiz/add';

const UnitAddModal = NiceModal.create((): React.ReactElement => {
  const { visible, remove } = useModal();
  const { addUnit, addVideosOnUnitByUnitId } = useUnitsManager();
  const { addVideos } = useVideoManager();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const videoAddModal = useModal(VideoAddModal);
  const quizAddModal = useModal(QuizAddModal);
  const [videos, setVideos] = useState<
    { description: string; url: string; title: string }[]
  >([]);

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
          quizAddModal.show({
            mode: 'quiz',
            onSubmit: async () => {},
          }),
      },
      {
        title: 'Quiz: Multiple Choice',
        icon: QuizIcon,
        iconColor: 'primary',
        onClick: () =>
          quizAddModal.show({
            mode: 'options',
            onSubmit: async () => {},
          }),
      },
    ];
  }, [videoAddModal, handleVideoAdd, quizAddModal]);

  const handleAddUnit = useCallback(async () => {
    const { data, flags } = await addUnit({ title, description });
    if (flags.isSuccess && !!data) {
      const videosWithUnitId = videos.map((video) => ({
        ...video,
        unitId: data.id,
      }));

      const { data: videosData, flags: videosFlags } =
        await addVideos(videosWithUnitId);
      if (videosFlags.isSuccess && !!videosData) {
        addVideosOnUnitByUnitId(data.id, videosData);
      }
    }
  }, [addUnit, addVideos, addVideosOnUnitByUnitId, description, title, videos]);

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

        <Stack spacing={2} divider={<Divider />}>
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
        </Stack>
      </Stack>
    </ModalContainer>
  );
});
export default UnitAddModal;
