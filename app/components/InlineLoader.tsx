'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';

export default function InlineLoader() {
  const ref = useRef<any>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ref.current?.continuousStart();
    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <LoadingBar
      color="#f11946"
      ref={ref}
      height={3}
      shadow={false}
    />
  );
}