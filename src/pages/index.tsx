import { MessageProps } from "@/components/MessageBox";
import MessageBox from "@/components/MessageBox";
import Head from "next/head";
import Link from "next/link";

const message: MessageProps = {
  message: "Woah woah woah, this is a message from Victor! LMAOO #CapitalTwo",
  username: "GloriousPenguin#120",
  salary: 45000,
  age: 25,
};

export default function Home() {
  return (
    <>
      <h1>Capital Two</h1>
      <div>Some content here</div>
      <MessageBox messages={[message]} />
    </>
  );
}
