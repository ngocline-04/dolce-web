import AppLayout from '@/layouts/app-layout';

import MyDatePicker from '@/components/baseDatePicker';
import MyCalendar from '@/components/calendar';
import NotifyBase from '@/components/notify';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import moment, { Moment } from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { db, type NextPageWithLayout } from './_app';

const ManageShift: NextPageWithLayout = () => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [rangeDate, setRangeDate] = useState<{ date: Moment; shift: number }[]>([]);
  const [selectDate, setSelectDate] = useState<any>(null);
  const [modeEdit, setModeEdit] = useState('');
  const [chucvu, setChucvu] = useState<string>('employee');

  const onPrevDate = useCallback(() => {
    setCurrentDate((prev) => prev.clone().subtract(1, 'month'));
  }, []);

  const isMoment = useMemo(() => {
    return currentDate.isSame(moment(), 'month');
  }, [currentDate]);
  const onNextDate = useCallback(() => {
    if (isMoment) {
      return;
    }
    setCurrentDate((prev) => prev.clone().add(1, 'month'));
  }, [isMoment]);
  const dataWork = [
    {
      label: 'Ca sáng',
      value: 1,
    },
    {
      label: 'Ca tối',
      value: 2,
    },
    {
      label: 'Ca gãy',
      value: 3,
    },
  ];

  const onGetDate = useCallback(
    (value: Moment) => {
      const isInRangeAndHaveShift = rangeDate.find(
        (item) => item.date.isSame(value, 'day') && item.date.isSame(value, 'month')
      );
      if (isInRangeAndHaveShift) {
        setSelectDate(isInRangeAndHaveShift);
      } else {
        setSelectDate(null);
      }
    },
    [rangeDate]
  );

  const getRangeDateRegisted = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'regisShift'));
    const dataList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const data:
      | any[]
      | ((prevState: { date: Moment; shift: number }[]) => { date: Moment; shift: number }[]) = [];
    dataList?.map((item: any) => {
      data.push(
        ...item?.shift.map((el: any) => ({
          date: moment(el?.date),
          shift: el?.shift,
          userId: item?.userId,
        }))
      );
    });

    setRangeDate(data);
  }, []);

  useEffect(() => {
    getRangeDateRegisted();
  }, [getRangeDateRegisted]);

  const [downUser, setDownUser] = useState(false);
  const renderWork = useCallback(() => {
    if (modeEdit == 'edit') {
      return (
        <div className="px-24 bg-primary-50 py-36 shadow-down-xs shadow-color-300 rounded-radius-m mb-32">
          <MyDatePicker
            label="Thời gian bắt đầu"
            name="shift"
            placeholder="Bắt đầu"
            className="w-full h-40"
            format="HH:mm"
            picker="time"
          />
          <MyDatePicker
            label="Thời gian kết thúc"
            name="shift"
            placeholder="Kết thúc"
            className="w-full h-40 mt-16"
            format="HH:mm"
            picker="time"
          />
          <Input placeholder="Nhập số lượng người yêu cầu" type="number" className="mt-16" />
          <Button
            onClick={() => setDownUser(!downUser)}
            type="text"
            icon={!downUser ? <UpOutlined /> : <DownOutlined />}
            className="mt-16 mb-16 bg-common-1000 w-full"
          >
            Số người đã đăng ký:
          </Button>
          {downUser ? (
            <div className="font-semibold">
              {rangeDate.map((item, index) => {
                const shift = dataWork.find((el) => el.value === item.shift);
                return (
                  <div className="flex items-center justify-between" key={index}>
                    <div>
                      {`DOL${item?.userId.slice(-3)}`} - làm {shift?.label}
                    </div>
                    <Button type="text" icon={<CloseOutlined className="text-error-500" />} />
                  </div>
                );
              })}
            </div>
          ) : null}
          <Button
            type="primary"
            className="bg-pending-500 text-color-900 font-semibold w-full mt-16"
            onClick={() => {
              setModeEdit('');
            }}
          >
            Cập nhật
          </Button>
        </div>
      );
    } else if (modeEdit == 'add') {
      return (
        <div className="px-24 bg-primary-50 py-36 shadow-down-xs shadow-color-300 rounded-radius-m mb-32">
          <MyDatePicker
            label="Thời gian bắt đầu"
            name="shift"
            placeholder="Bắt đầu"
            className="w-full h-40"
            format="HH:mm"
            picker="time"
          />
          <MyDatePicker
            label="Thời gian kết thúc"
            name="shift"
            placeholder="Kết thúc"
            className="w-full h-40 mt-16"
            format="HH:mm"
            picker="time"
          />
          <Input placeholder="Nhập số lượng người yêu cầu" type="number" className="mt-16" />

          <div className='mt-16'>
            <div className="font-semibold">Chức vụ</div>
            <Select
              key={'label'}
              size="large"
              className="w-full mt-4"
              value={chucvu}
              options={[
                { label: 'Nhân viên', value: 'employee' },
                { label: 'Trưởng ca', value: 'manager' },
                { label: 'Quản lý', value: 'admin' },
                { label: 'Giám đốc', value: 'director' },
                { label: 'Khác', value: 'other' },
              ]}
            />
          </div>

          <Button
            type="primary"
            className="bg-pending-500 text-color-900 font-semibold w-full mt-16"
            onClick={() => {
              setModeEdit('');
            }}
          >
            Cập nhật
          </Button>
        </div>
      );
    }
    return (
      <div className="px-24 bg-primary-50 py-36 shadow-down-xs shadow-color-300 rounded-radius-m mb-32">
        <div className="font-semibold">
          Ca làm:
          <MyDatePicker
            label="Giờ làm"
            name="shift"
            placeholder="Chọn giờ làm"
            className="w-full h-40"
            format="HH:mm"
            picker="time"
          />
        </div>
        <Button
          onClick={() => setDownUser(!downUser)}
          type="text"
          icon={!downUser ? <UpOutlined /> : <DownOutlined />}
          className="mt-8 mb-16 bg-common-1000 w-full"
        >
          Số người đã đăng ký:
        </Button>
        {downUser ? (
          <div className="font-semibold">
            {rangeDate.map((item, index) => {
              const shift = dataWork.find((el) => el.value === item.shift);
              return (
                <div className="flex items-center justify-between" key={index}>
                  <div>
                    {`DOL${item?.userId.slice(-3)}`} - làm {shift?.label}
                  </div>
                  <Button type="text" icon={<CloseOutlined className="text-error-500" />} />
                </div>
              );
            })}
          </div>
        ) : null}
        <Button
          type="primary"
          className="bg-pending-500 text-color-900 font-semibold w-full"
          onClick={() => setModeEdit('edit')}
        >
          Sửa ca
        </Button>
        <Button
          type="primary"
          className="bg-common-1000 text-color-900 font-semibold w-full mt-16"
          onClick={() => setModeEdit('add')}
        >
          Thêm ca
        </Button>
        <Button
          type="primary"
          className="bg-common-1000 text-color-900 font-semibold w-full mt-16"
          onClick={() => setModeEdit('')}
        >
          Xoá ca
        </Button>
      </div>
    );
  }, [rangeDate, dataWork, modeEdit, downUser, chucvu]);

  const renderNotify = useCallback(() => {
    return (
      <div className="tablet:hidden">
        <NotifyBase
          data={[
            { title: 'Hệ thống', description: 'Đăng ký ca làm thành công', time: '5 phút' },
            { title: 'Trưởng ca', description: 'Đăng ký lịch tháng 5/2025', time: '45 phút' },
            { title: 'Kế toán', description: 'Lương về', time: '1 giờ' },
          ]}
          label=""
        />
      </div>
    );
  }, [rangeDate, dataWork, downUser]);

  return (
    <div className="bg-common-100 flex min-h-screen items-center justify-center">
      <Card title={`Tháng ${currentDate.format('MM/YYYY')}`}>
        <div className="flex flex-row w-full gap-16 tablet:flex-col-reverse">
          <div className="w-[70%] tablet:w-full mobile:w-full">
            <MyCalendar
              onPrevDate={onPrevDate}
              onNextDate={onNextDate}
              title={`Lịch tháng ${currentDate.format('MM/YYYY')}`}
              disableRight={isMoment}
              onChange={onGetDate}
              highlightedDates={rangeDate}
              disabledDate={(date: Moment) => {
                const startOfNextMonth = moment().add(1, 'month').startOf('month');
                return date.isSameOrAfter(startOfNextMonth, 'day');
              }}
            />
          </div>
          <div className="w-[30%] tablet:w-full mobile:w-full">
            {selectDate ? renderWork() : null}

            {renderNotify()}
          </div>
        </div>
      </Card>
    </div>
  );
};

ManageShift.Layout = AppLayout;

export default ManageShift;
