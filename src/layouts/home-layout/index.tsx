import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import { useRef } from 'react';

const { Content } = Layout;

export default function HomeLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);

  return (
    <div className="min-h-screen bg-color-100">
      <div className="bg_home_page flex flex-col">
        {/* <MenuCustom ref={refMenu} /> */}
        <div className="wrap_layout">
          {/* <HeaderApp
            onClickMenu={() => {
              // @ts-ignore
              refMenu.current?.onShowHideMenu();
            }}
          /> */}
          <Content className="bg_home_content px-40 py-12 tablet:px-28">
            <>{children}</>
          </Content>
        </div>
      </div>
      {/* <FooterApp /> */}
    </div>
  );
}
