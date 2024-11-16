import TestModal from '@/components/modals/test';
import useToastManager from '@/hooks/use-toast';
import { useModal } from '@ebay/nice-modal-react';
import { Button, Stack } from '@mui/material';

export default function UiTesting() {
  const { successToast } = useToastManager();
  const testModal = useModal(TestModal);
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

      <Button
        variant="contained"
        onClick={() => {
          testModal.show();
        }}
      >
        Test Modal
      </Button>
    </Stack>
  );
}
