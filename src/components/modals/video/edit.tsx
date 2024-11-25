import ModalContainer from '@/components/modals/container';
import CustomReactPlayer from '@/components/players/custom-react-player';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type VideoEditModalProps = {
  video: {
    title: string;
    description: string;
    url: string;
  };
  onSubmit: (params: {
    title: string;
    description: string;
    url: string;
  }) => void;
};
const VideoEditModal = NiceModal.create(
  ({ video, onSubmit }: VideoEditModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [newTitle, setNewTitle] = useState(video.title);
    const [newDescription, setNewDescription] = useState(video.description);
    const [newUrl, setNewUrl] = useState(video.url);
    return (
      <ModalContainer
        title="Video Edit"
        submitButtonTitle="Edit"
        open={visible}
        onClose={remove}
        onSubmit={async () => {
          await onSubmit({
            title: newTitle,
            description: newDescription,
            url: newUrl,
          });
          remove();
        }}
      >
        <Stack spacing={4} direction="row" sx={{ width: 1080, height: 565 }}>
          <Box sx={{ width: '55%' }}>
            <CustomReactPlayer
              url={newUrl}
              controls
              width="100%"
              height={405}
            />
          </Box>
          <Box sx={{ width: '45%' }}>
            <Stack spacing={2}>
              <TextField
                label="Url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <TextField
                label="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                multiline
                rows={4}
                label="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Stack>
          </Box>
        </Stack>
      </ModalContainer>
    );
  },
);
export default VideoEditModal;
