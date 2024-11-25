import convertToHMS from '@/utils/convert-stringt-hms';
import { Paper, Stack, Typography, Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';

type VideoNoteFormProps = {
  videoTime: number;
  onSubmit: (title: string, description: string) => void;
};
export default function VideoNoteForm({
  videoTime,
  onSubmit,
}: VideoNoteFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const clearForm = useCallback(() => {
    setTitle('');
    setDescription('');
  }, []);

  return (
    <Paper elevation={4} sx={{ p: 2, minWidth: 300 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Create note time</Typography>
          <Button variant="text" color="primary">
            time: {convertToHMS(videoTime)}
          </Button>
        </Stack>
        <Stack spacing={2}>
          <TextField
            label="Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        <Stack>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ ml: 'auto' }}
            onClick={() => {
              onSubmit(title, description);
              clearForm();
            }}
          >
            Add Note
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
