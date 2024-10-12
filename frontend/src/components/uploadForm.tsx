"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    if (!file) {
      alert("Please submit a file for your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload error.");
    }
  };

  return (
    <div className="justify-start flex flex-col w-full p-3 rounded-xl border shadow h-full">
      <div className="font-bold mx-5 my-2">Upload your resume here!</div>
      <div className="m-2 mx-5 border rounded-xl p-2 justify-center align-center flex">
        <div className="text-teal-300 text-xs flex-col flex">
          <form className="flex flex-col">
            <input
              className={`${file ? "text-slate-500" : "text-red-500"}`}
              type="file"
              onChange={handleFileChange}
            />
            <button type="submit">
              <div className="border m-5 p-1 rounded-xl bg-teal-400 text-slate-50">
                Upload
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
