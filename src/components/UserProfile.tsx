import { useState, useEffect, ReactNode, ChangeEvent } from "react";
import { UserData } from "@/types/UserData";
import { getUserNickname } from "@/util/nicknames";
import Image from "next/image";
import crypto from "crypto";
import { IconType } from "react-icons";
import { GiMoneyStack } from "react-icons/gi";
import { BiCake } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

interface UserDataProps {
  Icon: IconType;
  iconColor: HTMLElement["className"];
  name: ReactNode;
  value?: HTMLInputElement["value"] | null;
  onChange: (data: string) => void;
}

interface AuthorRouteType {
  profile: UserData;
  posts;
}

function UserData({ Icon, iconColor, name, value, onChange }: UserDataProps) {
  return (
    <div className="flex items-center justify-start">
      <Icon className={`mr-3 h-5 w-5 ${iconColor}`} />
      <h2 className="mr-1 text-lg font-semibold">{name}:</h2>
      <input
        className="bg-transparent text-base font-light focus:outline-none"
        type="text"
        onChange={(event) => onChange(event.target.value)}
        value={value || ""}
        placeholder="Not Specified"
      />
    </div>
  );
}

const UserProfile = ({ user }: { user: UserData }) => {
  const [profilePicture, setProfilePicture] = useState<string>();
  const [isModified, setModified] = useState(false);

  const [income, setIncome] = useState(
    user?.profile?.income?.toLocaleString("en-US"),
  );
  const [age, setAge] = useState(user.profile.age);
  const [location, setLocation] = useState(user.profile.location);

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

  async function saveUserData() {
    const request = await fetch(`/api/author/${user.profile.email}/`, {
      method: "POST",
      body: JSON.stringify({ income: parseInt(income ?? ""), age, location }),
    });

    const response: UserData = await request.json();

    setIncome(response.income);
    setAge(response.age);
    setLocation(response.location);

    setModified(false);
  }

  return (
    <div className="h-[21.5rem] w-[42%] rounded-lg border border-gray-200 bg-mainGray bg-opacity-5 p-6 transition-all hover:bg-opacity-10 hover:shadow">
      <div className="flex items-center justify-between gap-5">
        <div>
          <h2 className="mb-6 text-3xl font-bold">
            {getUserNickname(user.profile.name)}
          </h2>
          <div className="text-left text-xl">
            <UserData
              name="Income"
              value={income}
              iconColor="text-green-700"
              Icon={GiMoneyStack}
              onChange={(money) => {
                setModified(true);
                setIncome(money);
              }}
            />
            <UserData
              name="Age"
              value={age?.toString()}
              iconColor="text-blue-700"
              Icon={BiCake}
              onChange={(yearsOld) => {
                if (yearsOld !== "" && !parseInt(yearsOld)) return;

                setModified(true);
                setAge(+yearsOld);
              }}
            />
            <UserData
              name="Location"
              value={location}
              iconColor="text-orange-500"
              Icon={GoLocation}
              onChange={(addrress) => {
                setModified(true);
                setLocation(addrress);
              }}
            />
          </div>
        </div>
        {profilePicture && (
          <Image
            width={200}
            height={200}
            src={profilePicture}
            alt={getUserNickname(user.profile.name) ?? ""}
            className=" h-[45%] w-[45%] rounded-full border border-black transition-all hover:shadow-md"
          />
        )}
      </div>
      {isModified && (
        <button className="ml-5" type="button" onClick={saveUserData}>
          Save
        </button>
      )}
    </div>
  );
};

export default UserProfile;
