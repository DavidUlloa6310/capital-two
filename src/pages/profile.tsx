import React, { useEffect } from "react";
import CreatePost from "@/components/CreatePost";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();

  useEffect(() => {
    function getUserData() {
      return -1;
    }
  }, []);

  if (session == null) {
    return;
  }

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
