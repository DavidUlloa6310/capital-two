import { useState, useEffect } from "react";
import { UserData } from "@/types/UserData";
import Image from "next/image";
import crypto from "crypto";

const UserProfile = ({ user }: { user: UserData }) => {
  const [profilePicture, setProfilePicture] = useState<string>();

  useEffect(() => {
    async function getProfilePicture() {
      const uniqueId = crypto
        .createHash("sha256")
        .update(user.profile.email)
        .digest("hex");
      const response = await fetch(
        `https://api.multiavatar.com/${uniqueId}.png`,
      );
      if (!response.ok) {
        throw new Error("Was not able to create profile picture!");
      }

      const image = await response.blob();
      const imageUrl = URL.createObjectURL(image);
      setProfilePicture(imageUrl);
    }
    void getProfilePicture();
  }, []);

  return (
    <div className="h-[38%] w-[42%] rounded-lg border-2 border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between gap-10 space-x-4">
        <div>
          <h2 className="mb-6 text-3xl font-bold">{user.profile.name}</h2>
          <div className="text-left text-xl">
            <p className="text-gray-600">Age: {user.profile.age}</p>
            <p className="text-gray-600">Location: {user.profile.location}</p>
            <p className="text-gray-600">
              Income: ${user?.profile?.income?.toLocaleString()}
            </p>
          </div>
        </div>
        <Image
          width={200}
          height={200}
          src={profilePicture as string}
          alt={`${user.profile.name}`}
          className="mx-auto h-[45%] w-[45%] rounded-full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
