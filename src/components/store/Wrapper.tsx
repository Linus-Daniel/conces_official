'use client';

import React from 'react';
import StoreLayout from './Layout';

export default function StoreLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <StoreLayout>{children}</StoreLayout>;
}
