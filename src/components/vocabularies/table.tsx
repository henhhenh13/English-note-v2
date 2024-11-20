import { Vocabulary } from '@/managers/vocabulary/interface';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPagination,
  GridRowParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, Stack, Tooltip } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import VocabularyEditModal from '@/components/modals/vocabulary/edit';
import useThemeManager from '@/managers/theme/manager';
import useVocabularyManager from '@/managers/vocabulary/manager';
import VocabularyDeleteModal from '@/components/modals/vocabulary/delete';
import useToastManager from '@/hooks/use-toast';
import VocabularyAddModal from '@/components/modals/vocabulary/add';

type VocabulariesTable = {
  themeId: string;
  vocabularies: Vocabulary[];
};

export default function VocabulariesTable({
  themeId,
  vocabularies,
}: VocabulariesTable) {
  const vocabularyEditModal = useModal(VocabularyEditModal);
  const vocabularyDeleteModal = useModal(VocabularyDeleteModal);
  const vocabularyAddModal = useModal(VocabularyAddModal);

  const { updateVocabulary, deleteVocabulary, addVocabulary } =
    useVocabularyManager();
  const {
    updateVocabularyByThemeId,
    deleteVocabularyByThemeId,
    addVocabularyByThemeId,
  } = useThemeManager();
  const { successToast } = useToastManager();

  const handleUpdateVocabulary = useCallback(
    async (params: Vocabulary) => {
      const { flags, data } = await updateVocabulary(params);

      if (flags.isSuccess && !!data) {
        updateVocabularyByThemeId(data);
        successToast('You was edited!');
      }
    },
    [successToast, updateVocabulary, updateVocabularyByThemeId],
  );
  const handleDeleteVocabulary = useCallback(
    async (vocabularyId: string, themeId: string) => {
      const { isSuccess } = await deleteVocabulary(vocabularyId);

      if (isSuccess) {
        deleteVocabularyByThemeId(vocabularyId, themeId);
        successToast('You was deleted!');
      }
    },
    [deleteVocabulary, deleteVocabularyByThemeId, successToast],
  );

  const handleAddVocabulary = useCallback(
    async ({
      vocabulary,
      translation,
      description,
    }: Omit<Vocabulary, 'id' | 'themeId'>) => {
      const { data, flags } = await addVocabulary({
        vocabulary,
        themeId,
        translation,
        description,
      });

      if (!!data && flags.isSuccess) {
        addVocabularyByThemeId(data);
        successToast('You was added!');
      }
    },
    [addVocabulary, addVocabularyByThemeId, successToast, themeId],
  );

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: 'vocabulary', headerName: 'Vocabulary', width: 130 },
      { field: 'translation', headerName: 'Translation', width: 130 },
      {
        field: 'description',
        type: 'actions',
        headerName: 'Description',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ row }: GridRowParams) => {
          return row.description
            ? [
                <GridActionsCellItem
                  icon={
                    <Tooltip title={row.description}>
                      <RemoveRedEyeIcon color="primary" />
                    </Tooltip>
                  }
                  label="test"
                  className="textPrimary"
                  color="inherit"
                />,
              ]
            : [];
        },
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ row }: { row: Vocabulary }) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="test"
              className="textPrimary"
              color="inherit"
              onClick={() =>
                vocabularyEditModal.show({
                  ...row,
                  onSubmit: async (params) =>
                    await handleUpdateVocabulary(params),
                })
              }
            />,
            <GridActionsCellItem
              icon={<DeleteIcon color="error" />}
              label="Delete"
              color="inherit"
              onClick={() => {
                vocabularyDeleteModal.show({
                  id: row.id,
                  onSubmit: async (vocabularyId) =>
                    await handleDeleteVocabulary(vocabularyId, row.themeId),
                });
              }}
            />,
          ];
        },
      },
    ];
  }, [
    handleDeleteVocabulary,
    handleUpdateVocabulary,
    vocabularyDeleteModal,
    vocabularyEditModal,
  ]);

  return (
    <DataGrid
      rows={vocabularies}
      columns={columns}
      pagination
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      disableColumnSorting
      disableDensitySelector
      disableRowSelectionOnClick
      pageSizeOptions={[10]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      slots={{
        footer: () => {
          return (
            <Stack direction="row" sx={{ px: 1, pb: 0.5 }}>
              <Button
                onClick={() => {
                  vocabularyAddModal.show({
                    onSubmit: handleAddVocabulary,
                  });
                }}
              >
                Add vocabulary
              </Button>
              <GridPagination />
            </Stack>
          );
        },
      }}
    />
  );
}
