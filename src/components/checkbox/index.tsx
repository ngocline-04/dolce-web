import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox/Group';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import AppHelperText from '@/components/helper-text';

export interface AppCheckboxProps<T extends FieldValues> extends CheckboxGroupProps {
  name: Path<T>;
  label?: string;
  labelSuffix?: React.ReactNode;
  caption?: string;
  captionPrefix?: React.ReactNode;
  wrapperClassName?: string;
  control: Control<T>;
}

export default function AppCheckbox<T extends FieldValues>(props: AppCheckboxProps<T>) {
  const {
    name,
    label,
    labelSuffix,
    caption,
    captionPrefix,
    wrapperClassName,
    control,
    ...restProps
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

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
      <div>
        <Checkbox.Group
          {...field}
          name={name}
          {...restProps}
          className={`
          [&_.ant-checkbox-disabled.ant-checkbox-checked]:bg-secondary-100
          [&_.ant-checkbox-disabled.ant-checkbox-checked_.ant-checkbox-inner:after]:border-color-50
          [&_.ant-checkbox-disabled.ant-checkbox-checked_.ant-checkbox-inner]:border-secondary-100
          [&_.ant-checkbox-disabled.ant-checkbox-checked_.ant-checkbox-inner]:bg-secondary-100
          `}
        />
      </div>
      <AppHelperText caption={caption} captionPrefix={captionPrefix} error={error} />
    </div>
  );
}
