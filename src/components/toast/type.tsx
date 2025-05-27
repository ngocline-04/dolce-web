import type { IconSvgLocalProps } from '@/components/icon-vec-local/type';

export enum TYPE_TOAST {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface ToastProps {
  type?: TYPE_TOAST;
  content: string;
  wrapClassName?: string;
  timeShow?: number;
  icon?: IconSvgLocalProps;
}
