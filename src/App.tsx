import '@/global.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-json-view-lite/dist/index.css';
import { Container, Stack } from '@mui/material';
import Sidebar from '@/components/sidebar';
import usePageManager from '@/managers/page/managet';
import { useMemo } from 'react';
import VocabularyPage from '@/pages/vocabulary';
import GrammarPage from '@/pages/grammar';
import UnitPage from '@/pages/unit';
import ApiTestingPage from '@/pages/api-testing';

function App() {
  const { page } = usePageManager();

  const render = useMemo(() => {
    switch (page) {
      case 'vocabulary':
        return <VocabularyPage />;
      case 'grammar':
        return <GrammarPage />;
      case 'unit':
        return <UnitPage />;
      case 'apiTesting':
        return <ApiTestingPage />;
      default:
        return <VocabularyPage />;
    }
  }, [page]);

  return (
    <Stack
      direction="row"
      spacing={6}
      sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <Sidebar />
      <Container maxWidth="md" sx={{ py: 4, overflowY: 'auto' }}>
        {render}
      </Container>
    </Stack>
  );
}

export default App;
