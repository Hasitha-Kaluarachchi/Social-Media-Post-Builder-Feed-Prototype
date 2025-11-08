import React, { useState, useEffect } from "react";
import { updatePost } from "../api/api";

const SocialPost = ({ post, onUpdate }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showAll, setShowAll] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const id = Math.floor(Math.random() * 70) + 1;
    setAvatar(`https://i.pravatar.cc/150?img=${id}`);
  }, []);

  const handleLike = async () => {
    const updated = { ...post, likes: likes + 1 };
    setLikes(likes + 1);
    const res = await updatePost(post.id, updated);
    if (res) onUpdate(res);
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    const newComments = [comment, ...comments];
    setComments(newComments);
    setComment("");
    const updated = { ...post, comments: newComments };
    const res = await updatePost(post.id, updated);
    if (res) onUpdate(res);
  };

  const visibleComments = showAll ? comments : comments.slice(0, 3);

  return (
    <div className="social-post">
      <div className="post-header">
        <div className="avatar">
          <img src={avatar} alt="avatar" style={{ width: "100%", borderRadius: "50%" }} />
        </div>
        <div className="user-details">
          <strong>Anonymous User</strong><br />
          <small>{post.time}</small>
        </div>
      </div>

      <p className="post-text">{post.text}</p>
      {post.image && <img src={post.image} alt="post" className="post-image" />}

      <div className="post-actions">
        <button onClick={handleLike}>❤️ {likes}</button>
        <button onClick={() => setShowAll(!showAll)}>💬 {comments.length}</button>
      </div>

      <div className="comment-section">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleAddComment()}
        />
        <button onClick={handleAddComment}>➤</button>
      </div>

      {comments.length > 0 && (
        <ul className="comment-list">
          {visibleComments.map((c, i) => <li key={i}>{c}</li>)}
          {!showAll && comments.length > 3 && (
            <li className="more-comments" onClick={() => setShowAll(true)}>
              View all {comments.length} comments...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SocialPost;
