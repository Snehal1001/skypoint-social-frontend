import { api } from "@/lib/axios";

export interface PostDto {
  postId: string;
  content: string;
  authorName: string;
  score: number;
  timeAgo: string;
  userVote: number;
}

export interface VoteDto {
    postId: string;
    value: number;
}

export const fetchFeed = async (): Promise<PostDto[]> => {
  const res = await api.get("/post");
  return res.data;
};

export const votePost = async (vote: VoteDto) => {
  await api.post(`/vote`, vote);
};
