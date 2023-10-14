import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="mx-7 flex w-full flex-row justify-between bg-[#ff374f] p-1">
      <Image src={"/logo.png"} width={60} height={60} alt="logo" />
      <div className="text-small flex flex-row items-center justify-center gap-5 text-white">
        <h3>See Posts</h3>
        <h3>My Reviews</h3>
      </div>
    </div>
  );
};

export default Navbar;
