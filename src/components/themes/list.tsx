import { useCallback, useState } from 'react';
import { Box, Stack, Pagination } from '@mui/material';
import useThemeManager from '@/managers/theme/manager';
import ThemeItem from '@/components/themes/item';

export default function ThemeList() {
  const { themes, flags } = useThemeManager();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(themes.length / itemsPerPage);
  const paginatedThemes = themes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = useCallback((_e: unknown, page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <Stack spacing={4}>
      <Stack useFlexGap sx={{ flexWrap: 'wrap' }} direction="row" spacing={4}>
        {flags.isSuccess && paginatedThemes.length
          ? paginatedThemes.map((item) => <ThemeItem key={item.id} {...item} />)
          : null}
      </Stack>
      {flags.isSuccess && themes.length > itemsPerPage && (
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
  );
}
