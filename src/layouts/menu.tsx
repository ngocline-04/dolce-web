import { BookOutlined, DownOutlined, LoginOutlined, SettingFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useDispatch } from 'react-redux';

import type { IconSvgTypes } from '@/assets/svg';
import { IconSvgLocal, TextBase } from '@/components';
import { ROUTES } from '@/config/routes';
import { db } from '@/pages/_app';
import { setInfoUser, setResetUser } from '@/stores/authSlice';
import { collection, getDocs } from 'firebase/firestore';

interface MenuNav {
  icon?: IconSvgTypes;
  label?: ReactNode;
  link?: string;
  children?: MenuNav[]; // 👈 Thêm children nếu có menu con
}

const Component = forwardRef<HTMLDivElement, { children: ReactNode }>((props, _ref) => {
  const [keyActive, setKeyActive] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth();
  console.log(auth?.currentUser?.uid);
  const user = auth?.currentUser;
  const dispatch = useDispatch();

  const getUserInfo = useCallback(async () => {
    const uid = user?.uid;
    const querySnapshot = await getDocs(collection(db, 'users'));
    const dataList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const screens = {
      ADMIN: ROUTES.HOME,
      STAFF: ROUTES.REGISTER_CALENDAR,
      HR: ROUTES.REGISTER_CALENDAR,
    };
    const findUser = dataList.find((el: any) => el?.uid == uid) as
      | {
          uid: string;
          email: string;
          name: string;
          role: keyof typeof screens;
        }
      | undefined;

    if (uid && findUser) {
      const cleanUser = JSON.parse(JSON.stringify(findUser));
      dispatch(setInfoUser(cleanUser));
      setUserInfo(cleanUser); // Set userInfo state
      setKeyActive(screens[findUser.role]); // Set active key based on user role
    }
  }, [user?.uid, dispatch]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  const router = useRouter();
  const [help, setHelp] = useState(false);

  const activeClassName =
    'text-color-900 mobile:body-text-14-regular bg-common-1000 rounded-radius-xl';
  const inactiveClassName = 'text-color-900 mobile:body-text-14-regular';

  const menuData: MenuNav[] = useMemo(() => {
    if (userInfo?.role == 'HR') {
      return [
        {
          label: <TextBase>Đăng kí lịch làm</TextBase>,
          link: ROUTES.REGISTER_CALENDAR,
          icon: 'IC_TAB_CALENDAR' as keyof typeof IconSvgLocal,
        },
        {
          label: <TextBase>Lịch làm việc đã đăng ký</TextBase>,
          link: ROUTES.CALENDAR_REGISTED,
          icon: 'IC_REGISTED' as keyof typeof IconSvgLocal,
        },
        {
          label: <TextBase>Quản lý ca làm</TextBase>,
          link: ROUTES.MANAGE_SHIFT,
          icon: 'IC_TAB_TIME' as keyof typeof IconSvgLocal,
        },
        {
          label: <TextBase>Theo dõi chấm công</TextBase>,
          link: ROUTES.TIMEKEEPING,
          icon: 'IC_TAB_TIME' as keyof typeof IconSvgLocal,
        },
        {
          label: <TextBase>Quản lý chấm công</TextBase>,
          icon: 'IC_LIST' as keyof typeof IconSvgLocal,
          link: ROUTES.MANAGE_TIMEKEEPING, // Link mặc định khi click cha
          children: [
            {
              label: <TextBase>Báo cáo chấm công</TextBase>,
              link: ROUTES.MANAGE_TIMEKEEPING,
            },
            {
              label: <TextBase>Báo cáo chấm công tình trạng làm việc</TextBase>,
              link: ROUTES.MANAGE_TIMEKEEPING_STATUS,
            },
          ],
        },
        {
          label: <TextBase>Lương</TextBase>,
          link: ROUTES.MANAGE_WAGE,
          icon: 'IC_TAB_WAGE' as keyof typeof IconSvgLocal,
        },
      ];
    }
    if (userInfo?.role == 'STAFF') {
      return [
        {
          label: <TextBase>Đăng kí lịch làm</TextBase>,
          link: ROUTES.REGISTER_CALENDAR,
          icon: 'IC_TAB_CALENDAR' as keyof typeof IconSvgLocal,
        },
        {
          label: <TextBase>Lịch làm việc đã đăng ký</TextBase>,
          link: ROUTES.CALENDAR_REGISTED,
          icon: 'IC_REGISTED' as keyof typeof IconSvgLocal,
        },
        {
          label: <TextBase>Theo dõi chấm công</TextBase>,
          link: ROUTES.TIMEKEEPING,
          icon: 'IC_TAB_TIME' as keyof typeof IconSvgLocal,
        },
        {
          label: <TextBase>Lương</TextBase>,
          link: ROUTES.WAGE,
          icon: 'IC_TAB_WAGE' as keyof typeof IconSvgLocal,
        },
      ];
    }
    return [
      {
        label: <TextBase>Tạo tài khoản</TextBase>,
        link: ROUTES.HOME,
        icon: 'IC_SQUARE' as keyof typeof IconSvgLocal,
      },
      {
        label: <TextBase>Danh sách tài khoản</TextBase>,
        link: ROUTES.MANAGE,
        icon: 'IC_LIST' as keyof typeof IconSvgLocal,
      },
    ];
  }, [userInfo]);

  useEffect(() => {
    const currentRoute = router.pathname;

    // Kiểm tra cả menu chính và con
    let foundItem = menuData.find(
      (item) => item.link === currentRoute || item.children?.some((c) => c.link === currentRoute)
    );

    if (foundItem) {
      const foundChild = foundItem.children?.find((c) => c.link === currentRoute);
      setKeyActive(foundChild?.link || foundItem.link || '');
    }
  }, [router.pathname, menuData]);

  const onHelp = useCallback(() => {
    setHelp(!help);
  }, [help]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth); // ✅ Đăng xuất khỏi Firebase
      dispatch(setResetUser()); // ✅ Reset Redux state
      router.push('/'); // ✅ Điều hướng về trang login/home
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [auth, dispatch, router]);
  const menuFixed = useMemo(() => {
    return (
      <div className="h-full w-[260px] bg-primary-50 px-24 py-16">
        <div className="flex flex-col w-full items-center justify-center">
          <IconSvgLocal name="IC_LOGO_TP" classNames="h-[60px]" />
          <div className="w-full flex m-16">
            <div>{userInfo?.name}-</div>
            <div className="ml-4">{userInfo?.role}</div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start">
          {menuData.map((item, i) => {
            const isActive = keyActive === item.link;

            return (
              <div key={item.link || i} className="w-full">
                <Link
                  href={item.link || '#'}
                  className={`${
                    isActive ? activeClassName : inactiveClassName
                  } flex w-full items-center p-16`}
                >
                  {item?.icon && (
                    <IconSvgLocal
                      classNames={`${isActive ? 'text-pending-500' : ''} h-24`}
                      name={item.icon as keyof IconSvgTypes}
                    />
                  )}
                  <div className="ml-16">{item?.label}</div>
                </Link>

                {/* Render children if exists */}
                {item.children?.map((subItem, j) => {
                  const isSubActive = keyActive === subItem.link;
                  return (
                    <Link
                      key={subItem.link || j}
                      href={subItem.link || '#'}
                      className={`${
                        isSubActive ? "font-semibold text-pending-500" : inactiveClassName
                      } ml-24 flex w-[calc(100%-24px)] items-center p-12 rounded-radius-xl`}
                    >
                      <div className="ml-16">{subItem?.label}</div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [keyActive, menuData, userInfo]);

  return (
    <div className="flex min-h-screen flex-col bg-primary-50">
      {/* ✅ Menu cố định bên trái */}
      {menuFixed}
      <div className="flex-1">
        {/* Nội dung chính của trang */}
        {props?.children}
      </div>
      <div className="flex w-full flex-col items-center justify-center p-16 text-16">
        <Button onClick={onHelp} type="text" icon={help ? <DownOutlined /> : <SettingFilled />}>
          Trợ giúp
        </Button>
        {help ? (
          <div className="flex flex-col mt-16">
            <Button icon={<LoginOutlined />} type="text" onClick={handleLogout}>
              Đăng xuất
            </Button>
            <Button icon={<BookOutlined />} type="text">
              Chính sách
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
});

Component.displayName = 'MenuComponent';
const MenuCustom = memo(Component, isEqual);
export default MenuCustom;
