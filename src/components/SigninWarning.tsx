import React from "react";
import Link from "next/link";

function SigninWarning() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl text-capital_blue">
        You need to be logged in to view this page
      </h2>
      <Link href="/api/auth/signin">
        <button className=" min-w-[150px] rounded-md border-2 border-capital_red px-4 py-2 text-capital_red">
          Log In
        </button>
      </Link>
    </main>
  );
}

export default SigninWarning;
