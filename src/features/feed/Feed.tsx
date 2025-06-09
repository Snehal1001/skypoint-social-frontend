import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import {
  fetchPostFeed,
  followUser,
  unfollowUser,
  votePost,
  type PostDto,
} from "./feedService";
import { useAuthStore } from "../auth/authStore";

const Feed = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = useAuthStore((s) => s.currentUserId);

  const loadFeed = async () => {
    setLoading(true);
    try {
      const data = await fetchPostFeed();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (postId: string, value: number) => {
    posts;
    await votePost({ postId, value });
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.postId !== postId) return post;

        // Calculate updated votes
        let upVotes = post.upVotes;
        let downVotes = post.downVotes;

        // Remove previous vote
        if (post.userVote === 1) upVotes--;
        if (post.userVote === -1) downVotes--;

        // Apply new vote
        if (value === 1) upVotes++;
        if (value === -1) downVotes++;

        return {
          ...post,
          userVote: post.userVote === value ? 0 : value, // toggle vote
          upVotes,
          downVotes,
        };
      })
    );
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>

      <CreatePost onPostCreated={loadFeed} />

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <Card key={post.postId} className="mb-4">
            <CardContent className="space-y-2 p-4">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-500">
                <span className="text-xs text-gray-500">
                  Posted by{" "}
                  <span className="text-xl text-black font-medium">
                    {post.authorName}
                  </span>
                </span>
                {post.authorId !== currentUserId && (
                  <Button
                    variant="link"
                    className={`text-xs border rounded px-3 py-1 transition-colors duration-200 ${
                      post.isFollowing
                        ? "bg-white text-black border-gray-300 hover:bg-gray-100"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                    onClick={async () => {
                      try {
                        if (post.isFollowing) {
                          await unfollowUser(post.authorId);
                        } else {
                          await followUser(post.authorId);
                        }
                        loadFeed();
                      } catch (err) {
                        console.error("Failed to follow/unfollow", err);
                      }
                    }}
                  >
                    {post.isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>
              <p>{post.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  variant={post.userVote === 1 ? "default" : "outline"}
                  onClick={() => handleVote(post.postId, 1)}
                >
                  👍
                </Button>
                <span>{post.upVotes}</span>
                <Button
                  variant={post.userVote === -1 ? "default" : "outline"}
                  onClick={() => handleVote(post.postId, -1)}
                >
                  👎
                </Button>
                <span>{post.downVotes}</span>
                <div className="text-sm text-gray-500">{post.timeAgo}</div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Feed;
