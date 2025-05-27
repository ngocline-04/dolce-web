import AppLayout from '@/layouts/app-layout';

import MyCalendar from '@/components/calendar';
import { hideLoading, showLoading } from '@/components/loading';
import NotifyBase from '@/components/notify';
import { showToast } from '@/components/toast';
import { selectInfoUser } from '@/stores/authSlice';
import { Button, Card, Select } from 'antd';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import moment, { Moment } from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, type NextPageWithLayout } from './_app';

const CalendarRegisted: NextPageWithLayout = () => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [rangeDate, setRangeDate] = useState<{ date: Moment; shift: number }[]>([]);
  const [selectDate, setSelectDate] = useState<any>(null);

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

      data?.length && setIsHaveShift(true);
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

  // const onRegister = useCallback(async () => {
  //   showLoading();
  //   try {
  //     const shiftData = rangeDate.map((item) => ({
  //       date: item.date.format('YYYY-MM-DD'),
  //       shift: item.shift,
  //     }));

  //     const regisShiftRef = collection(db, 'regisShift');

  //     // Tìm tài liệu có userId trùng
  //     const q = query(regisShiftRef, where('userId', '==', userInfo?.uid));
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       // Nếu đã tồn tại => cập nhật tài liệu đầu tiên tìm được
  //       const existingDoc = querySnapshot.docs[0];
  //       if (existingDoc) {
  //         const docRef = doc(db, 'regisShift', existingDoc.id);

  //         await updateDoc(docRef, {
  //           shift: shiftData,
  //           updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error registering shifts:', error);
  //   } finally {
  //     hideLoading();
  //   }
  //   try {
  //     const shiftData = rangeDate.map((item) => ({
  //       date: item.date.format('YYYY-MM-DD'),
  //       shift: item.shift,
  //     }));

  //     const regisShiftRef = collection(db, 'regisShift');

  //     // Tìm tài liệu có userId trùng
  //     const q = query(regisShiftRef, where('userId', '==', userInfo?.uid));
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       // Nếu đã tồn tại => cập nhật tài liệu đầu tiên tìm được
  //       const existingDoc = querySnapshot.docs[0];
  //       if (existingDoc) {
  //         const docRef = doc(db, 'regisShift', existingDoc.id);

  //         await updateDoc(docRef, {
  //           shift: shiftData,
  //           updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  //         });
  //       }
  //     }
  //   } catch (error) {}
  // }, [rangeDate, userInfo, isHaveShift]);
  const onRegister = useCallback(async () => {
    if (!selectDate?.date || !selectDate?.shift) return;

    showLoading();
    try {
      const regisShiftRef = collection(db, 'regisShift');
      const q = query(regisShiftRef, where('userId', '==', userInfo?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const docRef = doc(db, 'regisShift', existingDoc.id);
        const docData = existingDoc.data();

        const originalShifts = docData.shift || [];

        // Format ngày để so sánh
        const selectedDateStr = moment(selectDate.date).format('YYYY-MM-DD');

        // Kiểm tra xem đã có shift nào trong ngày này chưa
        const updatedShifts = [...originalShifts];
        const indexToUpdate = updatedShifts.findIndex(
          (item: any) => moment(item.date).format('YYYY-MM-DD') === selectedDateStr
        );

        if (indexToUpdate > -1) {
          // Nếu đã có shift ngày đó => cập nhật
          updatedShifts[indexToUpdate].shift = selectDate.shift;
        } else {
          // Nếu chưa có shift ngày đó => thêm mới
          updatedShifts.push({
            date: selectedDateStr,
            shift: selectDate.shift,
          });
        }

        await updateDoc(docRef, {
          shift: updatedShifts,
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        });

        showToast({
          type: 'success',
          content: 'Cập nhật ca làm việc thành công',
          title: 'Thông báo',
        });
        await getRangeDateRegisted(); // làm mới lịch
      }
    } catch (error) {
      console.error('Error registering shift:', error);
      showToast({
        type: 'error',
        content: 'Cập nhật ca làm việc không thành công',
        title: 'Thông báo',
      });
    } finally {
      hideLoading();
    }
  }, [selectDate, userInfo?.uid, getRangeDateRegisted]);

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

  const onDelete = useCallback(async () => {

    showLoading();
    try {
      const regisShiftRef = collection(db, 'regisShift');
      const q = query(regisShiftRef, where('userId', '==', userInfo?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const docData = existingDoc.data();
        const docRef = doc(db, 'regisShift', existingDoc.id);

        // Lọc ra các ca không trùng ngày đã chọn
        const updatedShifts = (docData.shift || []).filter(
          (item: any) => item.date !== moment(selectDate.date).format('YYYY-MM-DD')
        );

        await updateDoc(docRef, {
          shift: updatedShifts,
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
        showToast({
          type: 'success',
          content: 'Xoá ca làm việc thành công',
          title: 'Thông báo',
        });
        await getRangeDateRegisted(); // làm mới lịch

        setRangeDate((prev) => prev.filter((item) => !item?.date.isSame(selectDate?.date, 'day')));
        setSelectDate(null); // bỏ chọn ngày vừa xoá
      }
    } catch (error) {
      console.error('Error deleting shift:', error);
      showToast({
        type: 'error',
        content: 'Xoá ca làm việc không thành công',
        title: 'Thông báo',
      });
    } finally {
      hideLoading();
    }
  }, [selectDate, userInfo?.uid, getRangeDateRegisted]);
  const renderWork = useCallback(() => {
    return (
      <div className="px-24 bg-primary-50 py-36 shadow-down-xs shadow-color-300 rounded-radius-m mb-32 w-full">
        <div className="font-semibold text-center w-full">Theo dõi số lượng còn đăng ký</div>
        <div className="bg-common-1000 px-12 py-4 mt-8 rounded-radius-m font-semibold text-center">
          Ngày {moment(selectDate?.date).format('DD/MM/YYYY')}
        </div>
        <div className="mt-8 flex items-center">
          <div className="mr-16 font-semibold">Ca làm:</div>
          <Select
            value={selectDate?.shift}
            options={dataWork}
            size="large"
            placeholder="Chọn ca làm"
            onChange={(value) => {
              setSelectDate((prev: any) => ({ ...prev, shift: value }));
            }}
          />
        </div>
        <div className="bg-common-1000 px-12 py-4 mt-8 rounded-radius-m font-semibold">
          Số lượng còn: 1
        </div>
        <div className="flex flex-col justify-center">
          <Button
            //disabled={!shift || rangeDate.length === 0}
            type="text"
            className="h-40 bg-common-1000 text-color-900 mt-16 font-semibold"
            onClick={onDelete}
          >
            Xoá ca
          </Button>
          <Button
            //disabled={!shift || rangeDate.length === 0}
            type="primary"
            className="h-40 bg-pending-500 text-color-900 mt-16 font-semibold"
            onClick={onRegister}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    );
  }, [onRegister, onNextDate, rangeDate.length, selectDate]);

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

CalendarRegisted.Layout = AppLayout;

export default CalendarRegisted;
