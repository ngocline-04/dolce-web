import { useTranslation } from 'react-i18next';

import useScreenResize from '@/hooks/useScreenResize';
import type { I18nKeys } from '@/utils/i18n/locales';
import React, { useMemo } from "react";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  t18n?: I18nKeys | string;
  text?: string;
  preset?: string; // class danh cho desktop
  presetTable?: string; // class danh cho tablet
  presetMobile?: string; // class danh cho mobile
  onClick?: () => void;
  t18nOptions?: any;
  children?: React.ReactNode;
}
export const TextBase = (props: TextProps) => {
  const { t18n, text, preset, t18nOptions, children, presetMobile, presetTable, ...rest } = props;
  const [t] = useTranslation();
  const i18nText = t18n && t(t18n, t18nOptions);
  const content: any = i18nText || text || children;
  const typeDevice = useScreenResize();

  const presetClass = useMemo(() => {
    switch (typeDevice) {
      case 'desktop':
        return preset || ""
      case 'tablet':
        return props.presetTable || preset || ''
      case 'mobile':
        return props.presetMobile || props.presetTable || preset ||''
    }
  }, [typeDevice])


  return (
    <>
      <p {...rest} className={`${props.className} ${presetClass}`}>
        {(i18nText && text) ? `${text} ${i18nText}` : content}
      </p>
    </>
  );
};
