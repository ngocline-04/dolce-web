import { Divider, Layout } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { IconSvgTypes } from '@/assets/svg';
import { IconSvgLocal, TextBase } from '@/components';
import { K_EMAIL, K_HOTLINE_FIRST, K_HOTLINE_SECOND } from '@/config/constants';

const { Footer } = Layout;

const FooterApp = () => {
  const { t } = useTranslation();
  const tableOfContents = useMemo(() => {
    return [
      {
        title: t('text:about_comp'),
      },
      {
        title: t('text:field_active'),
      },
      {
        title: t('text:process'),
      },
      {
        title: t('text:project'),
      },
      {
        title: t('text:partner'),
      },
      {
        title: t('text:media'),
      },
    ];
  }, [t]);
  const renderTables = useCallback(() => {
    const tableLeft = tableOfContents.slice(0, 3);
    const tableRight = tableOfContents.slice(3, 6);

    return (
      <div className="flex flex-col">
        <TextBase
          presetMobile="body-text-18-bold"
          t18n="text:table"
          className="body-text-24-bold mb-24 text-primary-700"
        />
        <div className="flex tablet:flex-col mobile:flex-col">
          <div className="mr-40 flex flex-col">
            {tableLeft.map((item, index) => (
              <TextBase
                presetMobile="body-text-16-regular"
                className="body-text-18-regular mb-16 text-color-50"
                key={index}
              >
                {item?.title}
              </TextBase>
            ))}
          </div>
          <div>
            {tableRight.map((item, index) => (
              <TextBase
                presetMobile="body-text-16-regular"
                className="body-text-18-regular mb-16 text-color-50"
                key={index}
              >
                {item?.title}
              </TextBase>
            ))}
          </div>
        </div>
      </div>
    );
  }, [tableOfContents]);
  const dataSocial = useMemo(
    () => [
      {
        ic: 'IC_ZALO',
        link: '',
      },
      {
        ic: 'IC_FACEBOOK',
        link: '',
      },
      {
        ic: 'IC_INS',
        link: '',
      },
      {
        ic: 'IC_LINKEDLN',
        link: '',
      },
      {
        ic: 'IC_YOUTUBE',
        link: '',
      },
    ],
    []
  );
  const renderContact = useCallback(() => {
    return (
      <div className="flex flex-col">
        <TextBase
          presetMobile="body-text-18-bold"
          t18n="text:contact"
          className="body-text-24-bold mb-24 text-primary-700"
        />
        <TextBase
          presetMobile="body-text-16-regular"
          className="body-text-18-regular mb-24 text-color-50"
        >
          {K_EMAIL}
        </TextBase>
        <TextBase
          presetMobile="body-text-16-regular"
          className="body-text-18-regular mb-24 text-color-50"
        >
          {K_HOTLINE_FIRST}
        </TextBase>
        <TextBase
          presetMobile="body-text-16-regular"
          className="body-text-18-regular mb-24 text-color-50"
        >
          {K_HOTLINE_SECOND}
        </TextBase>
        <div className="flex items-center">
          {dataSocial.map((item, index) => {
            return (
              <a
                href={item?.link}
                key={index}
                className={`${index == dataSocial.length - 1 ? 'mr-0' : 'mr-24'}`}
              >
                <IconSvgLocal name={item?.ic as IconSvgTypes} classNames="h-32" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }, [dataSocial]);
  return (
    <Footer className="footer_app  bg-common-0" style={{ height: 'auto' }}>
      <div className="flex flex-1 justify-center">
        <div className="relative w-3/4 pb-48 pt-[100px] tablet:w-full mobile:w-full mobile:px-24 mobile:pb-24 mobile:pt-48">
          <div className="absolute bottom-0">
            <IconSvgLocal name="IC_FOOTER" classNames="h-[250px] mobile:h-[200px]" />
          </div>
          <div className="flex items-start justify-between mobile:flex-col">
            <div className="mr-48 w-1/4 mobile:mb-32">
              {/* <IconSvgLocal
                name="IC_LOGO_V2"
                classNames="h-[52px] mobile:h-[36px] tablet:h-[46px]"
              /> */}
            </div>
            <div className="flex w-3/4 justify-between mobile:flex-col">
              {renderTables()}
              {renderContact()}
            </div>
          </div>
          <Divider className="bg-color-600" />
          <div className="flex items-center mobile:flex-col mobile:justify-center">
            <div className="flex items-center mobile:mb-12">
              <TextBase
                presetMobile="body-text-16-regular"
                className="body-text-16-regular text-color-50"
              >
                Services
              </TextBase>
              <Divider type="vertical" className="mx-20 bg-color-50" />
              <TextBase
                presetMobile="body-text-16-regular"
                className="body-text-16-regular text-color-50"
              >
                Privacy Policy
              </TextBase>
            </div>
            <TextBase className="body-text-14-regular ml-12 text-color-300">
              © 2024 MOITRUONGXANHTANPHU All Rights Reserved
            </TextBase>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export { FooterApp };
