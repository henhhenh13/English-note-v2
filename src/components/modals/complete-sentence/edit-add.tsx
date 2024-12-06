import CompleteSentenceItem from '@/components/complete-sentence/item';
import ModalContainer from '@/components/modals/container';
import generateUUID from '@/utils/generator-uuid';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

const CompleteSentenceEditAddModal = NiceModal.create(
  (): React.ReactElement => {
    const { visible, remove } = useModal();
    const [title, setTitle] = useState('');
    const [sentence, setSentence] = useState('');
    const [suggestWord, setSuggestWord] = useState('');
    const [suggestWords, setSuggestWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<
      { index: number; word: string; id: string }[]
    >([]);
    const [completeSentences, setCompleteSentences] = useState<
      {
        sentence: string;
        selectedWords: { index: number; word: string; id: string }[];
      }[]
    >([]);

    const handleAddSuggestWord = useCallback(() => {
      setSuggestWords((prev) => [...prev, suggestWord]);
      setSuggestWord('');
    }, [suggestWord]);

    const handleDeleteSuggestWord = useCallback((index: number) => {
      setSuggestWords((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const sentenceArray = useMemo(() => {
      if (sentence.length === 0) return [];
      return sentence.split(' ');
    }, [sentence]);

    const handleUpdateSelectedWord = useCallback(
      (index: number, word: string) => {
        const hasWord = selectedWords.some(
          (w) => w.index === index && w.word === word,
        );
        if (hasWord) {
          setSelectedWords((prev) =>
            prev.filter((w) => !(w.index === index && w.word === word)),
          );
          return;
        } else {
          setSelectedWords((prev) => [
            ...prev,
            { index, word, id: generateUUID() },
          ]);
        }
      },
      [selectedWords],
    );

    const handleAddCompleteSentence = useCallback(() => {
      setCompleteSentences((prev) => [
        ...prev,
        {
          sentence,
          selectedWords,
        },
      ]);
      setSelectedWords([]);
      setSentence('');
    }, [sentence, selectedWords]);

    const handleDeleteCompleteSentence = useCallback((index: number) => {
      setCompleteSentences((prev) => prev.filter((_, i) => i !== index));
    }, []);

    return (
      <ModalContainer
        title="Complete Sentence Add"
        open={visible}
        onClose={remove}
      >
        <Stack sx={{ px: 4, width: 960 }} spacing={3} direction="row">
          <Stack sx={{ width: '45%' }} spacing={3}>
            <TextField
              variant="outlined"
              label="Title"
              color="primary"
              fullWidth
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Paper sx={{ py: 1.5, px: 2 }} elevation={4}>
              <Stack spacing={1.5}>
                <Typography variant="h6">Add Sentence</Typography>
                <TextField
                  variant="outlined"
                  label="Sentence"
                  color="primary"
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  value={sentence}
                  onChange={(e) => {
                    setSelectedWords([]);
                    setSentence(e.target.value);
                  }}
                />
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  {!!sentenceArray.length &&
                    sentenceArray.map((word, index) => (
                      <Chip
                        key={index}
                        label={word}
                        sx={{ px: 1 }}
                        color={
                          selectedWords.some(
                            (w) => w.index === index && w.word === word,
                          )
                            ? 'primary'
                            : 'default'
                        }
                        onClick={() => handleUpdateSelectedWord(index, word)}
                      />
                    ))}
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    onClick={handleAddCompleteSentence}
                  >
                    Add Sentence
                  </Button>
                </Stack>
              </Stack>
            </Paper>

            <Paper sx={{ py: 1.5, px: 2 }} elevation={4}>
              <Stack spacing={1.5}>
                <Typography variant="h6">Add Suggest Words</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TextField
                    variant="outlined"
                    label="Suggest Word"
                    color="primary"
                    fullWidth
                    size="small"
                    value={suggestWord}
                    onChange={(e) => setSuggestWord(e.target.value)}
                  />
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="contained" onClick={handleAddSuggestWord}>
                    Add Suggest Word
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
          <Paper
            sx={{ py: 1.5, px: 2, width: '55%', minHeight: 400 }}
            variant="outlined"
          >
            {!!suggestWords.length && (
              <Paper variant="outlined" sx={{ py: 1.5, px: 2 }}>
                <Stack gap={1} direction="row" flexWrap="wrap">
                  {suggestWords.map((word, index) => (
                    <Chip
                      key={word}
                      label={word}
                      variant="outlined"
                      sx={{ px: 1 }}
                      onDelete={() => handleDeleteSuggestWord(index)}
                    />
                  ))}
                </Stack>
              </Paper>
            )}

            <Paper sx={{ py: 1.5, px: 2, mt: 2 }} elevation={4}>
              <Stack
                spacing={2}
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  height: 500,
                  maxHeight: 500,
                  overflowY: 'auto',
                }}
              >
                {!!completeSentences.length &&
                  completeSentences.map((sentence, index) => (
                    <CompleteSentenceItem
                      key={index}
                      {...sentence}
                      onDelete={() => handleDeleteCompleteSentence(index)}
                    />
                  ))}
              </Stack>
            </Paper>
          </Paper>
        </Stack>
      </ModalContainer>
    );
  },
);
export default CompleteSentenceEditAddModal;
