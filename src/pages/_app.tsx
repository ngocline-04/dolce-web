// eslint-disable-next-line simple-import-sort/imports
import '@/styles/global.scss';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';

import { DialogView } from '@/components';
import { LoadingProgress } from '@/components/loading';
import { ToastView } from '@/components/toast';
import { ROUTES } from '@/config/routes';
import EmptyLayout from '@/layouts/empty-layout';
import { setInfoUser, setResetUser } from '@/stores/authSlice';
import i18n from '@/utils/i18n/i18n';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapperStore } from '../stores/store';

export const firebaseConfig = {
  apiKey: 'AIzaSyC3PwfnVTZaxvSkn71TpfX4OAxgBiwLODA',
  authDomain: 'dolce-web.firebaseapp.com',
  projectId: 'dolce-web',
  storageBucket: 'dolce-web.firebasestorage.app',
  messagingSenderId: '218789178303',
  appId: '1:218789178303:web:a89bb0216598206d8ccf0a',
  measurementId: 'G-6ZRLGGS2FP',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: LayoutProps) => React.ReactElement;
};

export type LayoutProps = {
  children: React.ReactNode;
};

const MyApp = ({ Component, ...rest }: AppPropsWithLayout) => {
  const { store, props } = wrapperStore.useWrappedStore(rest);
  const Layout = Component.Layout ?? EmptyLayout;
  const auth = getAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && isMounted) {
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
          router.push(screens[findUser.role]);
        }
      } else if (!user && isMounted) {
        dispatch(setResetUser());
        router.push('/');
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auth, dispatch, router]);
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme="light">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  controlHeight: 38.75,
                  algorithm: true,
                },
              },
            }}
          >
            <Layout>
              <ToastView />
              <Component {...props.pageProps} />
              <DialogView />
              <LoadingProgress />
            </Layout>
          </ConfigProvider>
        </ThemeProvider>
      </I18nextProvider>
    </PersistGate>
  );
};

export default wrapperStore.withRedux(MyApp);
