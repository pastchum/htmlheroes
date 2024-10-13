import Image from "next/image";
import github from "@/icons/github.png";

export default function Footer() {
  return (
    <footer className="p-5 ml-5 absolute fixed bottom-0 max-h-50 row-start-3 flex gap-6 flex-wrap bg-slate-300 shadow-lg items-center justify-center">
      <div>By HTML Heroes</div>
      <div>
        <a href="https://github.com/pastchum/htmlheroes" target="./blank">
          <Image
            src={github}
            width={20}
            height={20}
            rel="noopener noreferrer"
            alt="Github"
          />
        </a>
      </div>
    </footer>
  );
}
