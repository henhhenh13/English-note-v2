import { Grammar } from '@/managers/grammar/interface';

import { Box, Grow, Paper, Stack, Typography } from '@mui/material';

type GrammarContentProps = {
  grammar: Grammar;
};

export default function GrammarContent({ grammar }: GrammarContentProps) {
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 300 }}>
      <Paper elevation={6} sx={{ p: 2, minWidth: 500 }}>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h4" color="primary">
            {grammar.title}
          </Typography>
          <Typography variant="body1" color="primary">
            ({grammar.description})
          </Typography>
        </Stack>
        <Box sx={{ maxHeight: 'calc(100vh - 220px)', overflow: 'auto', px: 2 }}>
          <div
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: grammar.content,
            }}
          />
        </Box>
      </Paper>
    </Grow>
  );
}
