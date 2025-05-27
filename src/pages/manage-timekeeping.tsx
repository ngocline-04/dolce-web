import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import { CalendarFilled } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { useMemo, useState } from 'react';
import { type NextPageWithLayout } from './_app';

const ManageTimeKeeping: NextPageWithLayout = () => {
  const [isMonth, setIsMonth] = useState(true);
  const columns = useMemo(
    () =>
      isMonth
        ? [
            {
              title: 'Mã NV',
              dataIndex: 'maNV',
              key: 'maNV',
              fixed: 'left',
              width: 100,
            },
            {
              title: 'Họ và tên',
              dataIndex: 'hoTen',
              key: 'hoTen',
              fixed: 'left',
              width: 180,
            },
            {
              title: 'Ngày 01',
              children: [
                {
                  title: 'Thời gian vào ca',
                  dataIndex: ['ngay1', 'vaoCa'],
                  key: 'ngay1VaoCa',
                  align: 'center',
                },
                {
                  title: 'Thời gian kết ca',
                  dataIndex: ['ngay1', 'ketCa'],
                  key: 'ngay1KetCa',
                  align: 'center',
                },
              ],
            },
            {
              title: 'Ngày 02',
              children: [
                {
                  title: 'Thời gian vào ca',
                  dataIndex: ['ngay2', 'vaoCa'],
                  key: 'ngay2VaoCa',
                  align: 'center',
                },
                {
                  title: 'Thời gian kết ca',
                  dataIndex: ['ngay2', 'ketCa'],
                  key: 'ngay2KetCa',
                  align: 'center',
                },
              ],
            },
            {
              title: 'Ngày 03',
              children: [
                {
                  title: 'Thời gian vào ca',
                  dataIndex: ['ngay3', 'vaoCa'],
                  key: 'ngay3VaoCa',
                  align: 'center',
                },
                {
                  title: 'Thời gian kết ca',
                  dataIndex: ['ngay3', 'ketCa'],
                  key: 'ngay3KetCa',
                  align: 'center',
                },
              ],
            },
          ]
        : [
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
            title: 'Thời gian vào ca',
            dataIndex: 'thoiGianVaoCa',
            key: 'thoiGianVaoCa',
          },
          {
            title: 'Thời gian kết ca',
            dataIndex: 'thoiGianKetCa',
            key: 'thoiGianKetCa',
          },
        ],
    [isMonth]
  );

  const dataSource = useMemo(
    () =>
      isMonth
        ? [
            {
              key: 'DOL12',
              maNV: 'DOL12',
              hoTen: 'Nguyễn Ngọc Liên',
              ngay1: { vaoCa: '5h58’', ketCa: '15h30’' },
              ngay2: { vaoCa: '5h58’', ketCa: '15h30’' },
              ngay3: { vaoCa: '5h58’', ketCa: '15h30’' },
            },
            {
              key: 'DOL15',
              maNV: 'DOL15',
              hoTen: 'Đào Minh Triệu',
              ngay1: { vaoCa: '6h02’', ketCa: '15h30’' },
              ngay2: { vaoCa: '6h02’', ketCa: '15h30’' },
              ngay3: { vaoCa: '6h02’', ketCa: '15h30’' },
            },
            {
              key: 'DOL22',
              maNV: 'DOL22',
              hoTen: 'Lê Mai Anh',
              ngay1: { vaoCa: '6h01’', ketCa: '15h30’' },
              ngay2: { vaoCa: '6h01’', ketCa: '15h30’' },
              ngay3: { vaoCa: '6h01’', ketCa: '15h30’' },
            },
            {
              key: 'DOL25',
              maNV: 'DOL25',
              hoTen: 'Đỗ Cẩm Tú',
              ngay1: { vaoCa: '6h58’', ketCa: '15h30’' },
              ngay2: { vaoCa: '6h58’', ketCa: '15h30’' },
              ngay3: { vaoCa: '6h58’', ketCa: '15h30’' },
            },
            {
              key: 'DOL34',
              maNV: 'DOL34',
              hoTen: 'Mai Huy Hùng',
              ngay1: { vaoCa: '10h30’', ketCa: '21h30’' },
              ngay2: { vaoCa: '10h30’', ketCa: '21h30’' },
              ngay3: { vaoCa: '10h30’', ketCa: '21h30’' },
            },
            {
              key: 'DOL37',
              maNV: 'DOL37',
              hoTen: 'Bùi Minh Tuấn',
              ngay1: { vaoCa: '17h30’', ketCa: '23h30’' },
              ngay2: { vaoCa: '17h30’', ketCa: '23h30’' },
              ngay3: { vaoCa: '17h30’', ketCa: '23h30’' },
            },
            {
              key: 'DOL40',
              maNV: 'DOL40',
              hoTen: 'Nguyễn Tuấn Dũng',
              ngay1: { vaoCa: '6h30’', ketCa: '15h30’' },
              ngay2: { vaoCa: '6h30’', ketCa: '15h30’' },
              ngay3: { vaoCa: '6h30’', ketCa: '15h30’' },
            },
            {
              key: 'DOL45',
              maNV: 'DOL45',
              hoTen: 'Trần Ngọc Lâm',
              ngay1: { vaoCa: '6h03’', ketCa: '15h30’' },
              ngay2: { vaoCa: '6h03’', ketCa: '15h30’' },
              ngay3: { vaoCa: '6h03’', ketCa: '15h30’' },
            },
          ]
        : [
            {
              key: 'DOL12',
              maNV: 'DOL12',
              hoTen: 'Nguyễn Ngọc Liên',
              thoiGianVaoCa: '5h58’',
              thoiGianKetCa: '15h30’',
            },
            {
              key: 'DOL15',
              maNV: 'DOL15',
              hoTen: 'Đào Minh Triệu',
              thoiGianVaoCa: '6h02’',
              thoiGianKetCa: '15h30’',
            },
            {
              key: 'DOL22',
              maNV: 'DOL22',
              hoTen: 'Lê Mai Anh',
              thoiGianVaoCa: '6h01’',
              thoiGianKetCa: '15h30’',
            },
            {
              key: 'DOL25',
              maNV: 'DOL25',
              hoTen: 'Đỗ Cẩm Tú',
              thoiGianVaoCa: '6h58’',
              thoiGianKetCa: '15h30’',
            },
            {
              key: 'DOL34',
              maNV: 'DOL34',
              hoTen: 'Mai Huy Hùng',
              thoiGianVaoCa: '10h30’',
              thoiGianKetCa: '21h30’',
            },
            {
              key: 'DOL37',
              maNV: 'DOL37',
              hoTen: 'Bùi Minh Tuấn',
              thoiGianVaoCa: '17h30’',
              thoiGianKetCa: '23h30’',
            },
            {
              key: 'DOL40',
              maNV: 'DOL40',
              hoTen: 'Nguyễn Tuấn Dũng',
              thoiGianVaoCa: '6h30’',
              thoiGianKetCa: '15h30’',
            },
            {
              key: 'DOL45',
              maNV: 'DOL45',
              hoTen: 'Trần Ngọc Lâm',
              thoiGianVaoCa: '6h03’',
              thoiGianKetCa: '15h30’',
            },
          ],
    [isMonth]
  );

  return (
    <>
      <Meta title={AppConfig.site_name} description={AppConfig.description} />
      <div className="flex size-full flex-col p-32">
        <h1 className="text-24 font-bold">Báo cáo chấm công</h1>
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

ManageTimeKeeping.Layout = AppLayout;

export default ManageTimeKeeping;
