import CircularProgressWithLabel from '@/components/progress/circular-progress-with-label';
import useGeminiApi from '@/managers/gemini/api';
import { cleanText, getPromptQuiz } from '@/managers/gemini/helper';
import { Stack, Typography, TextField, Button, Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import { ReactTyped } from 'react-typed';

export default function SentenceWithAiItem() {
  const [answer, setAnswer] = useState('');
  const { fetchText } = useGeminiApi();
  const [AIResult, setAIResult] = useState<{
    wrongWords: string[];
    correctAnswer: string;
    explanation: string;
    percent: number;
  }>();

  const handleCheckWithAi = useCallback(async () => {
    const explanation = await fetchText(getPromptQuiz(answer));

    setAIResult(JSON.parse(cleanText(explanation)));
  }, [answer, fetchText]);
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography>1. Have you got any brothers and sisters?</Typography>
          <CircularProgressWithLabel value={AIResult?.percent || 0} />
        </Stack>
        <TextField
          variant="standard"
          placeholder="Your answer"
          autoComplete="off"
          size="small"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        {AIResult && (
          <Typography variant="body2" mt={1} color="text.secondary">
            <ReactTyped strings={[AIResult.explanation]} typeSpeed={40} />
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ width: 'fit-content', ml: 'auto', mt: 2 }}
          size="small"
          disabled={!answer}
          onClick={handleCheckWithAi}
        >
          Check with AI
        </Button>
      </Stack>
    </Paper>
  );
}
