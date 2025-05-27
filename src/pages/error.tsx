import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import { type NextPageWithLayout } from './_app';

const Error: NextPageWithLayout = () => {
  return <Meta title={AppConfig.site_name} description={AppConfig.description} />;
};

Error.Layout = AppLayout;

export default Error;
