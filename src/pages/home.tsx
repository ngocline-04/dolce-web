import { Button, Card, Col, Form, Input, Row, Select } from 'antd';

import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import MyDatePicker from '@/components/baseDatePicker';
import { useCallback, useMemo } from 'react';
import { type NextPageWithLayout } from './_app';
import MyCalendar from '@/components/calendar/calendar';

const Home: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  const roles = useMemo(() => {
    return [
      {
        value: 'ADMIN',
        label: 'Quản trị viên',
      },
      {
        value: 'STAFF',
        label: 'Nhân viên',
      },
      {
        value: 'HR',
        label: 'Nhân sự',
      },
    ];
  }, []);

  const onSubmit = useCallback((vals) => {},[])
  return (
    <>
      <Meta title={AppConfig.site_name} description={AppConfig.description} />

      <div className="flex size-full flex-col p-32">
        <Card title="Tạo tài khoản">
          <div>
            <Form onFinish={onSubmit} form={form} name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item
                name="userName"
                label="Tên nhân viên"
                rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
              >
                <Input className="h-40" placeholder="Nhập tên nhân viên" />
              </Form.Item>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  >
                    <Input className="h-40" placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                  >
                    <Input className="h-40" placeholder="Nhập email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                  >
                    <Input className="h-40" placeholder="Nhập mật khẩu" type="password" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="repass"
                    dependencies={['password']}
                    label="Nhập lại mật khẩu"
                    rules={[
                      { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mật khẩu chưa trùng khớp!'));
                        },
                      }),
                    ]}
                  >
                    <Input className="h-40" placeholder="Nhập lại mật khẩu" type="password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="address" label="Địa chỉ">
                    <Input className="h-40" placeholder="Nhập địa chỉ" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="dob" label="Ngày sinh">
                    <MyDatePicker className="h-40 w-full" placeholder="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="Chức vụ"
                    rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
                  >
                    <Select options={roles} size="large" placeholder="Chọn chức vụ" allowClear />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="wage" label="Hệ số lương">
                    <Input className="h-40" placeholder="Nhập hệ số lương" type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="note" label="Ghi chú">
                    <Input className="h-40" placeholder="Nhập ghi chú" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-row items-center justify-end gap-16">
                <Form.Item>
                  <Button onClick={() => form.resetFields()} type="default">
                    Huỷ
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" className="bg-pending-500 text-color-900" onClick={() => form.resetFields()} type="primary">
                    Lưu
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};

Home.Layout = AppLayout;

export default Home;
