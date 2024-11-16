import useToastManager from '@/hooks/use-toast';
import { Button, Stack } from '@mui/material';

export default function UiTesting() {
  const { successToast } = useToastManager();
  return (
    <Stack direction={'row'} spacing={4}>
      <Button
        variant="contained"
        onClick={() => {
          successToast();
        }}
      >
        Test Toast
      </Button>
    </Stack>
  );
}
