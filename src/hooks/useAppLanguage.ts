import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { LANGUAGE_TYPE } from '@/stores/globalSlice';
import { selectLanguage, setLanguage } from '@/stores/globalSlice';
import { changeLanguage } from '@/utils/i18n/i18n';

export const useAppLanguage = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);

  const setLanguageApp = (language: LANGUAGE_TYPE) => {
    dispatch(setLanguage(language));
    changeLanguage(language);
  };

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return { currentLanguage, setLanguageApp };
};
