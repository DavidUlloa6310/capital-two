import React from "react";

interface UserInfoProp {
  title: string;
  author: string;
  income: number;
  location: string;
  age: string;
}

const UserInfo = ({ title, author, income, location, age }: UserInfoProp) => {
  // const title = "About the Poster";
  // const author = "GloriousPenguin#125";
  // const income = "$15,000";
  // const livingIn = "San Francisco, Califonia";
  // const age = "22";
  return (
    <>
      <h2 className="text-4xl">
        <span className="font-semibold">{title}</span>
        {"  "}
        <span>{author}</span>
      </h2>
      <div className="mt-7">
        <h3>Income: {income}</h3>
        <h3>Location: {location}</h3>
        <h3>Age: {age}</h3>
      </div>
    </>
  );
};

export default UserInfo;
