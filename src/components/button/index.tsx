import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { IconSvgTypes } from '@/assets/svg';
import { IconSvgLocal } from '@/components/icon-vec-local';
import type { I18nKeys } from '@/utils/i18n/locales';

interface idPropButton extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'primary' | 'secondary' | 'ghost' | 'whiteGhost';
  htmlType?: HTMLButtonElement['type'];
  disabled?: boolean;
  onClick?: () => void;
  styles?: React.CSSProperties; // css inline để đè lên css mặc định
  classNames?: React.ComponentProps<'div'>['className']; // có thể bổ sung class ngoài
  t18n?: I18nKeys;
  t18nOptions?: any;
  size?: 44 | 32;
  fontSize?: 15 | 13;
  leftIcon?: IconSvgTypes;
  rightIcon?: IconSvgTypes;
  heightIcon?: number;
  widthIcon?: number;
  customContent?: React.ReactNode; // cái này để custom lại content của button
  onlyWrap?: boolean;
  children?: React.ReactNode;
  name: string; // ten su kien
}

const ButtonBase = (props: idPropButton) => {
  // set props mặc định khi không truyền
  const {
    type = 'secondary',
    htmlType = 'button',
    disabled = false,
    onClick = () => {},
    styles = {},
    classNames = '',
    size = 44,
    fontSize = 15,
    t18n,
    t18nOptions,
    leftIcon,
    rightIcon,
    heightIcon = 20,
    widthIcon = 20,
    customContent,
    onlyWrap = false,
    children,
    ...reftProps
  } = props;
  const [t] = useTranslation();
  const i18nText = t18n && (t(t18n, t18nOptions) as string);
  const content = i18nText || customContent;
  const [hoveredItem, setHoveredItem] = useState('');
  const updateImageState = () => {
    if (disabled) {
      return 'rgb(var(--color-600)';
    }
    return hoveredItem && (type === 'secondary' || type === 'whiteGhost')
      ? 'rgb(var(--primary-700)'
      : '';
  };

  if (onlyWrap) {
    return (
      <div {...reftProps} onClick={onClick} className={`cursor-pointer ${reftProps.className}`}>
        {children || customContent}
      </div>
    );
  }

  return (
    <button
      // @ts-ignore
      type={htmlType}
      onClick={() => onClick()}
      style={{ height: size, fontSize, ...styles }}
      disabled={disabled}
      className={`btn_base btn_${type} ${classNames}`}
      onMouseEnter={() => setHoveredItem('rgb(var(--color-700)')}
      onMouseLeave={() => setHoveredItem('')}
    >
      {leftIcon && (
        <div style={{ marginRight: content ? 8 : 0 }}>
          <IconSvgLocal name={leftIcon} height={heightIcon} width={20} fill={updateImageState()} />
        </div>
      )}
      {content}
      {rightIcon && (
        <div style={{ marginLeft: content ? 8 : 0 }}>
          <IconSvgLocal
            name={rightIcon}
            height={heightIcon}
            width={widthIcon}
            fill={disabled ? 'rgb(var(--color-600)' : ''}
          />
        </div>
      )}
    </button>
  );
};

export default ButtonBase;
