import { Link } from '@mui/material';

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
};
export default function ExerciseVideo({
  url,
  title,
  description,
  id,
  mode = 'view',
  onEdit,
}: ExerciseVideoProps) {
  const videoViewModal = useModal(VideoViewModal);
  const videoEditModal = useModal(VideoEditModal);
  return (
    <Link
      component="button"
      underline="hover"
      variant="body2"
      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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
      <YouTubeIcon color="error" />
      <Typography variant="body1">{title}</Typography>
    </Link>
  );
}
