import { PostWithRelations } from "./PostWithRelations";
import { User } from "@prisma/client";

export interface UserData {
  profile: User;
  posts: PostWithRelations[];
}
