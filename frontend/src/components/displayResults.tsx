"use client";

import { useUpload } from "@/context/UploadContext";

export default function DisplayResults() {
  const { uploadResult, setUploadResult } = useUpload();
  console.log("data: " + uploadResult);
  const traits = uploadResult.extractedSkills;
  console.log("traits: " + traits);

  const handleNewUploadRequest = () => {
    setUploadResult(null);
  };

  return (
    <div className="w-full h-full border-2 m-2 rounded-xl shadow">
      <div className="justify-between flex-row flex">
        <div className="p-2 text-4xl text-slate-700 font-extrabold flex">
          YOUR <div className="text-teal-500 px-2"> RESUME</div>
        </div>
        <button onClick={handleNewUploadRequest}>
          <div className="m-4 border-2 p-2 rounded-xl bg-teal-400 text-slate-100 font-bold">
            Upload Another Resume
          </div>
        </button>
      </div>
      <div className="m-2 px-5 py-2 text-teal-400 font-bold border-2 shadow rounded-xl w-1/2">
        KEY TRAITS
        <div className="m-2 text-md text-slate-400">{traits}</div>
      </div>
    </div>
  );
}
