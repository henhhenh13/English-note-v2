import { TextField, Stack, Button, Paper, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

type QuizFormProps = {
  onAdd: (answer: string, question: string) => void;
};

export default function QuizForm({ onAdd }: QuizFormProps) {
  const [answer, setAnswer] = useState<string>('');
  const [question, setQuestion] = useState<string>('');

  const clear = useCallback(() => {
    setAnswer('');
    setQuestion('');
  }, []);

  return (
    <Paper sx={{ p: 2, width: '40%', height: 'fit-content' }} elevation={4}>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={500}>
            Question
          </Typography>
        </Stack>

        <TextField
          label="Question"
          size="small"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <TextField
          label="Answer"
          size="small"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onAdd(answer, question);
              clear();
            }}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
