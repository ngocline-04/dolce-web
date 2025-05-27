import { IconSvgLocal } from '@/components';
import { showDialog } from '@/components/dialog';
import { hideLoading, showLoading } from '@/components/loading';
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { get } from 'lodash';
import { useCallback } from 'react';

export default function LoginPage() {
  const auth = getAuth();
  const onLogin = useCallback(
    (data: any) => {
      const email = get(data, 'username', '');
      const password = get(data, 'password', '');
      showLoading();
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode == 'auth/invalid-credential') {
            showDialog({
              title: 'Lỗi hệ thống',
              image: {
                name: 'IC_AUTHEN_ERROR',
                width: 80,
                height: 80,
                fill: 'text-error-500',
              },
              content: 'Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!',
              actions: [
                {
                  title: 'Thử lại',
                  type: 'secondary',
                },
              ],
            });
          }
          if (errorCode == 'auth/invalid-email') {
            showDialog({
              title: 'Lỗi hệ thống',
              image: {
                name: 'IC_AUTHEN_ERROR',
                width: 80,
                height: 80,
                fill: 'text-error-500',
              },
              content:
                'Người dùng không tồn tại. Vui lòng liên hệ ADMIN để được tạo mới tài khoản!',
              actions: [
                {
                  title: 'Thử lại',
                  type: 'secondary',
                },
              ],
            });
          }
        })
        .finally(() => {
          hideLoading();
        });
    },
    [auth]
  );
  return (
    <div className="bg-common-100 flex min-h-screen items-center justify-center">
      <div className="relative flex w-1/2 flex-col justify-center bg-alias-background_default p-48 tablet:items-center mobile:w-full mobile:p-32">
        <div className="absolute left-0 top-0 mobile:hidden">
          <IconSvgLocal name="IC_BG_LEFT" classNames="h-[80px] mb-16" />
        </div>
        <IconSvgLocal name="IC_LOGO_TP" classNames="h-[80px] mb-32" />
        <div className="flex flex-col justify-center bg-common-1000 p-48 text-center shadow-down-xs shadow-color-200 mobile:max-w-sm mobile:p-16">
          <h1 className="mb-16 text-20 font-bold">Đăng nhập</h1>

          <Form name="login" onFinish={onLogin} layout="vertical" className="text-left">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Vui lòng nhập tài khoản!' },
                { type: 'email', message: 'Email không đúng định dạng!' },
              ]}
            >
              <Input placeholder="Tài khoản" className="px-10 text-14 leading-20" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder="Mật khẩu" className="px-10 text-14 leading-20" />
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="py-10 rounded-radius-s hover:opacity-90 bg-alias-btn_default text-14 font-semibold leading-20 text-common-1000 transition-opacity"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className="-m-48 mobile:-m-16">
            <IconSvgLocal name="IC_LOGIN_BT" classNames="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
