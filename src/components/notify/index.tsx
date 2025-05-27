import { Divider } from 'antd';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { IconSvgLocal } from '../icon-vec-local';

interface Iprops {
  data: any[];
  label: string;
}
const Component = (props: Iprops) => {
  const { data } = props;
  if (!data?.length) return;
  return (
    <div className="px-24 bg-primary-50 py-36 shadow-down-xs shadow-color-300 rounded-radius-m">
      <div className="flex justify-between w-full mb-16">
        <div className="body-text-16-semibold">Thông báo</div>
        <IconSvgLocal name="IC_LIST_NOTI" height={24} width={24} />
      </div>
      {data.map((el: any, index) => {
        return (
          <div key={index} className="flex flex-row w-full">
            <IconSvgLocal name="IC_RING" classNames="text-pending-500" height={24} width={24} />
            <div className='flex flex-col w-full'>
              <div className='flex w-full justify-between'>
                <div className="ml-16">
                  <div className="body-text-16-semibold">{el?.title}</div>
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {el?.description}
                  </div>
                </div>
                <div>{el?.time}</div>
              </div>
              {index == data?.length - 1 ? null : <Divider />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const NotifyBase = memo(Component, isEqual);
export default NotifyBase;
