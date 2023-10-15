import RegisterForm from "@/components/Form/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen justify-start overflow-hidden">
      <div className="relative flex w-[40vw] flex-col items-center justify-center pb-20 pl-5 pr-40 text-white">
        <div className="relative h-[300px] w-[300px]">
          <Image src="/images/logo.png" alt="" fill className="z-10 p-4" />
        </div>
        <h1 className="z-10 text-center font-lilita text-7xl">Capital Two</h1>
        <Image src="/images/swoosh.svg" alt="" layout="fill" />
      </div>
      <div className="m-5 flex h-full w-full flex-col items-center justify-center">
        <h2 className=" text-capital_blue max-w-[800px] place-self-center justify-self-center text-center text-4xl">
          It&rsquo;s hard to solve personal finance, when no one is willing to
          talk about it...
        </h2>
        <Link href="/api/auth/signin">
          <button className="bg-capital_red my-4 rounded-md px-4 py-2 text-white transition-all hover:scale-125">
            Join Anonmyously
          </button>
        </Link>
        {/* <RegisterForm className=" mx-10 w-[400px] self-center" /> */}
      </div>
    </main>
  );
}
