import CircularProgressWithLabel from '@/components/progress/circular-progress-with-label';
import { useGemini } from '@/managers/gemini/hook';
import { Stack, Typography, TextField, Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import { ReactTyped } from 'react-typed';
import LoadingButton from '@mui/lab/LoadingButton';
import { convertMillisecondsToSeconds } from '@/utils/convert-milisecons-to-seconds';
import { AnswerFromAI } from '@/managers/ai-question/interface';
export default function SentenceWithAiItem() {
  const [answer, setAnswer] = useState('');
  const { isLoading, getAnswerFromAI, isPaused, pauseTime } = useGemini();
  const [AIResult, setAIResult] = useState<AnswerFromAI>();

  const handleCheckWithAi = useCallback(async () => {
    const result = await getAnswerFromAI(answer);
    setAIResult(result);
  }, [answer, getAnswerFromAI]);

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

        <LoadingButton
          variant="contained"
          color="primary"
          size="small"
          disabled={!answer || isLoading || isPaused}
          sx={{ width: 'fit-content', ml: 'auto', mt: 2 }}
          loading={isLoading}
          onClick={handleCheckWithAi}
        >
          {isPaused
            ? `Paused: ${convertMillisecondsToSeconds(pauseTime)}s`
            : 'Check with AI'}
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
