"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SkeletonContextProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const SkeletonContext = createContext<SkeletonContextProps | undefined>(undefined);

export const SkeletonProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLoading = (loading: boolean) => setIsLoading(loading);

  return (
    <SkeletonContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </SkeletonContext.Provider>
  );
};

export const useSkeleton = (): SkeletonContextProps => {
  const ctx = useContext(SkeletonContext);
  if (!ctx) {
    throw new Error('useSkeleton must be used within a SkeletonProvider');
  }
  return ctx;
};
