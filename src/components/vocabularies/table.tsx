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
const columns: GridColDef[] = [
  { field: 'vocabulary', headerName: 'Vocabulary', width: 130 },
  { field: 'translation', headerName: 'Translation', width: 130 },
  {
    field: 'description',
    type: 'actions',
    headerName: 'Description',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ row }: GridRowParams) => {
      return [
        <GridActionsCellItem
          icon={<RemoveRedEyeIcon color="primary" />}
          label="test"
          className="textPrimary"
          color="inherit"
          onClick={() => console.log(row.description)}
        />,
      ];
    },
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: () => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="test"
          className="textPrimary"
          color="inherit"
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

const paginationModel = { page: 0, pageSize: 10 };

type VocabulariesTable = {
  vocabularies: Vocabulary[];
};

export default function VocabulariesTable({ vocabularies }: VocabulariesTable) {
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
