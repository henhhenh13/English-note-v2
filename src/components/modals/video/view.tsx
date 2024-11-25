import ModalContainer from '@/components/modals/container';
import CustomReactPlayer from '@/components/players/custom-react-player';
import VideoNoteForm from '@/components/video-note/form';
import VideoNoteList from '@/components/video-note/list';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Paper, Stack, Typography } from '@mui/material';
type VideoViewModalProps = {
  url: string;
  description: string;
};
const VideoViewModal = NiceModal.create(
  ({ url, description }: VideoViewModalProps): React.ReactElement => {
    const { visible, remove } = useModal();

    return (
      <ModalContainer
        title="Video View"
        submitButtonTitle="Add"
        open={visible}
        onClose={remove}
        maxWidth="xl"
      >
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          sx={{ width: 1280, height: 565 }}
        >
          <Box sx={{ width: '50%' }}>
            <CustomReactPlayer url={url} controls width="100%" height={405} />
            <Paper elevation={4} sx={{ mt: 2, p: 2 }}>
              <Typography variant="body1">{description}</Typography>
            </Paper>
          </Box>
          <Box sx={{ width: '40%' }}>
            <Stack spacing={2}>
              <VideoNoteList />
              <Stack direction="row" justifyContent="flex-end">
                <VideoNoteForm />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </ModalContainer>
    );
  },
);
export default VideoViewModal;
