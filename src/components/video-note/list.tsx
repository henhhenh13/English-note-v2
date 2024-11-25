import VideoNoteItem from '@/components/video-note/item';
import { Box, Stack } from '@mui/material';

export default function VideoNoteList() {
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
        <VideoNoteItem />
        <VideoNoteItem />
        <VideoNoteItem />
        <VideoNoteItem />
        <VideoNoteItem />
        <VideoNoteItem />
        <VideoNoteItem />
      </Stack>
    </Box>
  );
}
