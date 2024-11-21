import useGrammarManager from '@/managers/grammar/manager';
import { Stack, Typography } from '@mui/material';

export default function GrammarsList() {
  const { list, flags } = useGrammarManager();
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Grammars
        </Typography>
      </Stack>
    </div>
  );
}
