import {
  TextField,
  Stack,
  Button,
  Chip,
  Typography,
  Paper,
} from '@mui/material';
import { useCallback, useState } from 'react';

type OptionsFormProps = {
  onAdd: (options: string[], correctOption: string) => void;
};

export default function OptionsForm({ onAdd }: OptionsFormProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState<string>('');
  const [correctOption, setCorrectOption] = useState<string>('');
  const [question, setQuestion] = useState<string>('');

  const handleAddOption = useCallback(() => {
    setOptions([...options, option]);
    setOption('');
  }, [option, options]);

  const handleDeleteOption = useCallback(
    (index: number) => {
      setOptions(options.filter((_, i) => i !== index));
    },
    [options],
  );

  const clear = useCallback(() => {
    setOptions([]);
    setOption('');
    setCorrectOption('');
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
          label="Correct Option"
          size="small"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
        />
        <Stack direction="row" spacing={1}>
          <TextField
            sx={{ flex: 1 }}
            label="Option"
            size="small"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddOption}>
            Add option
          </Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          {!!options.length &&
            options.map((option, index) => (
              <Chip
                key={option}
                label={option}
                variant="outlined"
                onDelete={() => handleDeleteOption(index)}
              />
            ))}
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onAdd(options, correctOption);
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
