import { BsCash } from "react-icons/bs";
import { IconType } from "react-icons";
import { ReactNode } from "react";

interface UserInfoProp {
  title: string;
  author: string;
  income: number;
  location: string;
  age: number;
}

interface DataProps {
  data: ReactNode;
  Icon: IconType;
  color: string;
}

function Data({ data, Icon, color }: DataProps) {
  return (
    <div
      className="items-cent flex justify-start gap-1"
      style={{ backgroundColor: color }}
    >
      <span>
        <Icon />
      </span>
      <h2 className="text-xl font-semibold first-letter:capitalize">{data}:</h2>
    </div>
  );
}

const UserInfo = ({ title, author, income, location, age }: UserInfoProp) => {
  return (
    <>
      <div>
        <h3 className="text-sm">{author}</h3>
        <h1 className="text-3xl font-semibold first-letter:capitalize">
          {title}
        </h1>
      </div>
      <div className="mt-7">
        <Data Icon={BsCash} data={income} color="red" />
        {/* {Object.entries(data).map(([key, value]) => (
          <div
            key={`${location}${age}${income}`}
            className="flex items-end justify-start gap-1"
          >
            <h2 className="text-xl font-semibold first-letter:capitalize">
              {key}:
            </h2>
            <h4 className="mb-[2px] text-sm font-light">{value}</h4>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default UserInfo;
