import { Vocabulary } from '@/managers/vocabulary/interface';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Tooltip } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import VocabularyEditModal from '@/components/modals/vocabulary/edit';
import useThemeManager from '@/managers/theme/manager';
import useVocabularyManager from '@/managers/vocabulary/manager';

const paginationModel = { page: 0, pageSize: 10 };

type VocabulariesTable = {
  vocabularies: Vocabulary[];
};

export default function VocabulariesTable({ vocabularies }: VocabulariesTable) {
  const vocabularyEditModal = useModal(VocabularyEditModal);
  const { updateVocabulary } = useVocabularyManager();
  const { updateVocabularyThemeId } = useThemeManager();

  const handleUpdateVocabulary = useCallback(
    async (params: Vocabulary) => {
      const { flags, data } = await updateVocabulary(params);

      if (flags.isSuccess && !!data) {
        updateVocabularyThemeId(data);
      }
    },
    [updateVocabulary, updateVocabularyThemeId],
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
            />,
          ];
        },
      },
    ];
  }, [handleUpdateVocabulary, vocabularyEditModal]);

  return (
    <DataGrid
      rows={vocabularies}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pagination
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      disableColumnSorting
      disableDensitySelector
      disableRowSelectionOnClick
    />
  );
}
