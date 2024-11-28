import { QuizQuestionItem } from '@/managers/quiz/interface';
import { Paper, Stack, Box, Typography } from '@mui/material';

type QuizItemProps = QuizQuestionItem & {
  index: number;
  isActive: boolean;
};
export default function QuizItem({
  question,
  answer,
  index,
  isActive,
}: QuizItemProps) {
  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        ...(isActive && { backgroundColor: 'primary.light' }),
      }}
      elevation={3}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          ...(isActive && {
            color: 'white',
          }),
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 20,
            }}
          >
            {index}
          </Box>
          <Typography variant="body1">{question}</Typography>
        </Stack>

        <Box>-</Box>

        <Stack direction="row" alignItems="center" gap={1}>
          {answer}
        </Stack>
      </Stack>
    </Paper>
  );
}
