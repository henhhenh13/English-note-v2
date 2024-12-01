import useGeminiApi from '@/managers/gemini/api';
import useVocabularyApi from '@/managers/vocabulary/api';
import { Stack, Typography, Button } from '@mui/material';

export default function ApiTestingPage() {
  const { fetchVocabularies } = useVocabularyApi();
  const { fetchText } = useGeminiApi();

  return (
    <Stack spacing={4}>
      <Typography variant="h4">API Testing</Typography>
      <Button
        onClick={async () => {
          await fetchVocabularies();
        }}
        variant="contained"
      >
        Fetch vocabularies
      </Button>

      <Button
        onClick={async () => {
          await fetchText('What is love?');
        }}
        variant="contained"
      >
        Fetch text
      </Button>

      <Button variant="contained">Fetch themes</Button>
    </Stack>
  );
}
