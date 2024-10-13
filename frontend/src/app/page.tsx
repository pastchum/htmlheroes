"use client";

import DisplayResults from "@/components/displayResults";
import Instructions from "@/components/instructions";
import UploadForm from "@/components/uploadForm";
import { useUpload } from "@/context/UploadContext";
import { useEffect } from "react";

export default function Home() {
  const { uploadResult } = useUpload();
  useEffect(() => {}, []);

  return (
    <div className="justify-stretch font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-8 row-start-2 items-stretch sm:items-start mb-10">
        {uploadResult ? (
          <DisplayResults />
        ) : (
          <div className="flex md:flex-row flex-col-reverse justify-stretch justify-items-start p-5 w-full">
            <Instructions />
            <UploadForm />
          </div>
        )}
      </main>
    </div>
  );
}
