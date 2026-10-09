import { useEffect, useState } from 'react';

// True below 768px — the same breakpoint as src/mobile.css. Desktop/tablet always get false.
export const PHONE_QUERY = '(max-width: 767.98px)';
export const isPhoneNow = () => typeof window !== 'undefined' && !!window.matchMedia?.(PHONE_QUERY).matches;

export function useIsPhone() {
  const [phone, setPhone] = useState(isPhoneNow);
  useEffect(() => {
    const mq = window.matchMedia?.(PHONE_QUERY);
    if (!mq) return;
    const on = () => setPhone(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
}
