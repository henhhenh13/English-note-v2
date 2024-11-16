import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Paper } from '@mui/material';
import usePageManager from '@/managers/page/managet';

export default function Sidebar() {
  const { updatePage } = usePageManager();
  return (
    <Paper sx={{ width: 250, minWidth: 250, height: '100vh' }} elevation={4}>
      <Box role="presentation">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GTranslateIcon />
              </ListItemIcon>
              <ListItemText
                primary="Units"
                onClick={() => updatePage('unit')}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GTranslateIcon />
              </ListItemIcon>
              <ListItemText
                primary="Vocabularies"
                onClick={() => updatePage('vocabulary')}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GTranslateIcon />
              </ListItemIcon>
              <ListItemText
                primary="Grammars"
                onClick={() => updatePage('grammar')}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GTranslateIcon />
              </ListItemIcon>
              <ListItemText
                primary="Api Testing"
                onClick={() => updatePage('apiTesting')}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
}
