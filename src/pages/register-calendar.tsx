import AppLayout from '@/layouts/app-layout';

import MyCalendar from '@/components/calendar';
import { hideLoading, showLoading } from '@/components/loading';
import NotifyBase from '@/components/notify';
import { showToast } from '@/components/toast';
import { selectInfoUser } from '@/stores/authSlice';
import { Button, Card, Radio } from 'antd';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import moment, { Moment } from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, type NextPageWithLayout } from './_app';

const ResgisCalendar: NextPageWithLayout = () => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [rangeDate, setRangeDate] = useState<
    { date: Moment; shift: number; isNotRegisted?: boolean }[]
  >([]);
  const [shift, setShift] = useState<number>();
  const [isHaveShift, setIsHaveShift] = useState<boolean>(false);

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
      if (value.isAfter(moment(), 'month')) {
        showToast({
          title: 'Thông báo',
          content: 'Vui lòng chọn tháng hiện tại!',
          type: 'error',
        });
        return;
      }

      if (!shift) {
        showToast({
          title: 'Thông báo',
          content: 'Vui lòng chọn ca làm việc trước khi chọn ngày!',
          type: 'error',
        });
        return;
      }

      if (value.isBefore(moment().startOf('day'))) {
        showToast({
          title: 'Thông báo',
          content: 'Vui lòng chọn ngày từ hôm nay trở đi!',
          type: 'error',
        });
        return;
      }
      let data = [...rangeDate];
      const findDateIsRegisted = rangeDate.find(
        (item) =>
          item.date.isSame(value, 'day') && item.date.isSame(value, 'month') && item?.isNotRegisted
      );

      if (findDateIsRegisted) {
        data = rangeDate.filter(
          (item) => !item.date.isSame(value, 'day') && item.date.isSame(value, 'month')
        );
      }
      const findDateDuplicate = data.find((item) => item.date.isSame(value, 'day'));

      if (findDateDuplicate) {
        data = data.filter((item) => !item.date.isSame(value, 'day'));
      } else {
        data.push({ date: value, shift, isNotRegisted: true });
      }

      data.sort((a, b) => a.date.diff(b.date));
      setRangeDate(data);
    },
    [shift, rangeDate, currentDate]
  );

  const userInfo = useSelector(selectInfoUser);

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

    data?.length && setIsHaveShift(true);
    setRangeDate(data);
  }, []);

  useEffect(() => {
    getRangeDateRegisted();
  }, [getRangeDateRegisted]);

  const onRegister = useCallback(async () => {
    showLoading();
    try {
      const shiftData = rangeDate.map((item) => ({
        date: item.date.format('YYYY-MM-DD'),
        shift: item.shift,
      }));

      const regisShiftRef = collection(db, 'regisShift');

      // Tìm tài liệu có userId trùng
      const q = query(regisShiftRef, where('userId', '==', userInfo?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Nếu đã tồn tại => cập nhật tài liệu đầu tiên tìm được
        const existingDoc = querySnapshot.docs[0];
        if (existingDoc) {
          const docRef = doc(db, 'regisShift', existingDoc.id);

          await updateDoc(docRef, {
            shift: shiftData,
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          });
        }
      } else {
        // Nếu chưa có => tạo mới
        await addDoc(regisShiftRef, {
          userId: userInfo?.uid,
          userName: userInfo?.name,
          shift: shiftData,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
      }

      !isHaveShift && setRangeDate([]);
      setShift(undefined);

      showToast({
        type: 'success',
        content: 'Đăng ký ca làm việc thành công',
        title: 'Thông báo',
      });
      await getRangeDateRegisted(); // Cập nhật lại danh sách ca làm việc đã đăng ký
    } catch (error) {
      console.error('Error adding/updating document: ', error);
    } finally {
      hideLoading();
    }
  }, [rangeDate, userInfo, isHaveShift, shift]);

  const renderWork = useCallback(() => {
    return (
      <div className="px-24 bg-primary-50 py-36 shadow-down-xs shadow-color-300 rounded-radius-m mb-32 tablet:hidden">
        <Radio.Group value={shift} onChange={(e) => setShift(e.target.value)} className="w-full">
          {dataWork.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-12 ${index === dataWork.length - 1 ? 'm-0' : 'mb-16'}`}
            >
              <Radio value={item?.value} />
              <div className="body-text-18-regular bg-common-1000 px-24 py-16 w-full rounded-radius-m">
                {item?.label}
              </div>
            </div>
          ))}
        </Radio.Group>

        <div className="flex flex-col justify-center">
          <Button
            disabled={!shift || rangeDate.length === 0}
            type="primary"
            className="h-40 bg-pending-500 text-color-900 mt-16 font-semibold"
            onClick={onRegister}
          >
            Đăng ký
          </Button>
        </div>
      </div>
    );
  }, [shift, dataWork, onRegister, onNextDate, rangeDate.length]);

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
              disabledDate={(date) => {
                const today = moment().startOf('day');
                const startOfNextMonth = moment().add(1, 'month').startOf('month');

                const isInRangeAndHaveShift =
                  isHaveShift &&
                  rangeDate.some((item) => item.date.isSame(date, 'day') && !item?.isNotRegisted);

                return (
                  date.isBefore(today) ||
                  date.isSameOrAfter(startOfNextMonth, 'day') ||
                  isInRangeAndHaveShift
                );
              }}
            />
          </div>
          <div className="w-[30%] tablet:w-full mobile:w-full">
            <div className="tablet:block mobile:block mb-16 hidden">
              <Radio.Group
                name="radiogroup"
                options={dataWork}
                onChange={(e) => setShift(e.target.value)}
              />
              <Button
                disabled={!shift || rangeDate.length === 0}
                type="primary"
                className="h-40 bg-pending-500 text-color-900 mt-16 font-semibold"
                onClick={onRegister}
              >
                Đăng ký
              </Button>
            </div>
            {renderWork()}

            {renderNotify()}
          </div>
        </div>
      </Card>
    </div>
  );
};

ResgisCalendar.Layout = AppLayout;

export default ResgisCalendar;
