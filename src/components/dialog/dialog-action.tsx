import { memo, useCallback, useMemo } from 'react';

import ButtonBase from '@/components/button';
import type { ActionProps } from '@/components/dialog/type';

const Component = (prop: ActionProps) => {
  const { title, onPress, type, typeMessage, index, iconLeftName, iconRightName, className } = prop;

  const _onPress = useCallback(() => {
    if (onPress && typeof onPress === 'function') {
      onPress(index || 0);
    }
  }, [onPress]);

  const _getType = useMemo(() => {
    switch (type) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'ghost';
      case 'link':
        return 'whiteGhost';
      default:
        return 'primary';
    }
  }, [type, typeMessage]);

  const _getClassNames = useMemo(() => {
    let defaultClass = 'tablet:flex-1 justify-center font-normal';
    if (type === 'link') defaultClass += ' text-link-500 text-13 font-normal';
    return defaultClass;
  }, [type]);

  return (
    <ButtonBase name='' 
      type={_getType}
      customContent={title}
      classNames={`${_getClassNames}} ${className || ''}`}
      leftIcon={iconLeftName}
      rightIcon={iconRightName}
      onClick={_onPress}
    />
  );
};

export const DialogAction = memo(Component);
