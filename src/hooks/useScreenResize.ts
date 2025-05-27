import { useEffect, useState } from 'react';

const getTypeDevice = () => {
  window.innerWidth;
  switch (true) {
    case window.innerWidth >= 768 && window.innerWidth <= 1200:
      return 'tablet';
    case window.innerWidth < 768:
      return 'mobile';
    default:
      return 'desktop';
  }
};

// desktop: { max: '1366px' },
// tablet: { max: '1200px' }, // Ex: table: mt-1
// mobile: { max: '640px' },

export default function useScreenResize() {
  const [typeDevice, setTypeDevice] = useState<'desktop' | 'tablet' | 'mobile'>(
    getTypeDevice(),
  );

  useEffect(() => {
    const onResize = () => {
      setTypeDevice(getTypeDevice());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return typeDevice;
}
