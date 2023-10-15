import React from "react";
import Link from "next/link";

function SigninWarning() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center">
      <h2 className="text-capital_blue textl-4xl">
        Make sure to login to view other's posts.
      </h2>
      <Link href="/api/auth/signin">
        <button className=" border-capital-blue border-2">Log In</button>
      </Link>
    </main>
  );
}

export default SigninWarning;
