import { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import VocabulariesTable from '@/components/vocabularies/table';
import useThemeManager from '@/managers/theme/manager';

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
          ? paginatedThemes.map(({ title, description, vocabularies, id }) => (
              <Paper key={id} sx={{ width: '45%', p: 2 }} elevation={6}>
                <Stack spacing={1}>
                  <Typography variant="h5">{title}</Typography>
                  {description && (
                    <Typography variant="body2">{description}</Typography>
                  )}
                  <Box sx={{ height: 640 }}>
                    <VocabulariesTable vocabularies={vocabularies} />
                  </Box>
                </Stack>
              </Paper>
            ))
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
