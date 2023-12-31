import { useEffect, useState, ReactNode } from "react";
import { type User } from "@prisma/client";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiCake } from "react-icons/bi";
import { IconType } from "react-icons";
import { RxDividerVertical } from "react-icons/rx";
import { getUserNickname } from "@/util/nicknames";
import type { Comment } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface CommentProps extends Pick<User, "name" | "income" | "age"> {
  content: string;
  createdAt: Date;
}

function Metadata({ data, Icon }: { data: ReactNode; Icon: IconType }) {
  return (
    <span className="relative right-2 flex items-center justify-center">
      <Icon className="mr-1 w-6 text-mainGray" />
      <p className="-ml-2 text-mainGray">{data}</p>
    </span>
  );
}

const Comment = ({ name, income, age, content, createdAt }: CommentProps) => {
  const formattedDate = dayjs(createdAt).fromNow();

  return (
    <div className="text-light text-sm">
      <div className="text-lg">{content}</div>
      <div className="mt-4 flex items-center justify-start text-sm">
        <Metadata Icon={AiOutlineUser} data={getUserNickname(name)} />

        <RxDividerVertical className="mx-2 text-xl text-mainGray" />

        <Metadata
          data={income?.toLocaleString("en-US") ?? "Hidden"}
          Icon={MdOutlineAttachMoney}
        />
        <RxDividerVertical className="mx-2 text-xl text-mainGray" />

        <Metadata data={`${age ?? "Unknown"} years old`} Icon={BiCake} />

        {"   "}

        <h4 className="ml-4">{formattedDate}</h4>
      </div>
    </div>
  );
};

export default Comment;
