import { useInfiniteQuery } from "react-query";
import { useState } from "react";
import { useVoteMutation } from "@/hooks/useVoteMutation";

const POSTS_PER_PAGE = 10;
const REFETCH_BUFFER = 3; // Number of posts left before we fetch more

const fetchFeed = async ({ pageParam = 0 }) => {
  const posts = await fetch(
    `/api/posts?cursor=${pageParam}?limit=${POSTS_PER_PAGE}`,
  );
  return posts.json();
};

export const useFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed,
    getNextPageParam: (lastPage, pages) => lastPage[lastPage.length - 1].id,
  });

  const voteMutation = useVoteMutation();

  /*
   * Called when the user swipes left or right
   * @param direction -1 for left, 1 for right
   */
  const performSwipe = (direction: -1 | 1) => {
    if (!data) return;

    const newIndex = currentIndex + direction;
    const numPostsRemaining =
      data.pages[data.pages.length - 1].length -
      (currentIndex % POSTS_PER_PAGE);

    // Check if the new index is out of bounds
    if (newIndex < 0 || numPostsRemaining <= 0) return;
    // Check if we need to fetch more posts
    if (numPostsRemaining < REFETCH_BUFFER) {
      fetchNextPage();
    }

    // Save the vote
    voteMutation.mutate({
      postId: currentPost.id,
      direction,
    });

    setCurrentIndex(newIndex);
  };

  const currentPost =
    data?.pages[Math.floor(currentIndex / POSTS_PER_PAGE)][
      currentIndex % POSTS_PER_PAGE
    ];
  const nextPost =
    data?.pages[Math.floor(currentIndex / POSTS_PER_PAGE)][
      (currentIndex % POSTS_PER_PAGE) + 1
    ];
  const previousPost =
    data?.pages[Math.floor(currentIndex / POSTS_PER_PAGE)][
      (currentIndex % POSTS_PER_PAGE) - 1
    ];

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
