import { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Pagination, Typography, Button } from '@mui/material';
import useThemeManager from '@/managers/theme/manager';
import ThemeItem from '@/components/themes/item';
import useToastManager from '@/hooks/use-toast';
import { useModal } from '@ebay/nice-modal-react';
import ThemeAddModal from '@/components/modals/theme/add';

const ITEMS_PER_PAGE = 2;

export default function ThemeList() {
  const { themes, flags, addTheme } = useThemeManager();
  const themeAddModal = useModal(ThemeAddModal);

  const [currentPage, setCurrentPage] = useState(1);
  const { successToast } = useToastManager();

  const totalPages = useMemo(() => {
    return Math.ceil(themes.length / ITEMS_PER_PAGE);
  }, [themes.length]);

  const paginatedThemes = useMemo(() => {
    return themes.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [themes, currentPage]);

  const handlePageChange = useCallback((_event: unknown, page: number) => {
    setCurrentPage(page);
  }, []);

  const shouldShowPagination = useMemo(() => {
    return flags.isSuccess && themes.length > ITEMS_PER_PAGE;
  }, [flags.isSuccess, themes.length]);

  const handleAddTheme = useCallback(
    async (title: string, description: string) => {
      const { isSuccess } = await addTheme(title, description);
      if (isSuccess) {
        successToast('Theme added successfully');
        setCurrentPage(Math.ceil((themes.length + 1) / ITEMS_PER_PAGE));
      }
    },
    [addTheme, successToast, themes.length],
  );

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Themes
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => themeAddModal.show({ onSubmit: handleAddTheme })}
        >
          Add Theme
        </Button>
      </Stack>

      <Stack spacing={4}>
        <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap' }}>
          {flags.isSuccess &&
            paginatedThemes.length > 0 &&
            paginatedThemes.map((theme: Theme) => (
              <ThemeItem key={theme.id} {...theme} />
            ))}
        </Stack>

        {shouldShowPagination && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Stack>
    </div>
  );
}
