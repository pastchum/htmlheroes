"use client";

import React from "react";
import { useUpload } from "@/context/UploadContext";
import DisplayTraits from "./displayTraits";
import CareerPaths from "./careerPaths";

export default function DisplayResults() {
  const { uploadResult, setUploadResult } = useUpload();
  console.log("data: " + JSON.stringify(uploadResult));

  const handleNewUploadRequest = () => {
    setUploadResult(null);
  };

  return (
    <div className="w-full h-full border-2 m-2 rounded-xl shadow md:overflow-y-auto md: h-100vh">
      <div className="justify-between flex-row flex">
        <div className="p-2 text-4xl text-slate-700 font-extrabold flex">
          YOUR <div className="text-teal-500 px-2"> RESUME</div>
        </div>
        <button
          onClick={handleNewUploadRequest}
          className="md:visible invisible"
        >
          <div className="m-4 border-2 p-2 rounded-xl bg-teal-400 text-slate-100 font-bold">
            Upload Another Resume
          </div>
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-items-stretch">
        <DisplayTraits />
        <div className="flex flex-col justify-items-stretch">
          <CareerPaths />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <button onClick={handleNewUploadRequest} className="md:hidden">
          <div className="m-4 border-2 p-2 rounded-xl bg-teal-400 text-slate-100 font-bold">
            Upload Another Resume
          </div>
        </button>
      </div>
    </div>
  );
}
