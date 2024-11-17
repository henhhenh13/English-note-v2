import useThemeManager from '@/managers/theme/manager';
import useVocabularyApi from '@/managers/vocabulary/api';
import { Stack, Typography, Button } from '@mui/material';
import { useCallback } from 'react';

export default function ApiTestingPage() {
  const { fetchVocabularies } = useVocabularyApi();
  const { fetchThemes, themeCollection } = useThemeManager();

  const handleFetch = useCallback(async () => {
    await fetchThemes();
  }, [fetchThemes]);

  console.log(themeCollection);
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

      <Button onClick={handleFetch} variant="contained">
        Fetch themes
      </Button>
    </Stack>
  );
}
