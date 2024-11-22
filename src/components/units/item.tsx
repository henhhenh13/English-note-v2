import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Divider,
  Paper,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Unit } from '@/managers/unit/interface';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
              <Link
                component="button"
                underline="hover"
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                <YouTubeIcon color="error" />
                <Typography variant="body1">Lesson 1</Typography>
              </Link>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </div>
    </Paper>
  );
}
