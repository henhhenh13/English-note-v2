import UnitAddModal from '@/components/modals/unit/add';
import UnitItem from '@/components/units/item';
import useUnitsManager from '@/managers/unit/manager';
import { useModal } from '@ebay/nice-modal-react';
import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
export default function UnitList() {
  const { units } = useUnitsManager();
  const { show } = useModal(UnitAddModal);
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
        <Button variant="contained" onClick={() => show()}>
          Add Unit
        </Button>
      </Stack>

      <Stack spacing={3} sx={{ maxWidth: 'md' }}>
        {units.map((unit) => (
          <UnitItem key={unit.id} unit={unit} />
        ))}
      </Stack>
    </div>
  );
}
