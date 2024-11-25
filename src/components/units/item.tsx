import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Unit } from '@/managers/unit/interface';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ExerciseVideo from '@/components/exercises/video';
type UnitItemProps = {
  unit: Unit;
};
export default function UnitItem({ unit }: UnitItemProps) {
  return (
    <Paper elevation={5} sx={{ py: 1, px: 2, pb: 0 }}>
      <Stack direction="row" spacing={3} alignItems="center" mb={2}>
        <Paper sx={{ p: 1 }} elevation={3}>
          <CastForEducationIcon fontSize="medium" color="primary" />
        </Paper>
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            {unit.title}
          </Typography>
          <Typography variant="body1">{unit.description}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <div>
        <Accordion disableGutters sx={{ boxShadow: 'none', border: 'none' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Lesson 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              {!!unit.videos &&
                unit.videos.map((video) => (
                  <ExerciseVideo
                    id={video.id}
                    key={video.id}
                    url={video.url}
                    title={video.title}
                    description={video.description}
                  />
                ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </div>
    </Paper>
  );
}
