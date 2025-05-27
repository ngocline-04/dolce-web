import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Calendar, ConfigProvider } from 'antd';
import type { CalendarType } from 'antd/lib/calendar';
import viVN from 'antd/locale/vi_VN';
import type { Moment } from 'moment';
import moment from 'moment';
import 'moment/locale/vi';
import momentGenerateConfig from 'rc-picker/es/generate/moment';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

moment.locale('vi');

const Component = Calendar.generateCalendar<Moment>(momentGenerateConfig);
interface Iprops {
  title: string;
  onPrevDate: (value: any) => void;
  onNextDate: (value: any) => void;
  disableLeft?: boolean;
  disableRight?: boolean;
  rangeStart?: Moment;
  rangeEnd?: Moment;
  highlightedDates?: { date: string; shift: number }[];
  isShift?: boolean;
}
const MyCalendar = (props: Iprops & CalendarType) => {
  const { title, onNextDate, onPrevDate, disableLeft, disableRight } = props;
  const calendarRef = useRef<HTMLDivElement>(null);
  const [rowHeights, setRowHeights] = useState<number[]>([]);

  useEffect(() => {
    const rows = calendarRef.current?.querySelectorAll('.ant-picker-cell-in-view') || [];
    const heightMap: { [key: number]: number } = {};
    rows.forEach((cell) => {
      const row = cell.closest('tr');
      if (row) {
        const rect = (row as HTMLElement).getBoundingClientRect();
        heightMap[rect.top] = rect.height;
      }
    });

    const heights = Object.values(heightMap);
    setRowHeights(heights);
  }, []);

  const renderWeekNumbers = () => {
    const startOfMonth = moment().startOf('month').startOf('isoWeek');
    const endOfMonth = moment().endOf('month').endOf('isoWeek');
    let current = startOfMonth.clone();
    const weeks: number[] = [];

    while (current.isBefore(endOfMonth)) {
      weeks.push(current.isoWeek());
      current.add(1, 'week');
    }

    return (
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 8,
          width: 60,
          zIndex: 1,
          background: 'white',
        }}
      >
        {weeks.map((week, index) => (
          <div
            key={index}
            style={{
              height: rowHeights[index] || 50, // fallback nếu chưa tính được
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Tuần {week}
          </div>
        ))}
      </div>
    );
  };

  const { highlightedDates } = props;
  const SHIFT: Record<number, string> = {
    1: 'Ca Sáng',
    2: 'Ca Tối',
    3: 'Ca Gãy',
  };
  const renderCell = useCallback(
    (currentDate: Moment, info: any) => {
      if (info.type !== 'date') return info.originNode;

      const isHighlighted = highlightedDates?.some((item) =>
        currentDate.isSame(moment(item.date), 'day')
      );
      const highlightInfo = highlightedDates?.find((item) =>
        currentDate.isSame(moment(item.date), 'day')
      );

      const lastDate = highlightedDates?.[highlightedDates.length - 1]?.date;
      const isLastDate = lastDate && currentDate.isSame(moment(lastDate), 'day');
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: isHighlighted ? (isLastDate ? '#FCC25A' : '#EBF0F2') : undefined,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -99,
          }}
        >
          {props?.isShift ? (
            highlightInfo?.shift ? (
              <div className="flex h-full justify-end flex-col mb-8">
                <div className="bg-primary-500 px-8 py-4 rounded-radius-xl text-common-1000 font-semibold text-12">
                  {SHIFT[highlightInfo.shift]}
                </div>
              </div>
            ) : (
              (() => {
                const start = moment(highlightedDates?.[0]?.date);
                const end = moment(highlightedDates?.[highlightedDates.length - 1]?.date);
                const isInRange = currentDate.isBetween(start, end, 'day', '[]');
                if (isInRange) {
                  return (
                    <div className="flex h-full justify-end flex-col mb-8">
                      <div className="bg-error-500 px-16 py-4 rounded-radius-xl text-common-1000 font-semibold text-12">
                        Nghỉ
                      </div>
                    </div>
                  );
                }
                return null;
              })()
            )
          ) : null}
        </div>
      );
    },
    [props.highlightedDates]
  );

  return (
    <ConfigProvider locale={viVN}>
      <div className="title1 w-full text-center mb-32 flex flex-row justify-between relative">
        <Button
          type="text"
          icon={<LeftOutlined height={24} width={24} />}
          disabled={disableLeft}
          onClick={onPrevDate}
        />
        <div>{title}</div>
        <Button
          type="text"
          icon={<RightOutlined height={24} width={24} />}
          disabled={disableRight}
          onClick={onNextDate}
        />
      </div>
      <div style={{ position: 'relative' }}>
        {/* Cột Tuần */}
        {renderWeekNumbers()}
        {/* Calendar chính */}
        <div ref={calendarRef} style={{ marginLeft: 60, position: 'relative' }}>
          <Component
            headerRender={() => <></>}
            {...props}
            fullscreen={true}
            cellRender={(currentDate, info) => renderCell(currentDate, info)}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default memo(MyCalendar, isEqual);
