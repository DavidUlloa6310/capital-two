import React, { useEffect, useState } from "react";
import CreatePost from "@/components/CreatePost";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import SigninWarning from "@/components/SigninWarning";
import { type User } from "@prisma/client";

function Profile() {
  const { data: session } = useSession();
  // const [userData, setUserData] = useState<User>();
  // const [postData, setPostData] = useState<Post>();

  if (session == null) {
    return <SigninWarning />;
  }

  useEffect(() => {
    async function getData() {
      const userResponse = await fetch(`/api/auther/${session?.user.id}`);
      if (!userResponse.ok) {
        throw new Error("Could not fetch user's data");
      }
      const userJSON: User = await userResponse.json();
      console.log(userJSON);
    }
    void getData();
  }, []);

  return (
    <main>
      <Navbar />
      <div>
        <CreatePost />
      </div>
    </main>
  );
}

export default Profile;
