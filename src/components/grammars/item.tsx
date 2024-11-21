import { Grammar } from '@/managers/grammar/interface';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Button, Stack, Typography } from '@mui/material';

type GrammarItemProps = {
  item: Grammar;
  isActive: boolean;
  onClick: () => void;
};

export default function GrammarItem({
  item,
  isActive,
  onClick,
}: GrammarItemProps) {
  return (
    <Button
      sx={{
        textTransform: 'none',
        textAlign: 'left',
        minWidth: 400,
        display: 'block',
        borderColor: isActive ? 'primary.main' : 'grey.300',
      }}
      onClick={onClick}
      variant="outlined"
      color={isActive ? 'primary' : 'inherit'}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1 }}>
        <AccessTimeIcon color="primary" />
        <div>
          <Typography variant="h6" fontSize={18} fontWeight={600}>
            {item.title}
          </Typography>
          <Typography color="text.secondary" fontSize={15} variant="body1">
            {item.description}
          </Typography>
        </div>
      </Stack>
    </Button>
  );
}
