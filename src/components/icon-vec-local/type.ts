import type { IconSvgTypes } from '@/assets/svg';

export interface IconSvgLocalProps {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
  classNames?: string;
  name: IconSvgTypes;
  [key: string]: any;
}
