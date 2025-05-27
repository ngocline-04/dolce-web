import type { DatePickerProps } from 'antd/lib/date-picker';
import React, { useImperativeHandle, useRef } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { IconSvgTypes } from '@/assets/svg';
import { useDatePickerLanguage } from '@/hooks/useDatePickerLanguage';

export interface AppDatePickerProps extends Omit<DatePickerProps, 'suffixIcon' | 'className'> {
  name?: string;
  label?: string;
  labelSuffix?: React.ReactNode;
  suffixIcon?: IconSvgTypes | React.ReactNode;
  wrapperClassName?: string;
  datePickerClassName?: string;
  popupClassName?: string;
}

export interface AppDatePickerControlProps<T extends FieldValues>
  extends Omit<AppDatePickerProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
}

interface InputRef {
  blur: () => void;
  focus: () => void;
}

// eslint-disable-next-line react/display-name
const AppDatePicker = React.forwardRef<InputRef, AppDatePickerProps>((props, ref) => {
  const {
    name,
    label,
    labelSuffix,
    suffixIcon = 'ICON_CALENDAR',
    wrapperClassName,
    datePickerClassName,
    popupClassName,
    ...restProps
  } = props;

  const { locale, placeholder, format } = useDatePickerLanguage();

  const inputRef = useRef<any>(null);

  const focus = () => {
    inputRef.current.focus();
  };

  const blur = () => {
    inputRef.current.blur();
  };

  useImperativeHandle(ref, () => ({
    blur: () => {
      blur();
    },
    focus: () => {
      focus();
    },
  }));

  return (
    <div className={` flex w-fit flex-col gap-4 text-color-900 ${wrapperClassName} `}>
      {label && (
        <label htmlFor={name} className="text-14 font-semibold leading-24">
          {label}
          {labelSuffix && <span className="ml-4 ">{labelSuffix}</span>}
        </label>
      )}
      {/* <DatePicker
        style={{ width: '100%' }}
        className={` rounded-radius-m p-12 hover:border-primary-500 ${datePickerClassName}`}
        popupClassName={popupClassName}
        id={name}
        allowClear={false}
        locale={locale}
        placeholder={placeholder}
        format={format}
        ref={inputRef}
        suffixIcon={
          typeof suffixIcon === 'string' ? (
            <IconSvgLocal name={suffixIcon as IconSvgTypes} height={20} width={20} />
          ) : (
            <>{suffixIcon}</>
          )
        }
        {...restProps}
      /> */}
    </div>
  );
});

const AppDatePickerControl = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: AppDatePickerControlProps<T>) => {
  const { field } = useController({ name, control });
  return <AppDatePicker {...field} {...restProps} />;
};
const MemoizedAppDatePicker = React.memo(AppDatePicker);
const MemoizedAppDatePickerControl = React.memo(AppDatePickerControl) as <T extends FieldValues>(
  props: AppDatePickerControlProps<T>
) => JSX.Element;

export {
  MemoizedAppDatePicker as AppDatePicker,
  MemoizedAppDatePickerControl as AppDatePickerControl
};

