import React from "react";
import SocialPost from "./SocialPost";

const PostWall = ({ posts }) => {
  return (
    <div className="post-wall">
      {posts.length === 0 ? (
        <p className="no-posts">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id || Date.now()} className="post-wrapper">
            <SocialPost post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default PostWall;