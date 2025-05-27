import { useMemo } from 'react';

import { IconSvgs } from '@/assets/svg';

import type { IconSvgLocalProps } from './type';

export const IconSvgLocal = (props: IconSvgLocalProps) => {
  const { name, classNames, ...rest } = props;
  const Icon = useMemo(() => {
    return IconSvgs[name];
  }, [name]);
  // render
  return <Icon className={classNames} onClick={props.onClick} {...rest} />;
};
