import Instructions from "@/components/instructions";
import UploadForm from "@/components/uploadForm";

export default function Home() {
  return (
    <div className="justify-stretch font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-stretch sm:items-start">
        <div className="flex sm:flex-row flex-col justify-stretch justify-items-start p-5 w-full">
          <Instructions />
          <UploadForm />
        </div>
      </main>
    </div>
  );
}
