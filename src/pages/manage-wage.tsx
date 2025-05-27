import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import MyDatePicker from '@/components/baseDatePicker';
import { ROUTES } from '@/config/routes';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { type NextPageWithLayout } from './_app';

const ManageWage: NextPageWithLayout = () => {
  const router = useRouter();
  const employeeList = [
    {
      maNV: 'DOL12',
      hoVaTen: 'Nguyễn Ngọc Liên',
      chucVu: 'Phục vụ',
      thoiGianLam: '150 giờ',
      tangCa: '0',
      thuong: '0',
      phuCap: '500.000',
      giamTru: '100.000',
      tong: '4150000',
    },
    {
      maNV: 'DOL15',
      hoVaTen: 'Đào Minh Triệu',
      chucVu: 'Phụ bếp',
      thoiGianLam: '125 giờ',
      tangCa: '0',
      thuong: '200.000',
      phuCap: '0',
      giamTru: '0',
      tong: '3325000',
    },
    {
      maNV: 'DOL22',
      hoVaTen: 'Lê Mai Anh',
      chucVu: 'Phục vụ',
      thoiGianLam: '213 giờ',
      tangCa: '5 giờ',
      thuong: '500.000',
      phuCap: '0',
      giamTru: '0',
      tong: '11525000',
    },
    {
      maNV: 'DOL25',
      hoVaTen: 'Đỗ Cẩm Tú',
      chucVu: 'Lễ tân',
      thoiGianLam: '140 giờ',
      tangCa: '0',
      thuong: '300.000',
      phuCap: '0',
      giamTru: '0',
      tong: '3800000',
    },
    {
      maNV: 'DOL34',
      hoVaTen: 'Mai Huy Hùng',
      chucVu: 'Lễ tân',
      thoiGianLam: '216 giờ',
      tangCa: '0',
      thuong: '200.000',
      phuCap: '150.000',
      giamTru: '0',
      tong: '10850000',
    },
    {
      maNV: 'DOL37',
      hoVaTen: 'Bùi Minh Tuấn',
      chucVu: 'Thu ngân',
      thoiGianLam: '208 giờ',
      tangCa: '0',
      thuong: '300.000',
      phuCap: '0',
      giamTru: '0',
      tong: '10700000',
    },
    {
      maNV: 'DOL40',
      hoVaTen: 'Nguyễn Tuấn Dũng',
      chucVu: 'Bếp trưởng',
      thoiGianLam: '132 giờ',
      tangCa: '2 giờ',
      thuong: '100.000',
      phuCap: '0',
      giamTru: '0',
      tong: '3500000',
    },
    {
      maNV: 'DOL45',
      hoVaTen: 'Trần Ngọc Lâm',
      chucVu: 'Phục vụ',
      thoiGianLam: '150 giờ',
      tangCa: '0',
      thuong: '0',
      phuCap: '0',
      giamTru: '50.000',
      tong: '3750000',
    },
  ];

  const columns = [
    {
      title: 'Mã NV',
      key: 'maNV',
      render: (_: any, record: any) => (record?.maNV ? `DOL${record?.maNV?.slice(-3)}` : 'N/A'),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chucVu',
      key: 'chucVu',
    },
    {
      title: 'Thời gian làm',
      dataIndex: 'thoiGianLam',
      key: 'thoiGianLam',
    },
    {
      title: 'Tăng ca',
      dataIndex: 'tangCa',
      key: 'tangCa',
    },
    {
      title: 'Thưởng',
      dataIndex: 'thuong',
      key: 'thuong',
    },
    {
      title: 'Phụ cấp',
      dataIndex: 'phuCap',
      key: 'phuCap',
    },
    {
      title: 'Giảm trừ',
      dataIndex: 'giamTru',
      key: 'giamTru',
    },
    {
      title: 'Tổng',
      dataIndex: 'tong',
      key: 'tong',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button
            type="text"
            onClick={() => router.push(ROUTES.DETAIL_WAGE)}
            icon={<EyeOutlined />}
            className="text-blue-500"
          ></Button>
          <Button
            type="text"
            onClick={() => router.push(ROUTES.DETAIL_WAGE)}
            icon={<EditOutlined />}
            className="text-blue-500"
          ></Button>
          <Button type="text" icon={<DeleteOutlined />} className="text-blue-500"></Button>
        </div>
      ),
    },
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
              className="w-full h-40"
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
              className="w-full h-40"
              format="YYYY"
              picker="year"
            />
          </Col>
        </Row>

        <Button type="primary" className="h-40 mt-32 bg-pending-500" icon={<DownloadOutlined />}>
          Xuất file Excel
        </Button>

        <div className="font-semibold text-center mt-32 mb-32">Lương chi tiết tháng 5/2025</div>

        <Table
          rowKey="id"
          bordered
          dataSource={employeeList}
          columns={columns}
          scroll={{ y: 500, x: 150 * columns?.length }}
        />
      </Card>
    </>
  );
};

ManageWage.Layout = AppLayout;

export default ManageWage;
