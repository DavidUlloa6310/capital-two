import React from "react";

export interface MessageProps {
  message: string;
  username: string;
  salary: number;
  age: number;
  key?: number;
}
function Message({ message, username, salary, age, key }: MessageProps) {
  return (
    <div
      className=" font-roboto border-2 border-gray-400 p-2 text-black"
      key={key}
    >
      <p>&ldquo;{message}&rdquo;</p>
      <p className="italic">
        {username} | ${salary} | {age}
      </p>
    </div>
  );
}

function MessageBox({ messages }: { messages: MessageProps[] }) {
  return (
    <div className="font-roboto border-2 border-gray-400 p-1">
      {messages.map((data, index) => (
        <Message key={index} {...data} />
      ))}
      <label className=" font-robot my-5 text-gray-300">
        <input type="text" className=" border-2 border-gray-400" />
        Share your advice...
      </label>
    </div>
  );
}

export default MessageBox;
