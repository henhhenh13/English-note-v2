import { Button, Stack } from '@mui/material';

import { Typography } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoViewModal from '@/components/modals/video/view';
import { useModal } from '@ebay/nice-modal-react';
import VideoEditModal from '@/components/modals/video/edit';

type ExerciseVideoProps = {
  mode?: 'view' | 'edit';
  title: string;
  description: string;
  url: string;
  id?: string;
  onEdit?: (video: { title: string; description: string; url: string }) => void;
  onDelete?: () => void;
};
export default function ExerciseVideo({
  url,
  title,
  description,
  id,
  mode = 'view',
  onEdit,
  onDelete,
}: ExerciseVideoProps) {
  const videoViewModal = useModal(VideoViewModal);
  const videoEditModal = useModal(VideoEditModal);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        cursor: 'pointer',
        gap: 1,
        width: '100%',
        '&:hover': {
          color: 'primary.main',
          textDecoration: 'underline',
          transition: 'all 0.3s ease',
        },
      }}
      onClick={() => {
        if (mode === 'view') {
          videoViewModal.show({ url, description, id, title });
        }
        if (mode === 'edit' && onEdit) {
          videoEditModal.show({
            video: { title, description, url },
            onSubmit: onEdit,
          });
        }
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <YouTubeIcon color="error" />
        <Typography variant="body1">{title}</Typography>
      </Stack>

      {mode === 'edit' && !!onDelete && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          variant="contained"
          size="small"
          color="error"
        >
          Delete
        </Button>
      )}
    </Stack>
  );
}
