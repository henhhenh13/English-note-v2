import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Paper } from '@mui/material';
import usePageManager from '@/managers/page/manager';
import { useMemo } from 'react';
import { PageState } from '@/managers/page/state';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { SvgIconComponent } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
export default function Sidebar() {
  const { page, updatePage } = usePageManager();

  const render = useMemo(() => {
    const pages: { title: string; key: PageState; icon: SvgIconComponent }[] = [
      {
        title: 'Units',
        key: 'unit',
        icon: LocalLibraryIcon,
      },
      {
        title: 'Vocabulary',
        key: 'vocabulary',
        icon: GTranslateIcon,
      },
      {
        title: 'Grammars',
        key: 'grammar',
        icon: CategoryIcon,
      },
    ];

    return (
      <List>
        {pages.map(({ title, key, icon: Icon }, index) => (
          <ListItem
            key={`${key}-${index}`}
            disablePadding
            onClick={() => updatePage(key)}
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon color="primary" />
              </ListItemIcon>
              <ListItemText
                sx={{ color: page === key ? 'primary.main' : '' }}
                primary={title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }, [page, updatePage]);

  return (
    <Paper sx={{ width: 250, minWidth: 250, height: '100vh' }} elevation={4}>
      <Box>{render}</Box>
    </Paper>
  );
}
