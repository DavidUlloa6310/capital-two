import type { Post, User, Comment } from "@prisma/client";

export interface PostWithRelations extends Post {
  author: User;
  comments: Comment[];
}
