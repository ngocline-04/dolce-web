import AppLayout from '@/layouts/app-layout';

import MyCalendar from '@/components/calendar';
import { hideLoading, showLoading } from '@/components/loading';
import NotifyBase from '@/components/notify';
import { selectInfoUser } from '@/stores/authSlice';
import { Card } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import moment, { Moment } from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, type NextPageWithLayout } from './_app';

const TimeKeeping: NextPageWithLayout = () => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [rangeDate, setRangeDate] = useState<{ date: Moment; shift: number }[]>([]);
  const [selectDate, setSelectDate] = useState<any>(null);

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

  const onGetDate = useCallback(
    (value: Moment) => {
      const findIsDate = rangeDate.find((item) => item.date.isSame(value, 'day'));
      setSelectDate(findIsDate);
    },
    [rangeDate]
  );

  const userInfo = useSelector(selectInfoUser);

  const getRangeDateRegisted = useCallback(async () => {
    showLoading();
    try {
      const querySnapshot = await getDocs(collection(db, 'regisShift'));
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const data:
        | any[]
        | ((prevState: { date: Moment; shift: number }[]) => { date: Moment; shift: number }[]) =
        [];
      dataList?.map((item: any) => {
        if (item?.userId !== userInfo?.uid) {
          return;
        }
        data.push(
          ...item?.shift.map((el: any) => ({
            date: moment(el?.date),
            shift: el?.shift,
            userId: item?.userId,
          }))
        );
      });

      setRangeDate(data);
    } catch (error) {
      console.error('Error fetching registered shifts:', error);
    } finally {
      hideLoading();
    }
  }, []);

  useEffect(() => {
    getRangeDateRegisted();
  }, [getRangeDateRegisted]);

  const renderWork = useCallback(() => {
    return (
      <div className="px-24 bg-primary-50 py-36 shadow-down-xs shadow-color-300 rounded-radius-m mb-32 w-full">
        <div className="bg-alias-btn_default text-common-1000 font-semibold text-center py-16 px-8 rounded-radius-xl">
          Theo dõi giờ chấm công vào ca
        </div>
        <div className="bg-common-1000 px-12 py-4 mt-8 rounded-radius-m font-semibold text-center">
          Vào ca: 6:20
        </div>
        <div className="bg-common-1000 px-12 py-4 mt-8 rounded-radius-m font-semibold text-center">
          Kết ca: 15:00
        </div>
        <div className="bg-pending-500 px-12 py-4 mt-8 rounded-radius-m font-semibold text-center">
          Ngày {moment(selectDate?.date).format('DD/MM/YYYY')}
        </div>
      </div>
    );
  }, [onNextDate, rangeDate.length, selectDate]);

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
  }, []);

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
              isShift
              disabledDate={(date) => {
                const today = moment().startOf('day');
                const startOfNextMonth = moment().add(1, 'month').startOf('month');

                return date.isBefore(today) || date.isSameOrAfter(startOfNextMonth, 'day');
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

TimeKeeping.Layout = AppLayout;

export default TimeKeeping;
