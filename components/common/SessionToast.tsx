'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function SessionToast() {
  const user = useAuthStore((state) => state.user);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;

    const showTimer = setTimeout(() => setShow(true), 0);
    const hideTimer = setTimeout(() => setShow(false), 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [user]);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 shadow-lg rounded-2xl px-5 py-4">
      <span className="text-sm text-gray-600">
        세션이 <span className="font-bold text-primary">60분</span> 후
        만료됩니다.
      </span>
    </div>
  );
}
