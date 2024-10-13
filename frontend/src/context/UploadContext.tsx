"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface UploadProviderProps {
  children: ReactNode;
}

interface UploadContextType {
  uploadResult: any;
  setUploadResult: React.Dispatch<React.SetStateAction<any>>;
}

const UploadContext = createContext<UploadContextType | null>(null);

export function UploadProvider({ children }: UploadProviderProps) {
  const [uploadResult, setUploadResult] = useState(null);

  return (
    <UploadContext.Provider value={{ uploadResult, setUploadResult }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  return useContext(UploadContext) as UploadContextType;
}
