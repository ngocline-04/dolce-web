import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import MyDatePicker from '@/components/baseDatePicker';
import { Card, Col, Row, Table } from 'antd';
import { type NextPageWithLayout } from './_app';
import { useSelector } from 'react-redux';
import { selectInfoUser } from '@/stores/authSlice';
import { record } from 'zod';
import { t } from 'i18next';
import { title } from 'process';
import { index } from 'drizzle-orm/mysql-core';

const Wage: NextPageWithLayout = () => {
  const userInfo = useSelector(selectInfoUser)
  const userWage = [
    {
      title:'Lương cơ bản',
      time: 150,
      unit: 'Giờ',
      amount: 5000000,
    },
    {
      title:'150% OT',
      time: 0,
      unit: 'Giờ',
      amount: 0,
    },
    {
      title:'Thưởng',
      time: 0,
      unit: 'VND',
      amount: 0,
    },
    {
      title: 'PC chức vụ',
      unit:"Cố định",
      amount: 0,
    },
    {
      title: 'PC ăn trưa',
      time: 16,
      unit:"Ngày",
      amount: 400000,
    },
    {
      title: 'PC xăng xe',
      unit:"Cố định",
      amount: 100000
    },
    {
      title:"Đi muộn",
      time: 2,
      unit: "Ngày",
      amount: -100000
    },
    {
      title:"Tổng",
      amount: 5400000
    }
  ]
  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên mục phụ cấp',
      dataIndex: 'title',
    },
    {
      title: 'Số ngày/ Giờ',
      dataIndex: 'time',
    },
    {
      title: 'Đơn vị chấm công',
      dataIndex: 'unit',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      render: (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount),
    }
  ];
  return (
    <>
      <Meta title={AppConfig.site_name} description={AppConfig.description} />
      <Card title="Phiếu lương > Chi tiết">
        <Row gutter={24}>
          <Col span={12}>
            <div className="font-semibold">Tháng</div>
            <MyDatePicker
              label="Tháng"
              name="month"
              placeholder="Chọn tháng"
              className="w-full"
              format="MM"
              picker="month"
            />
          </Col>
          <Col span={12}>
            <div className="font-semibold">Năm</div>
            <MyDatePicker
              label="Năm"
              name="year"
              placeholder="Chọn năm"
              className="w-full"
              format="YYYY"
              picker="year"
            />
          </Col>
        </Row>
        <div className="font-semibold text-center mt-32">Lương chi tiết tháng 5/2025</div>
        <div className="bg-common-1000 border-weight-s px-12 py-4 mt-8 rounded-radius-m font-semibold flex items-center">
          <div>Tên nhân viên:</div>
          <div className='ml-8'>{userInfo?.name}</div>
        </div>
        <div className="bg-common-1000 border-weight-s px-12 py-4 mt-8 rounded-radius-m font-semibold flex items-center mb-32">
          <div>Mã nhân viên:</div>
          <div className="ml-8">{`DOL${userInfo?.uid?.slice(-3)}`}</div>
        </div>

        <Table
          rowKey="id"
          bordered
          dataSource={userWage}
          columns={columns}
          scroll={{ y: 500, x: 150 * columns?.length }}
        />
      </Card>
    </>
  );
};

Wage.Layout = AppLayout;

export default Wage;
