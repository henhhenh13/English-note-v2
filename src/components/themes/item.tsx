import CustomMenu, { CustomMenuProps } from '@/components/menu';
import VocabulariesTable from '@/components/vocabularies/table';
import { Theme } from '@/managers/theme/interface';
import { Paper, Stack, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThemeDeleteModal from '@/components/modals/theme/delete';
import ThemeEditModal from '@/components/modals/theme/edit';
import { useModal } from '@ebay/nice-modal-react';
import useThemeManager from '@/managers/theme/manager';
import useToastManager from '@/hooks/use-toast';
import { useCallback } from 'react';

type ThemeItemProps = Theme;
export default function ThemeItem({
  title,
  description,
  vocabularies,
  id,
}: ThemeItemProps) {
  const themeEditModal = useModal(ThemeEditModal);
  const themeDeleteModal = useModal(ThemeDeleteModal);
  const { successToast } = useToastManager();

  const { updateTheme, deleteTheme } = useThemeManager();

  const handleUpdateTheme = useCallback(
    async (title: string, description: string) => {
      const { isSuccess } = await updateTheme(id, title, description);
      if (isSuccess) {
        successToast('Theme updated successfully');
      }
    },
    [updateTheme, id, successToast],
  );

  const handleDeleteTheme = useCallback(async () => {
    const { isSuccess } = await deleteTheme(id);
    if (isSuccess) {
      successToast('Theme deleted successfully');
    }
  }, [deleteTheme, id, successToast]);

  const menuItems: CustomMenuProps['items'] = [
    {
      title: 'Edit',
      icon: EditIcon,
      iconColor: 'info',
      onClick: () =>
        themeEditModal.show({
          title,
          description,
          onSubmit: handleUpdateTheme,
        }),
    },
    {
      title: 'Delete',
      icon: DeleteForeverIcon,
      iconColor: 'error',
      onClick: () =>
        themeDeleteModal.show({
          id,
          onSubmit: handleDeleteTheme,
        }),
    },
  ];
  return (
    <Paper sx={{ width: '45%', p: 2 }} elevation={6}>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{title}</Typography>

          <CustomMenu items={menuItems} />
        </Stack>

        <Typography minHeight={80} variant="body2">
          {description}
        </Typography>

        <Box sx={{ height: 640 }}>
          <VocabulariesTable themeId={id} vocabularies={vocabularies} />
        </Box>
      </Stack>
    </Paper>
  );
}
