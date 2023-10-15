import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";

function Profile() {
  useEffect(() => {
    function getUserData() {
      return -1;
    }
  }, []);

  return (
    <main>
      <Navbar />
      <div></div>
    </main>
  );
}

export default Profile;
