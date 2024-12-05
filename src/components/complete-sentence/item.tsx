import { Paper, TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
const sentence =
  'The washing machine is washing the text washing washing washing washing washing washing washing washing washing.';
const words = [
  { id: 1, word: 'washing', index: 1 },
  { id: 2, word: 'machine', index: 2 },
  { id: 4, word: 'washing', index: 4 },
];

type AnswerTextFieldProps = {
  answer: string;
};
const AnswerTextField = ({ answer }: AnswerTextFieldProps) => {
  const [value, setValue] = useState('');

  const isSuccess = useMemo(() => {
    return value === answer;
  }, [answer, value]);

  return (
    <TextField
      size="small"
      variant="standard"
      sx={{
        maxWidth: 120,
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

export default function CompleteSentenceItem() {
  const render = useMemo(() => {
    const sentences = sentence.split(' ');
    return sentences.map((word, index) => {
      return (
        <React.Fragment key={word + index}>
          {words.find((w) => {
            return w.word === word && w.index === index;
          }) ? (
            <AnswerTextField answer={word} />
          ) : (
            word
          )}{' '}
        </React.Fragment>
      );
    });
  }, []);
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
    </Paper>
  );
}
