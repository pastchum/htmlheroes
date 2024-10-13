"use client";

import Instructions from "@/components/instructions";
import UploadForm from "@/components/uploadForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [results, setResults] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="justify-stretch font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-8 row-start-2 items-stretch sm:items-start">
        {results ? (
          <div>results</div>
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
