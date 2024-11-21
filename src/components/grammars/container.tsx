import GrammarContent from '@/components/grammars/content';
import GrammarItem from '@/components/grammars/item';
import useGrammarManager from '@/managers/grammar/manager';
import { Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

export default function GrammarsContainer() {
  const { grammars } = useGrammarManager();

  const [activeGrammarId, setActiveGrammarId] = useState(grammars[0].id);

  const activeGrammar = useMemo(() => {
    const grammar = grammars.find((item) => item.id === activeGrammarId);
    if (grammar) return grammar;

    return grammars[0];
  }, [activeGrammarId, grammars]);
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

      <Stack spacing={2} direction="row">
        <Stack spacing={1.5}>
          {grammars.map((item) => (
            <GrammarItem
              item={item}
              isActive={activeGrammarId === item.id}
              onClick={() => setActiveGrammarId(item.id)}
            />
          ))}
        </Stack>
        <GrammarContent grammar={activeGrammar} />
      </Stack>
    </div>
  );
}
