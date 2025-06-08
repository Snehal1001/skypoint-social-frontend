import { useEffect, useState } from "react";
import { fetchFeed, votePost, type PostDto } from "./feedService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

const Feed = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    setLoading(true);
    try {
      const data = await fetchFeed();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (postId: string, value: number) => {
    await votePost({postId, value});
    await loadFeed(); // Reload feed to update score and buttons
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <Card key={post.postId} className="mb-4">
            <CardContent className="space-y-2 p-4">
              <p>{post.content}</p>
              <div className="text-sm text-gray-500">
                Posted by {post.authorName} •{" "}
                {formatDistanceToNow(new Date(post.timeAgo), {
                  addSuffix: true,
                })}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  variant={post.userVote === 1 ? "default" : "outline"}
                  onClick={() => handleVote(post.postId, 1)}
                >
                  👍
                </Button>
                <span>{post.score}</span>
                <Button
                  variant={post.userVote === -1 ? "default" : "outline"}
                  onClick={() => handleVote(post.postId, -1)}
                >
                  👎
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Feed;
