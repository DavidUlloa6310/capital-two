import { UserData } from "@/types/UserData";
import { useQuery } from "react-query";

const fetchData = async (email: string) => {
  const data = await fetch(`/api/author/${email}`);
  return data.json();
};

export const useUserData = (email: string) => {
  return useQuery<UserData>(["userData", email], () => fetchData(email));
};
