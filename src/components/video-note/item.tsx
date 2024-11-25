import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function VideoNoteItem() {
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
        Accordion 1
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
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
        >
          Play
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
