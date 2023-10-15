import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import CreatePost from "@/components/CreatePost";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import SigninWarning from "@/components/SigninWarning";
import { authOptions } from "./api/auth/[...nextauth]";
import { type User } from "@prisma/client";
import { type Post } from "@prisma/client";
import { GetServerSideProps } from "next";

interface ProfileProps {
  s: Session | null;
}

export default function Profile({ s: session }: ProfileProps) {
  const [userData, setUserData] = useState<User>();
  const [postData, setPostData] = useState<Post>();

  useEffect(() => {
    async function getData() {
      const userResponse = await fetch(`/api/author/${session?.user?.email}`);
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
    <main>
      <Navbar />
      <div className="flex flex-row">
        <CreatePost />
        <div>
          <h2>Your Posts</h2>
        </div>
      </div>
    </main>
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
