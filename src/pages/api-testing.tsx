import useVocabularyApi from '@/managers/vocabulary/api';
import { Stack, Typography, Button } from '@mui/material';

export default function ApiTestingPage() {
  const { fetchVocabularies } = useVocabularyApi();

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

      <Button variant="contained">Fetch themes</Button>
    </Stack>
  );
}
