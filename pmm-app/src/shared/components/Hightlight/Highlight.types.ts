import { ReactNode } from 'react';

export interface HighlightProps {
  children: ReactNode;
  language: string;
  className?: string;
}
