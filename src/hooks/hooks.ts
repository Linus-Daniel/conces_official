// lib/utils.ts
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
  
  export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  
  // lib/hooks/useDebounce.ts
  import { useEffect, useState } from 'react';
  
  export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }