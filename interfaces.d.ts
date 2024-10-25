import { ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface NavItem {
  title: string;
  href: URL | string;
  Icon?: ReactNode | ReactSVG;
  variant?: 'default' | 'ghost';
}
