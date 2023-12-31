import { BiCake } from "react-icons/bi";
import { BsCash } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import Data from "@/components/Data";

interface UserInfoProp {
  title: string;
  author: string;
  income: number;
  location: string;
  age: number;
}

const UserInfo = ({ title, author, income, location, age }: UserInfoProp) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold first-letter:capitalize">
          {title}
        </h1>
      </div>
      <div className="mt-7 flex items-center justify-start gap-4">
        <Data
          Icon={BsCash}
          data={income}
          className="bg-green-500  bg-opacity-80"
        />
        <Data
          Icon={CiLocationOn}
          data={location}
          className="bg-orange-400  bg-opacity-80"
        />
        <Data Icon={BiCake} data={age} className="bg-blue-400  bg-opacity-80" />
      </div>
    </>
  );
};

export default UserInfo;
