import Instructions from "@/components/instructions";
import Upload from "@/components/upload";

export default function Home() {
  return (
    <div className="justify-stretch min-h-screen p-5 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-stretch sm:items-start">
        <div className="flex sm:flex-row flex-col justify-between justify-items-start p-5 w-full">
          <Instructions />
          <Upload />
        </div>
      </main>
    </div>
  );
}
