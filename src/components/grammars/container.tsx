import GrammarContent from '@/components/grammars/content';
import GrammarItem from '@/components/grammars/item';
import GrammarAddModal from '@/components/modals/grammar/add';
import useToastManager from '@/hooks/use-toast';
import useGrammarManager from '@/managers/grammar/manager';
import { useModal } from '@ebay/nice-modal-react';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

export default function GrammarsContainer() {
  const { grammars, addGrammar } = useGrammarManager();
  const grammarAddModal = useModal(GrammarAddModal);

  const { successToast } = useToastManager();

  const [activeGrammarId, setActiveGrammarId] = useState(grammars[0].id);

  const activeGrammar = useMemo(() => {
    const grammar = grammars.find((item) => item.id === activeGrammarId);
    if (grammar) return grammar;

    return grammars[0];
  }, [activeGrammarId, grammars]);

  const handleAddGrammar = useCallback(
    async (title: string, description: string, content: string) => {
      const { isSuccess } = await addGrammar({ title, description, content });

      if (isSuccess) {
        successToast('Grammar added successfully');
      }
    },
    [addGrammar, successToast],
  );

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
        <Button
          variant="contained"
          onClick={() => grammarAddModal.show({ onSubmit: handleAddGrammar })}
        >
          Add Grammar
        </Button>
      </Stack>

      <Stack spacing={2} direction="row">
        <Stack spacing={1.5}>
          {grammars.map((item) => (
            <GrammarItem
              key={item.id}
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
