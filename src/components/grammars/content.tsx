import CustomMenu, { CustomMenuProps } from '@/components/menu';
import { Grammar } from '@/managers/grammar/interface';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Grow, Paper, Stack, Typography } from '@mui/material';
import GrammarDeleteModal from '@/components/modals/grammar/delete';
import { useModal } from '@ebay/nice-modal-react';
import useToastManager from '@/hooks/use-toast';
import useGrammarManager from '@/managers/grammar/manager';
import { useCallback, useMemo } from 'react';
import GrammarEditModal from '@/components/modals/grammar/edit';

type GrammarContentProps = {
  grammar: Grammar;
};

export default function GrammarContent({ grammar }: GrammarContentProps) {
  const grammarDeleteModal = useModal(GrammarDeleteModal);
  const grammarEditModal = useModal(GrammarEditModal);
  const { deleteGrammar, updateGrammar } = useGrammarManager();
  const { successToast } = useToastManager();

  const handleDeleteGrammar = useCallback(async () => {
    const { isSuccess } = await deleteGrammar(grammar.id);
    if (isSuccess) {
      successToast('Grammar deleted successfully');
    }
  }, [deleteGrammar, grammar.id, successToast]);

  const handleEditGrammar = useCallback(
    async (params: Grammar) => {
      const { isSuccess } = await updateGrammar(params);
      if (isSuccess) {
        successToast('Grammar updated successfully');
      }
    },
    [updateGrammar, successToast],
  );

  const menuItems: CustomMenuProps['items'] = useMemo(() => {
    return [
      {
        title: 'Edit',
        icon: EditIcon,
        iconColor: 'info',
        onClick: () =>
          grammarEditModal.show({
            grammar,
            onSubmit: handleEditGrammar,
          }),
      },
      {
        title: 'Delete',
        icon: DeleteForeverIcon,
        iconColor: 'error',
        onClick: () =>
          grammarDeleteModal.show({
            onSubmit: handleDeleteGrammar,
          }),
      },
    ];
  }, [
    grammarEditModal,
    grammar,
    handleEditGrammar,
    grammarDeleteModal,
    handleDeleteGrammar,
  ]);

  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 300 }}>
      <Paper elevation={6} sx={{ p: 2, minWidth: 500, position: 'relative' }}>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h4" color="primary">
            {grammar.title}
          </Typography>
          <Typography variant="body1" color="primary">
            ({grammar.description})
          </Typography>
        </Stack>
        <Box
          sx={{
            maxHeight: 'calc(100vh - 220px)',
            overflow: 'auto',
            px: 2,
          }}
        >
          <div
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: grammar.content,
            }}
          />
        </Box>

        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CustomMenu items={menuItems} />
        </Box>
      </Paper>
    </Grow>
  );
}
