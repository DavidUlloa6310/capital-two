import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import CreatePost from "@/components/CreatePost";
import UserProfile from "@/components/UserProfile";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import SigninWarning from "@/components/SigninWarning";
import { authOptions } from "./api/auth/[...nextauth]";
import { type User } from "@prisma/client";
import { type Post } from "@prisma/client";
import { GetServerSideProps } from "next";
import PostDetails from "@/components/Profile/PostDetails";
import { PostWithRelations } from "@/types/PostWithRelations";
import { useUserData } from "@/hooks/useUserData";
import { UserData } from "@/types/UserData";
export default function Profile() {
  const session = useSession();

  const { data, isLoading, error } = useUserData({
    email: session?.data?.user?.email,
    isEnabled: true,
  });

  const dummyData = [
    {
      post: {
        content:
          "“Just invested 80% of my paycheck into a local artisanal avocado toast subscription service 🥑🍞, because who needs a savings account when you've got gourmet breakfast for days? 🤷🏻‍♂️ Now seeking advice on how to explain to my landlord that avocados are the new gold 🥇🏠. #SanFrancisco #MillennialProblems #SendHelpAndRentMoney”",
        createdAt: "11/22/63",
      },
      averageAge: "40",
      averageIncome: "10,000",
    },
  ];

  if (session == null || !session.data?.user?.email) {
    return <SigninWarning />;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <>
      <Navbar />
      <main className="flex h-[60%] w-full flex-col items-center justify-center">
        <div className="mb-12 mt-12 flex h-[100%] w-full flex-row justify-evenly">
          <CreatePost />
          <UserProfile user={data as UserData} />
        </div>
        <PostDetails posts={data?.posts as PostWithRelations[]} />
      </main>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getServerSession(req, res, authOptions);
//   console.log(session);
//   return {
//     props: {
//       s: session,
//     },
//   };
// };
