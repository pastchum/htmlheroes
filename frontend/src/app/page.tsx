import Image from "next/image";

export default function Home() {
  return (
    <div className="justify-stretch min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <div className="flex-row pb-5 items-start justify-start">
          <div className="font-mono">
            <h1 className="text-4xl">ResuRect</h1>
            Rectify Your Resume
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>test</div>
      </main>
      <footer className="absolute bottom-0 max-h-50 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>By HTML Heroes</div>
      </footer>
    </div>
  );
}
