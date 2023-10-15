import { useInfiniteQuery } from "react-query";
import { useState } from "react";
import { useVoteMutation } from "@/hooks/useVoteMutation";
import type { PostWithRelations } from "@/types/PostWithRelations";

const POSTS_PER_PAGE = 10;
const REFETCH_BUFFER = 3; // Number of posts left before we fetch more

const fetchFeed = async ({ pageParam = 0 }) => {
  const posts = await fetch(
    `/api/posts?cursor=${pageParam}?limit=${POSTS_PER_PAGE}`,
  );
  return posts.json();
};

export const useFeed = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<PostWithRelations[], Error>({
    queryKey: ["feed"],
    queryFn: fetchFeed,
    getNextPageParam: (lastPage, pages) => {
      console.log("lastPage", lastPage, "pages", pages);
      return lastPage ? lastPage[lastPage.length - 1]?.id : null;
    },
  });

  const voteMutation = useVoteMutation();

  // Determine the current, next, and previous posts based on the current index
  const currentPost =
    data?.pages[Math.floor(currentIndex / POSTS_PER_PAGE)]?.[
      currentIndex % POSTS_PER_PAGE
    ];
  const nextPost =
    data?.pages[Math.floor(currentIndex / POSTS_PER_PAGE)]?.[
      (currentIndex % POSTS_PER_PAGE) + 1
    ];
  const previousPost =
    data?.pages[Math.floor(currentIndex / POSTS_PER_PAGE)]?.[
      (currentIndex % POSTS_PER_PAGE) - 1
    ];

  /*
   * Called when the user swipes left or right
   * @param direction -1 for left, 1 for right
   */
  const performSwipe = (direction: -1 | 1) => {
    if (!data || !data.pages) return;

    // Save the vote
    voteMutation.mutate({
      postId: currentPost!.id,
      direction,
    });

    const newIndex = currentIndex + 1;
    const numPostsRemaining =
      data.pages.reduce((total, page) => total + page.length, 0) - newIndex;

    // Check if the new index is out of bounds
    if (newIndex < 0 || numPostsRemaining <= 0) return;
    // Check if we need to fetch more posts
    if (numPostsRemaining < REFETCH_BUFFER) {
      fetchNextPage();
    }

    setCurrentIndex(newIndex);
  };

  return {
    performSwipe,
    currentPost,
    nextPost,
    previousPost,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
  };
};
