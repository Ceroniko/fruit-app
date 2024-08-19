import { Layout } from '@components/Layout';
import { CaloriesCalculator } from '@containers/CaloriesCalculator';
import '@css/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <CaloriesCalculator />
    </Layout>
  </StrictMode>
);
