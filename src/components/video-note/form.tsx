import { Paper, Stack, Typography, Button, TextField } from '@mui/material';

export default function VideoNoteForm() {
  return (
    <Paper elevation={4} sx={{ p: 2, minWidth: 300 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Create note time</Typography>
          <Button variant="text" color="primary">
            time: 10:00
          </Button>
        </Stack>
        <Stack spacing={2}>
          <TextField label="Title" size="small" />
          <TextField label="Description" multiline rows={3} size="small" />
        </Stack>
        <Stack>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ ml: 'auto' }}
          >
            Add Note
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
