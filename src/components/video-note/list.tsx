import VideoNoteItem from '@/components/video-note/item';
import { VideoNote } from '@/managers/video-note/interface';
import { Box, Stack } from '@mui/material';

type VideoNoteListProps = {
  videoNotes: VideoNote[];
  onPlayWithTime: (time: number) => void;
  onDelete: (id: string) => void;
};
export default function VideoNoteList({
  videoNotes,
  onDelete,
  onPlayWithTime,
}: VideoNoteListProps) {
  return (
    <Box
      sx={{
        mb: 2,
        minHeight: 295,
        maxHeight: 295,
        overflow: 'auto',
      }}
    >
      <Stack spacing={1}>
        {!!videoNotes.length &&
          videoNotes.map((videoNote) => (
            <VideoNoteItem
              key={videoNote.id}
              {...videoNote}
              onDelete={() => onDelete(videoNote.id)}
              onPlayWithTime={() => onPlayWithTime(videoNote.time)}
            />
          ))}
      </Stack>
    </Box>
  );
}
