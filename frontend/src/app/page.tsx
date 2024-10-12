import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Instructions from "@/components/instructions";

export default function Home() {
  return (
    <div className="justify-stretch min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-stretch sm:items-start">
        <div className="flex flex-row justify-between p-5 w-full">
          <Instructions />
          <div> Upload goes here</div>
        </div>
      </main>
    </div>
  );
}
