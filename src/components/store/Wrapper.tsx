'use client';

import React, { useState } from 'react';
import StoreLayout from './Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function StoreLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StoreLayout>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StoreLayout>
  );
}
