import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import { useRef } from 'react';

import Menu from '../menu';

const { Content } = Layout;

interface AppLayoutProps extends LayoutProps {
  isHideBreadcrumb?: boolean;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const refMenu = useRef(null);
  return (
    <div className="flex min-h-screen flex-col justify-between bg-common-1000">
      <div className="flex flex-1 flex-row">
        <Menu ref={refMenu} />
        <div className="wrap_layout w-full">
          <Content>
            <>{children}</>
          </Content>
        </div>
      </div>
    </div>
  );
}
