import React from "react";

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
      <h2 className="">
        <span className="font-semibold">{title}</span>
        <span className="text-sm"> {author}</span>
      </h2>
      <div className="mt-7">
        <h3>
          <span className="italic">Income:</span> {income}
        </h3>
        <h3>
          <span className="italic">Location:</span> {location}
        </h3>
        <h3>
          <span className="italic">Age:</span> {age}
        </h3>
      </div>
    </>
  );
};

export default UserInfo;
