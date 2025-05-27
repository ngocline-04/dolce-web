import { Modal } from 'antd';
import type { ReactNode } from 'react';
import { createRef, forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';

import type { IconSvgTypes } from '@/assets/svg';
import type { DialogProps, TYPE_MESSAGE } from '@/components/dialog/type';
import { stateDefault } from '@/components/dialog/type';

import { IconSvgLocal } from '../icon-vec-local';
import { DialogAction } from './dialog-action';

// eslint-disable-next-line react/display-name
const Component = forwardRef((_: any, ref) => {
  const [state, setState] = useState(stateDefault);

  useImperativeHandle(
    ref,
    () => ({
      show: (props: DialogProps) => {
        if (state?.isShow) return;
        setState({
          isShow: true,
          ...props,
        });
      },
      hide: () => {
        setState(stateDefault);
      },
    }),
    [state?.isShow]
  );

  const isDisableTouchOutSide = useMemo(() => {
    return state.disableTouchOutSide || state?.type === 'confirm';
  }, [state?.type, state.disableTouchOutSide]);

  const onPress = useCallback(
    (index: number) => {
      // @ts-ignore
      const item = state?.actions[index];
      !item?.stopHide && hideDialog();
      setTimeout(() => {
        if (item?.onPress && typeof item?.onPress === 'function') {
          item.onPress();
        }
      }, 250);
    },
    [state?.actions]
  );

  const _onPressBackground = useCallback(() => {
    if (!isDisableTouchOutSide) {
      hideDialog();
    }
  }, [isDisableTouchOutSide]);

  return (
    <Modal open={state?.isShow} centered closeIcon={false} footer={null} wrapClassName="dialog">
      <div className={` duration-500 `} onClick={_onPressBackground}>
        <div className="mb-16 flex w-full items-center justify-center">
          {state?.image?.name && (
            <IconSvgLocal
              name={state?.image?.name as unknown as IconSvgTypes}
              height={state?.image?.height}
              width={state?.image?.width}
              classNames={state?.image?.fill}
            />
          )}
        </div>
        <div className="text-18 font-bold text-text-primary tablet:text-center">{state.title}</div>
        <div className="mt-4 text-14 font-normal text-text-primary tablet:text-center">
          {state.content || 'Content dialog: ....'}
        </div>
        {state.sub && (
          <div className="mt-8 text-10 text-error-500 tablet:text-center">{state.sub}</div>
        )}

        <div
          className="mt-24 flex flex-row-reverse gap-[10px]
          tablet:flex-col
        "
        >
          <div className="flex flex-row-reverse gap-[10px]">
            {state.actions?.map((item, index) => {
              return item.type !== 'link' ? (
                <DialogAction key={index} {...item} index={index} onPress={() => onPress(index)} />
              ) : null;
            })}
          </div>
          {state.actions?.map((item, index) => {
            return item.type === 'link' ? (
              <DialogAction key={index} {...item} index={index} onPress={() => onPress(index)} />
            ) : null;
          })}
        </div>
      </div>
    </Modal>
  );
});

type Alert = {
  show: (data: {
    title: ReactNode | string;
    content: ReactNode | string;
    type?: TYPE_MESSAGE;
    haveCloseBtn?: boolean;
    customHeader?: ReactNode;
    footer?: ReactNode;
  }) => void;
  hide: () => void;
};
export const DialogRef = createRef<Alert>();
export const DialogView = () => <Component ref={DialogRef} />;

export const showDialog = (props: DialogProps) => {
  DialogRef.current?.show(props);
};
export const hideDialog = () => {
  DialogRef.current?.hide();
};
