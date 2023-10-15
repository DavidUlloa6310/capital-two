import { getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";

interface AuthProps {
  session: Session | null;
}

export default function Auth(props: AuthProps) {
  console.log(props);
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  return {
    props: {
      s: session,
    },
  };
};
