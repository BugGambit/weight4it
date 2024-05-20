import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { queryClient } from './queryClient.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>
);
