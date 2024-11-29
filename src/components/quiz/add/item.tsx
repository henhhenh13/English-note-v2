import { Paper, Stack, Box, Typography, Button, Chip } from '@mui/material';
import { QuizQuestionItem } from '@/managers/quiz/interface';

type QuizAddItemProps = QuizQuestionItem & {
  isMultipleChoice: boolean;
  index: number;
  onDelete: () => void;
};

export default function QuizAddItem({
  question,
  answer,
  index,
  isMultipleChoice,
  options,
  onDelete,
}: QuizAddItemProps) {
  return (
    <Paper sx={{ p: 1.5 }} variant="outlined">
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
          {index}
        </Box>
        <Stack sx={{ flex: 1 }}>
          <Typography variant="body1" fontWeight={500}>
            {question}
          </Typography>

          {isMultipleChoice ? (
            <Stack spacing={1}>
              <Typography variant="body2">Your Answers:</Typography>
              <Stack direction="row" spacing={1}>
                {options.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    color={option === answer ? 'success' : 'default'}
                  />
                ))}
              </Stack>
            </Stack>
          ) : (
            <Typography variant="body2">Your Answer: {answer}</Typography>
          )}
        </Stack>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </Stack>
    </Paper>
  );
}
