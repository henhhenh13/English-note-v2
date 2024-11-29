import { Paper, Stack, Box, Typography, Button } from '@mui/material';

export default function QuizAddItem() {
  return (
    <Paper elevation={4} sx={{ p: 1.5 }} variant="outlined">
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            minWidth: 30,
            minHeight: 30,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 20,
          }}
        >
          1
        </Box>
        <Stack>
          <Typography variant="body1" fontWeight={500}>
            Question
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </Typography>
        </Stack>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </Stack>
    </Paper>
  );
}
