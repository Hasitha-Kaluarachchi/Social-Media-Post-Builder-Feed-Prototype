import React, { useState } from "react";

const SocialPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="social-post">
      <div className="post-header">
        <img
        src="https://img.icons8.com/fluent/1200/user-male-circle.jpg"
        alt="User Avatar"
        className="avatar"
        />

        <div className="user-details">
          <strong>Anonymous User</strong>
          <br></br>
          <small>{post.time}</small>
        </div>
      </div>

      <p className="post-text">{post.text}</p>

      {post.image && (
        <img src={post.image} alt="post" className="post-image" />
      )}

      

      <div className="post-actions">
        <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
        <button>💬 {comments.length}</button>
      </div>

      <div className="comment-section">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>➤</button>
      </div>

      {comments.length > 0 && (
        <ul className="comment-list">
          {comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SocialPost;
