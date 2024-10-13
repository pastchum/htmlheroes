"use client";

import { useUpload } from "@/context/UploadContext";

export default function DisplayResults() {
  const { uploadResult } = useUpload();

  return <div>{uploadResult}</div>;
}
