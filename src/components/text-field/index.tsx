import type { InputProps, InputRef } from 'antd';
import { Input } from 'antd';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import AppHelperText from '@/components/helper-text';
import { ERROR_NO_DISPLAY } from '@/utils/contant';

import { IconSvgLocal } from '../icon-vec-local';

export interface AppTextFieldProps extends InputProps {
  label?: string;
  labelSuffix?: React.ReactNode;
  caption?: string;
  captionPrefix?: React.ReactNode;
  wrapperClassName?: string;
  type?: 'text' | 'password';
  error?: FieldError | string;
}

export interface AppTextFieldControlProps<T extends FieldValues>
  extends Omit<AppTextFieldProps, 'error'> {
  name: Path<T>;
  control?: Control<T>;
  customError?: FieldError | string;
}

export const AppTextField = forwardRef((props: AppTextFieldProps, ref: Ref<InputRef>) => {
  const {
    name,
    label,
    labelSuffix,
    caption,
    captionPrefix,
    wrapperClassName,
    type = 'text',
    size = 'large',
    error,
    ...restProps
  } = props;

  const isPasswordType = type === 'password';

  const TextField = isPasswordType ? Input.Password : Input;

  const renderPasswordSuffix = (visible: boolean) => (
    <div>
      <IconSvgLocal
        name={visible ? 'ICON_EYE_SPLASH' : 'ICON_EYE_OPEN'}
        height={20}
        fill="rgb(var(--color-700)"
      />
    </div>
  );

  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-4 inline-flex flex-row items-center text-13 font-semibold leading-24 text-color-900"
        >
          {label}
          {labelSuffix && <span className="ml-4 text-color-900">{labelSuffix}</span>}
        </label>
      )}
      <TextField
        id={name}
        name={name}
        size={size}
        {...restProps}
        ref={ref}
        {...(isPasswordType
          ? {
              iconRender: renderPasswordSuffix,
            }
          : {})}
        className={`
            border-color-300
            text-13
            text-color-800
            placeholder:text-color-600
            focus:shadow-none
            disabled:!border-color-200
            disabled:!bg-color-200
            disabled:!text-color-800
            [&:has(input:disabled)]:!border-color-200
            [&:has(input:disabled)]:!bg-color-200
            [&:has(input:focus)]:shadow-none
            [&>input]:text-color-800
            [&>input]:placeholder:text-color-600
            [&_.ant-input-password-icon]:cursor-pointer
          
            ${
              error
                ? '!border-error-500'
                : 'focus-within:!border-primary-500 hover:!border-primary-500 focus:!border-primary-500'
            }`}
      />
      <AppHelperText caption={caption} captionPrefix={captionPrefix} error={error} />
    </div>
  );
});

AppTextField.displayName = 'AppTextField';

export function AppTextFieldControl<T extends FieldValues>({
  name,
  control,
  customError,
  ...restProps
}: AppTextFieldControlProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  return (
    <AppTextField
      {...field}
      {...restProps}
      error={
        customError === ERROR_NO_DISPLAY || error?.message === ERROR_NO_DISPLAY
          ? undefined
          : customError || error
      }
    />
  );
}
