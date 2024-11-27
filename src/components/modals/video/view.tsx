import ModalContainer from '@/components/modals/container';
import VideoNoteForm from '@/components/video-note/form';
import VideoNoteList from '@/components/video-note/list';
import useVideoNoteManager from '@/managers/video-note/manager';
import generateUUID from '@/utils/generator-uuid';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import YouTubeIcon from '@mui/icons-material/YouTube';

type VideoViewModalProps = {
  url: string;
  title: string;
  description: string;
  id: string;
};
const VideoViewModal = NiceModal.create(
  ({
    url,
    title,
    description,
    id,
  }: VideoViewModalProps): React.ReactElement => {
    const { visible, remove } = useModal();
    const { getVideoNotesByVideoId, addVideoNote, deleteVideoNoteById } =
      useVideoNoteManager();
    const [videoTime, setVideoTime] = useState(0);
    const playerRef = useRef<ReactPlayer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const videoNotesFiltered = useMemo(() => {
      return getVideoNotesByVideoId(id);
    }, [getVideoNotesByVideoId, id]);

    const handleAddVideoNote = useCallback(
      (title: string, description: string) => {
        addVideoNote({
          title,
          description,
          id: generateUUID(),
          time: videoTime,
          videoId: id,
        });
      },
      [addVideoNote, id, videoTime],
    );

    const handleDeleteVideoNote = useCallback(
      (id: string) => {
        deleteVideoNoteById(id);
      },
      [deleteVideoNoteById],
    );

    const handleProgress = useCallback(
      ({ playedSeconds }: { playedSeconds: number }) => {
        setVideoTime(playedSeconds);
      },
      [],
    );

    const handlePlayWithTime = useCallback((time: number) => {
      if (playerRef.current && time) {
        playerRef.current.seekTo(time);
        setIsPlaying(true);
      }
    }, []);

    return (
      <ModalContainer
        title={title}
        submitButtonTitle="Add"
        open={visible}
        onClose={remove}
        maxWidth="xl"
        titleIcon={YouTubeIcon}
      >
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          sx={{ width: 1280, height: 565 }}
        >
          <Box sx={{ width: '50%' }}>
            <ReactPlayer
              onProgress={handleProgress}
              url={url}
              playing={isPlaying}
              controls
              width="100%"
              height={405}
              ref={playerRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <Paper elevation={4} sx={{ mt: 2, p: 2 }}>
              <Typography variant="body1">{description}</Typography>
            </Paper>
          </Box>
          <Box sx={{ width: '40%' }}>
            <Stack spacing={2}>
              <VideoNoteList
                onPlayWithTime={handlePlayWithTime}
                onDelete={handleDeleteVideoNote}
                videoNotes={videoNotesFiltered}
              />
              <Stack direction="row" justifyContent="flex-end">
                <VideoNoteForm
                  status={isPlaying ? 'play' : 'pause'}
                  videoTime={videoTime}
                  onSubmit={handleAddVideoNote}
                  onPlayButtonClick={() => {
                    setIsPlaying((prevState) => !prevState);
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </ModalContainer>
    );
  },
);
export default VideoViewModal;
