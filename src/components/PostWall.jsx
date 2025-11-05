import React from "react";
import SocialPost from "./SocialPost";

const PostWall = ({ posts, onGoBack }) => {
  return (
    <div className="post-wall">
      {posts.length > 0 ? (
        posts.map((post) => <SocialPost key={post.id} post={post} />)
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default PostWall;
