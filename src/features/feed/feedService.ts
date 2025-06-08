import { api } from "@/lib/axios";

export interface PostDto {
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  score: number;
  timeAgo: string;
  userVote: number;
  isFollowing: boolean;
}

export interface VoteDto {
  postId: string;
  value: number;
}

export const fetchPostFeed = async (): Promise<PostDto[]> => {
  const res = await api.get("/PostFeed");
  return res.data;
};

export const votePost = async (vote: VoteDto) => {
  await api.post(`/Vote`, vote);
};

export const createPost = async (content: string) => {
  await api.post("/Post/create", { content });
};

export const followUser = async (targetUserId: string) => {
  await api.post("/UserFollow/follow", { targetUserId: targetUserId });
};

export const unfollowUser = async (targetUserId: string) => {
  await api.post("/UserFollow/unfollow", { targetUserId: targetUserId });
};
