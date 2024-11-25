import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SerializedVideoNote } from '@/managers/video-note/interface';

type VideoNoteItemProps = SerializedVideoNote & {
  onDelete: () => void;
  onPlayWithTime: () => void;
};
export default function VideoNoteItem({
  title,
  description,
  displayTime,
  onDelete,
  onPlayWithTime,
}: VideoNoteItemProps) {
  return (
    <Accordion
      disableGutters
      sx={{ border: '1px solid #e0e0e0', borderRadius: 1.5 }}
    >
      <AccordionSummary
        sx={{
          minHeight: 40,
          maxHeight: 40,
          '&.Mui-expanded': {
            minHeight: 40,
          },
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
      >
        {title} ({displayTime})
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        {description}
        <Typography
          sx={{
            display: 'inline',
            color: 'primary.main',
            ml: 1,
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          variant="subtitle2"
          onClick={onPlayWithTime}
        >
          Play
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
