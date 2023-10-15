import {useQuery} from 'react-query';
import {PostWithRelations} from '@/types/PostWithRelations';

const fetchPosts = async (email: string) => {
  const posts = await fetch(`/api/posts/${email}`);
  return post.json();
};