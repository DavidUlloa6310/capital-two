import type { Post, User, Comment } from "@prisma/client";

export interface CommentWithAuthor extends Comment {
  author: User;
}

export interface PostWithRelations extends Post {
  author: User;
  comments: CommentWithAuthor[];
  upvotes: number;
  downvotes: number;
}
