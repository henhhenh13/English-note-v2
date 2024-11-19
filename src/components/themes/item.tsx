import CustomMenu, { CustomMenuProps } from '@/components/menu';
import VocabulariesTable from '@/components/vocabularies/table';
import { Theme } from '@/managers/theme/interface';
import { Paper, Stack, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

type ThemeItemProps = Theme;
export default function ThemeItem({
  title,
  description,
  vocabularies,
  id,
}: ThemeItemProps) {
  const menuItems: CustomMenuProps['items'] = [
    {
      title: 'Add',
      icon: AddIcon,
      iconColor: 'info',
      onClick: () => console.log('Add'),
    },
    {
      title: 'Edit',
      icon: EditIcon,
      iconColor: 'info',
      onClick: () => console.log('Edit'),
    },
    {
      title: 'Delete',
      icon: DeleteForeverIcon,
      iconColor: 'error',
      onClick: () => console.log('Delete'),
    },
  ];
  return (
    <Paper sx={{ width: '45%', p: 2 }} elevation={6}>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{title}</Typography>
          {description && (
            <Typography variant="body2">{description}</Typography>
          )}
          <CustomMenu items={menuItems} />
        </Stack>

        <Box sx={{ height: 640 }}>
          <VocabulariesTable themeId={id} vocabularies={vocabularies} />
        </Box>
      </Stack>
    </Paper>
  );
}
