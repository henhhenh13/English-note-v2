import UnitItem from '@/components/units/item';
import useUnitsManager from '@/managers/unit/manager';
import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
export default function UnitList() {
  const { units } = useUnitsManager();
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, maxWidth: 'md' }}
      >
        <Typography variant="h5" gutterBottom>
          Units
        </Typography>
        <Button variant="contained">Add Unit</Button>
      </Stack>

      <Stack spacing={3} sx={{ maxWidth: 'md' }}>
        {units.map((unit) => (
          <UnitItem key={unit.id} unit={unit} />
        ))}
      </Stack>
    </div>
  );
}
