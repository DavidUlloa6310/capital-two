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
  session: Session | null;
}

export default function Profile(props: ProfileProps) {
  console.log("props", props);
  const { session } = props;
  const [userData, setUserData] = useState<User>();
  const [postData, setPostData] = useState<Post>();

  useEffect(() => {
    if (session == null) {
      return;
    }
    async function getData() {
      if (session == null) {
        return;
      }
      const userResponse = await fetch(`/api/author/${session?.user.id}`);
      if (!userResponse.ok) {
        throw new Error("Could not fetch user's data");
      }
      const userJSON: User = await userResponse.json();
      setUserData(userJSON);

      const postResponse = await fetch(`/api/posts/${userData?.id}`);
      if (!postResponse.ok) {
        throw new Error("Could not fetch user's data");
      }
      const postJSON = await postResponse.json();
      setPostData(postJSON);

      console.log(userData);
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
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
      nothing: "something",
    },
  };
};
