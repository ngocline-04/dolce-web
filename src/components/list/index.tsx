import React from 'react';

import WrapStyle from '../wrap-style';

export type RowData = [string | React.ReactNode, string | React.ReactNode | undefined];

interface ListProps {
  data: RowData[];
  rowStyle?: React.CSSProperties | string;
  labelStyle?: React.CSSProperties | string;
  contentStyle?: React.CSSProperties | string;
  wrapStyle?: React.CSSProperties | string;
}

export default function List({ data, rowStyle, labelStyle, contentStyle, wrapStyle }: ListProps) {
  return (
    <WrapStyle baseClass="rounded-radius-m border border-color-300 " customStyle={wrapStyle}>
      {data?.map((elem, index) => {
        const TitleRow = elem[0];
        const ContentRow = elem[1];
        return (
          <WrapStyle
            key={index}
            baseClass={`mx-16 flex w-auto justify-between gap-12 border-b border-b-color-200 py-12 ${index === data.length - 1 && 'border-b-weight-none'
              }`}
            customStyle={rowStyle}
          >
            {typeof TitleRow === 'string' ? (
              <WrapStyle baseClass="text-14 leading-20 text-color-700 " customStyle={labelStyle}>
                {TitleRow}
              </WrapStyle>
            ) : (
              <>{TitleRow}</>
            )}
            {ContentRow &&
              (typeof ContentRow === 'string' ? (
                <WrapStyle
                  baseClass="text-14 font-semibold leading-20 text-color-800"
                  customStyle={contentStyle}
                >
                  {ContentRow}
                </WrapStyle>
              ) : (
                <>{ContentRow}</>
              ))}
          </WrapStyle>
        );
      })}
    </WrapStyle>
  );
}
