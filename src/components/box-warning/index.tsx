import type { I18nKeys } from '@/utils/i18n/locales';

import { IconSvgLocal } from '../icon-vec-local';
import { TextBase } from '../text';

interface PropBoxWarning {
  label: I18nKeys;
  color?: {
    text?: string; // "rgb(var(--link-50))"
    border?: string; // "rgb(var(--link-50))"
    bgBox?: string; // "rgb(var(--link-50))"
  };
}

export default function BoxWarning(props: PropBoxWarning) {
  const {
    label,
    color = {
      text: 'rgb(var(--link-600))',
      border: 'rgb(var(--link-200))',
      bgBox: 'rgb(var(--link-50))',
    },
  } = props;
  return (
    <div
      className="flex flex-row items-center gap-8 rounded-radius-l border-weight-m px-12 py-8"
      style={{ background: color.bgBox, borderColor: color.border }}
    >
      <IconSvgLocal name="ICON_WARNING" classNames="w-24 h-24" fill={color.text} />
      <TextBase className="body1" style={{ color: color.text }} t18n={label} />
    </div>
  );
}
