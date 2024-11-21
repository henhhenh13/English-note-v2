import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { RecoilRoot } from 'recoil';
import NiceModal from '@ebay/nice-modal-react';
import 'ckeditor5/ckeditor5.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </RecoilRoot>
  </StrictMode>,
);
