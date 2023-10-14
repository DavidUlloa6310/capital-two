import { useEffect, useState, ReactNode } from "react";
import { type User } from "@prisma/client";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiCake } from "react-icons/bi";
import { IconType } from "react-icons";
import { RxDividerVertical } from "react-icons/rx";

interface CommentProps {
  authorId: number;
  content: string;
}

function Metadata({ data, Icon }: { data: ReactNode; Icon: IconType }) {
  return (
    <span className="flex items-center justify-center">
      <Icon className="text-mainGray mr-1 w-6" />
      <p className="text-mainGray">{data}</p>
    </span>
  );
}

const Comment = ({ authorId, content }: CommentProps) => {
  const [authorInfo, setAuthorInfo] = useState<User>();

  useEffect(() => {
    (async function () {
      const request = await fetch(`/api/author/${authorId}`, {
        method: "GET",
      });

      const response = (await request.json()) as User;
      setAuthorInfo(response);
    })();
  }, []);

  return (
    <div className="text-light text-sm">
      <div className="text-lg">{content}</div>
      <div className="mt-4 flex items-center justify-start text-sm">
        <Metadata
          Icon={AiOutlineUser}
          data={`${authorInfo?.first_name} ${authorInfo?.last_name}`}
        />

        <RxDividerVertical className="text-mainGray mx-2 text-xl" />

        <Metadata
          data={authorInfo?.credit_score?.toLocaleString("en-US")}
          Icon={MdOutlineAttachMoney}
        />
        <RxDividerVertical className="text-mainGray mx-2 text-xl" />

        <Metadata data={`${authorInfo?.age} years old`} Icon={BiCake} />
      </div>
    </div>
  );
};

export default Comment;
