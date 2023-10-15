import { UserData } from "@/types/UserData";
import { useQuery } from "react-query";

const fetchData = async (email: string) => {
  const data = await fetch(`/api/author/${email}`);
  return data.json();
};

export const useUserData = ({
  email,
  isEnabled,
}: {
  email: string | null | undefined;
  isEnabled: boolean;
}) => {
  return useQuery<UserData, Error>(
    ["userData", email],
    () => fetchData(email!),
    {
      enabled: isEnabled && !!email,
    },
  );
};
