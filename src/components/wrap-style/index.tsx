import React from 'react';

interface WrapStyleProps extends Omit<React.HTMLProps<HTMLDivElement>, 'className' | 'style'> {
  children: React.ReactNode;
  baseClass?: string;
  baseStyle?: React.CSSProperties;
  customStyle?: React.CSSProperties | string;
}

const isStyleObject = (obj: unknown) => typeof obj === 'object' && obj !== null;

const WrapStyle = ({
  children,
  baseClass,
  baseStyle,
  customStyle,
  ...otherProps
}: WrapStyleProps) => {
  return (
    <div
      className={`${baseClass} ${typeof customStyle === 'string' && customStyle}`}
      style={isStyleObject(customStyle) ? { ...baseStyle, ...(customStyle as object) } : baseStyle}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default React.memo(WrapStyle);
