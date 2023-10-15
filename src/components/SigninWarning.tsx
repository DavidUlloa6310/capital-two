import React from "react";
import Link from "next/link";

function SigninWarning() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center">
      <h2 className="textl-4xl text-capital_blue">
        You need to be logged in to view this page
      </h2>
      <Link href="/api/auth/signin">
        <button className=" border-capital-blue border-2">Log In</button>
      </Link>
    </main>
  );
}

export default SigninWarning;
