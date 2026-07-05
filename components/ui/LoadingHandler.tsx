'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSkeleton } from '@/context/SkeletonContext';

export default function LoadingHandler() {
  const { setLoading } = useSkeleton();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleEnd);
    router.events.on('routeChangeError', handleEnd);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleEnd);
      router.events.off('routeChangeError', handleEnd);
    };
  }, [router, setLoading]);

  return null;
}
