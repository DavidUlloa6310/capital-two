import RegisterForm from "@/components/Form/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

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
        <h2 className=" max-w-[800px] place-self-center justify-self-center text-center text-4xl text-capital_blue">
          It&rsquo;s hard to solve personal finance, when no one is willing to
          talk about it...
        </h2>
        <Link href="/api/auth/signin">
          <button className="my-4 rounded-md bg-capital_red px-4 py-2 text-white transition-all hover:scale-125">
            Join Anonmyously
          </button>
        </Link>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/swipe",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
