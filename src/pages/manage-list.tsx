import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import { selectInfoUser } from '@/stores/authSlice';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { filter } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { app, type NextPageWithLayout } from './_app';
const db = getFirestore(app);
const ManageList: NextPageWithLayout = () => {
  const userInfo = useSelector(selectInfoUser);
  const [data, setData] = useState([]);

  const getListFile = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const dataList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(filter(dataList, (el: any) => !el?.notDisplay));
  }, []);
  useEffect(() => {
    getListFile();
  }, [getListFile()]);

  const columns = [
    {
      title: 'STT',
      render: (_: any, record: any, index: number) => {
        ++index;
        return index;
      },
    },
    {
      title: 'Nhân viên',
      dataIndex: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (_: any, record: any) => {
        return <div>{dayjs(record?.createdDate || undefined).format('DD/MM/YYYY')}</div>;
      },
    },
    {
      title: 'Trạng thái',
      render: () => {
        return <Tag color="green">Hoạt động</Tag>;
      },
    },
    {
      title: 'Thao tác',
      render: () => {
        return (
          <div>
            <Button type="text" icon={<EyeOutlined />} />
            {['ADMIN', 'HR'].includes(userInfo?.role) ? (
              <Button type="text" icon={<EditOutlined />} />
            ) : null}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Meta title={AppConfig.site_name} description={AppConfig.description} />
      <div className="flex size-full flex-col p-32">
        <div className="mt-48 flex size-full flex-col justify-center">
          <Card title="Danh sách tài khoản">
            <Table
              bordered
              dataSource={data}
              columns={columns}
              rowKey="id"
              scroll={{ y: 500, x: 150 * []?.length }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};
ManageList.Layout = AppLayout;

export default ManageList;
