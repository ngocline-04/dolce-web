import type { RadioGroupProps, SpaceProps } from 'antd';
import { Radio, Space } from 'antd';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import AppHelperText from '@/components/helper-text';

export interface AppRadioProps extends RadioGroupProps {
  options: AppRadioOption[];
  label?: string;
  labelSuffix?: React.ReactNode;
  caption?: string;
  captionPrefix?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  direction?: SpaceProps['direction'];
  error?: FieldError;
}
export interface AppRadioControlProps<T extends FieldValues> extends AppRadioProps {
  name: Path<T>;
  control: Control<T>;
}

export interface AppRadioOption {
  value: any;
  label: string;
}

export default function AppRadio(props: AppRadioProps) {
  const {
    name,
    options,
    label,
    labelSuffix,
    caption,
    captionPrefix,
    wrapperClassName,
    labelClassName,
    direction = 'horizontal',
    error,
    ...restProps
  } = props;


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
        <Radio.Group name={name} {...restProps}>
          <Space direction={direction} className={'gap-40'}>
            {options.map((option) => (
              <Radio key={option.value} value={option.value} className={labelClassName}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
      <AppHelperText caption={caption} captionPrefix={captionPrefix} error={error} />
    </div>
  );
}

export function AppRadioControl<T extends FieldValues>({ name, control, ...restProps }:AppRadioControlProps<T>){
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  return <AppRadio {...field} {...restProps} error={error}/>
}
