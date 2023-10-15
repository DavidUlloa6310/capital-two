import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex w-full flex-row justify-between bg-[#ff374f] p-1 px-7">
      <Link href="/">
        <Image src={"/logo.png"} width={60} height={60} alt="logo" />
      </Link>
      <div className="text-small flex flex-row items-center justify-center gap-5 text-white">
        <Link href="/swipe">
          <h3>Feed</h3>
        </Link>
        <Link href="/profile">
          <h3>My Reviews</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
