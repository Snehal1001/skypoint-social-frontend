import { useState } from "react";
import { createPost } from "./feedService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: Props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPost(content.trim());
      setContent("");
      onPostCreated(); // refresh the feed
    } catch (err) {
      console.error("Error creating post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
      />
      <div className="mt-2 text-right">
        <Button onClick={handleSubmit} disabled={loading || !content.trim()}>
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
