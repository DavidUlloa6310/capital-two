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

export default function Profile() {
  const [userData, setUserData] = useState<User>();
  const [postData, setPostData] = useState<Post>();
  const session = useSession();

  useEffect(() => {
    async function getData() {
      const userResponse = await fetch(
        `/api/author/${session?.data?.user?.email}`,
      );
      if (!userResponse.ok) {
        throw new Error("Could not fetch user's data");
      }
      const userJSON: User = await userResponse.json();
      setUserData(userJSON);

      const postResponse = await fetch(`/api/posts/${userData?.email}`);
      if (!postResponse.ok) {
        throw new Error("Could not fetch user's data");
      }
      const postJSON = await postResponse.json();
      setPostData(postJSON);
      console.log(postData);
    }
    void getData();
  }, [session]);

  if (session == null) {
    return <SigninWarning />;
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <div className="mb-12 mt-12 flex w-full flex-row justify-evenly">
          <CreatePost />
          <UserProfile />
        </div>
        <PostDetails
          post={{
            content:
              "“Just invested 80% of my paycheck into a local artisanal avocado toast subscription service 🥑🍞, because who needs a savings account when you've got gourmet breakfast for days? 🤷🏻‍♂️ Now seeking advice on how to explain to my landlord that avocados are the new gold 🥇🏠. #SanFrancisco #MillennialProblems #SendHelpAndRentMoney”",
            createdAt: "11/24/23",
          }}
          averageAge="50"
          averageIncome="20"
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  return {
    props: {
      s: session,
    },
  };
};
