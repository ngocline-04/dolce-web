import { Dropdown, Layout } from 'antd';
import { t } from 'i18next';

import { ButtonBase, TextBase } from '@/components';
import { showDialog } from '@/components/dialog';
import { TYPE_ACTION } from '@/components/dialog/type';

const { Header } = Layout;
interface propsMenu {
  onClickMenu?: () => void;
}

const HeaderApp = (props: propsMenu) => {
  // const cacheLogin: CachedUserState = useSelector(selectCacheLogin);
  // const { _logout } = useLogout();
  return (
    <Header className="header_home_page">
      <div className="flex w-full justify-end tablet:justify-between">
        <div className="hidden items-center gap-16 tablet:flex mobile:gap-12">
          {/* <IconSvgLocal
            // height={32}
            // width={32}
            name="IC_MENU_OPEN"
            classNames="w-32 h-32 mobile:w-24 mobile:h-24"
            onClick={() => {
              props.onClickMenu && props.onClickMenu();
            }}
          /> */}
          {/* <IconSvgLocal
            classNames="w-[68px] h-[31px] mobile:h-24 mobile:w-[53]"

            onClick={() => {
              router.push(ROUTES.HOME);
            }}
          /> */}
        </div>

        <div className="flex items-center gap-20">
          <div className="flex items-center">
            <Dropdown
              dropdownRender={(menuInstance) => {
                return <>{menuInstance}</>;
              }}
              menu={{
                className: '!p-0 !rounded-radius-m',
                items: [
                  {
                    className: '!p-[0px]',
                    key: '1',
                    label: (
                      <ButtonBase
                        name="comfirm_logout"
                        onlyWrap
                        className="flex cursor-pointer gap-12 p-12"
                      >
                        {/* <IconSvgLocal
                          classNames="h-24 mobile:h-24 mobile:w-[53]"
                          name="ICON_LOGOUT"
                          fill="rgb(var(--color-900))"
                        /> */}
                        <TextBase className="body3" t18n="home_screen:logout" />
                      </ButtonBase>
                    ),

                    onClick: () => {
                      showDialog({
                        title: t('home_screen:logout'),
                        content: t('home_screen:logout_msg'),
                        actions: [
                          {
                            title: t('home_screen:logout'),
                            // onPress: _logout,
                          },
                          {
                            title: t('home_screen:cancel'),
                            type: TYPE_ACTION.SECONDARY,
                          },
                        ],
                      });
                    },
                  },
                ],
              }}
              trigger={['click']}
            >
              <div className="flex w-[182px] items-center justify-end justify-items-center gap-8">
                <div className="text-right">
                  <TextBase
                    className="body1 text-color-700"
                    t18n="home_screen:hello"
                    presetMobile="caption1"
                  />
                  {/* <TextBase className="body2" presetMobile="caption1">
                    {cacheLogin?.fullName || 'Nguyen Van A'}
                  </TextBase> */}
                </div>
                <div
                  // style={{ position: 'relative', width: '40px', height: '40px', cursor: 'pointer', borderRadius: '40px' }}
                  className="relative h-40 w-40 cursor-pointer overflow-hidden rounded-[50%] tablet:h-36 tablet:w-36 mobile:h-[29px] mobile:w-[29px]"
                  onClick={(e) => e.preventDefault()}
                >
                  {/* <Image
                    src={
                      cacheLogin?.avartar ? `data:image/jpeg;base64,${cacheLogin?.avartar}` : AVATAR
                    }
                    alt="AVATAR"
                    fill
                    style={{ objectFit: 'cover' }}
                  /> */}
                </div>
              </div>
            </Dropdown>
          </div>
          <div className="h-[40px] w-[1px] bg-color-50 tablet:bg-color-300" />
          {/* <AppNotificationBoard /> */}
        </div>
      </div>
    </Header>
  );
};

export { HeaderApp };
