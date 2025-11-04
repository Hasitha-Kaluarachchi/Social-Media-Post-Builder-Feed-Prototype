import React from "react";
import SocialPost from "./SocialPost";

function PostWall({ posts }) {
  return (
    <div className="post-wall">
      <h2>📰 Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Create one!</p>
      ) : (
        posts.map((post, index) => (
          <SocialPost
            key={index}
            text={post.text}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            timestamp={post.timestamp}
          />
        ))
      )}
    </div>
  );
}

export default PostWall;
