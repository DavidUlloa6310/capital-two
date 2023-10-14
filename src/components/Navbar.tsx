import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-[#ff374f] p-1">
      <Image src={"/logo.png"} width={60} height={60} alt="logo" className="ml-7" />
    </div>
  );
};

export default Navbar;
