import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import { CalendarFilled } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { useMemo, useState } from 'react';
import { type NextPageWithLayout } from './_app';

const ManageTimeKeepingStatus: NextPageWithLayout = () => {
  const [isMonth, setIsMonth] = useState(true);
  const columns = useMemo(
    () =>
      [
        {
          title: 'Mã NV',
          dataIndex: 'maNV',
          key: 'maNV',
        },
        {
          title: 'Họ và tên',
          dataIndex: 'hoTen',
          key: 'hoTen',
        },
        {
          title: 'Thời gian làm',
          dataIndex: 'thoiGianLam',
          key: 'thoiGianLam',
          render: (text) => `${text} giờ`,
        },
        {
          title: 'Số giờ thiếu',
          dataIndex: 'gioThieu',
          key: 'gioThieu',
        },
        {
          title: 'Số giờ tăng ca',
          dataIndex: 'gioTangCa',
          key: 'gioTangCa',
        },
      ],
    [isMonth]
  );

  const dataSource = useMemo(
    () =>
      [
        {
          key: 'DOL12',
          maNV: 'DOL12',
          hoTen: 'Nguyễn Ngọc Liên',
          thoiGianLam: 60,
          gioThieu: '0 giờ',
          gioTangCa: '5 giờ',
        },
        {
          key: 'DOL15',
          maNV: 'DOL15',
          hoTen: 'Đào Minh Triệu',
          thoiGianLam: 55,
          gioThieu: '6 giờ',
          gioTangCa: '0 giờ',
        },
        {
          key: 'DOL22',
          maNV: 'DOL22',
          hoTen: 'Lê Mai Anh',
          thoiGianLam: 70,
          gioThieu: '0 giờ',
          gioTangCa: '10 giờ',
        },
        {
          key: 'DOL25',
          maNV: 'DOL25',
          hoTen: 'Đỗ Cẩm Tú',
          thoiGianLam: 25,
          gioThieu: '12 giờ',
          gioTangCa: '0 giờ',
        },
        {
          key: 'DOL34',
          maNV: 'DOL34',
          hoTen: 'Mai Huy Hùng',
          thoiGianLam: 45,
          gioThieu: '30 giờ',
          gioTangCa: '0 giờ',
        },
        {
          key: 'DOL37',
          maNV: 'DOL37',
          hoTen: 'Bùi Minh Tuấn',
          thoiGianLam: 55,
          gioThieu: '15 giờ',
          gioTangCa: '0 giờ',
        },
        {
          key: 'DOL40',
          maNV: 'DOL40',
          hoTen: 'Nguyễn Tuấn Dũng',
          thoiGianLam: 38,
          gioThieu: '4 giờ',
          gioTangCa: '0 giờ',
        },
        {
          key: 'DOL45',
          maNV: 'DOL45',
          hoTen: 'Trần Ngọc Lâm',
          thoiGianLam: 60,
          gioThieu: '4 giờ',
          gioTangCa: '0 giờ',
        },
      ],
    [isMonth]
  );

  return (
    <>
      <Meta title={AppConfig.site_name} description={AppConfig.description} />
      <div className="flex size-full flex-col p-32">
        <h1 className="text-24 font-bold">Báo cáo tình trạng làm việc</h1>
        <Card className="mt-16">
          <Button
            type="text"
            className={`${isMonth ? 'text-primary-500 border-weight-s border-primary-500' : ''} mr-16`}
            onClick={() => setIsMonth(true)}
            icon={<CalendarFilled />}
          >
            Tháng
          </Button>
          <Button
            type="text"
            className={`${!isMonth ? 'text-primary-500 border-weight-s border-primary-500' : ''}`}
            onClick={() => setIsMonth(false)}
            icon={<CalendarFilled />}
          >
            Ngày
          </Button>
          <Table
            className="mt-16"
            // title={}
            columns={columns}
            dataSource={dataSource}
            bordered
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </div>
    </>
  );
};

ManageTimeKeepingStatus.Layout = AppLayout;

export default ManageTimeKeepingStatus;
