import useToastManager from '@/hooks/use-toast';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

type AnswerTextFieldProps = {
  answer: string;
};
const AnswerTextField = ({ answer }: AnswerTextFieldProps) => {
  const { successToast } = useToastManager();
  const [value, setValue] = useState('');

  const isSuccess = useMemo(() => {
    return value === answer;
  }, [answer, value]);

  useEffect(() => {
    if (isSuccess) {
      successToast('Correct');
    }
  }, [isSuccess, successToast]);

  return (
    <TextField
      size="small"
      variant="standard"
      sx={{
        maxWidth: 80,
        mx: 0.5,
        input: {
          color: !value ? 'black' : isSuccess ? 'green' : 'red',
          textAlign: 'center',
        },
      }}
      autoComplete="off"
      color={!value ? 'primary' : isSuccess ? 'success' : 'error'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

type CompleteSentenceItemProps = {
  selectedWords: { word: string; index: number; id: string }[];
  sentence: string;
  onDelete?: () => void;
};
export default function CompleteSentenceItem({
  selectedWords,
  sentence,
  onDelete,
}: CompleteSentenceItemProps) {
  const render = useMemo(() => {
    const sentences = sentence.split(' ');
    return sentences.map((word, index) => {
      return (
        <React.Fragment key={word + index}>
          {selectedWords.find((w) => {
            return w.word === word && w.index === index;
          }) ? (
            <AnswerTextField answer={word} />
          ) : (
            word
          )}{' '}
        </React.Fragment>
      );
    });
  }, [selectedWords, sentence]);
  return (
    <Paper
      sx={{
        py: 1,
        px: 2,
        borderColor: 'primary.main',
      }}
      variant="outlined"
    >
      <Typography variant="body1" lineHeight={2.1}>
        {render}
      </Typography>
      {onDelete && (
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Stack>
      )}
    </Paper>
  );
}
