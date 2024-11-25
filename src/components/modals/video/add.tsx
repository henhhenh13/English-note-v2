import ModalContainer from '@/components/modals/container';
import CustomReactPlayer from '@/components/players/custom-react-player';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type VideoAddModalProps = {
  onSubmit: (params: {
    title: string;
    description: string;
    url: string;
  }) => void;
};
const VideoAddModal = NiceModal.create(
  ({ onSubmit }: VideoAddModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    return (
      <ModalContainer
        title="Video Add"
        submitButtonTitle="Add"
        open={visible}
        onClose={remove}
        onSubmit={async () => {
          await onSubmit({ title, description, url });
          remove();
        }}
      >
        <Stack spacing={4} direction="row" sx={{ width: 1080, height: 565 }}>
          <Box sx={{ width: '55%' }}>
            <CustomReactPlayer url={url} controls width="100%" height={405} />
          </Box>
          <Box sx={{ width: '45%' }}>
            <Stack spacing={2}>
              <TextField
                label="Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                multiline
                rows={4}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
          </Box>
        </Stack>
      </ModalContainer>
    );
  },
);
export default VideoAddModal;
