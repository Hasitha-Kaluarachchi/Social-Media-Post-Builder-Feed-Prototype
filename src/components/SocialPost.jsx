import React, { useState } from "react";

function SocialPost({ text, image, likes = 0, comments = 0, timestamp }) {
  const [likeCount, setLikeCount] = useState(likes);
  const [commentList, setCommentList] = useState([]); // comments created locally 
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => setLikeCount((p) => p + 1);
  const toggleComments = () => setShowComments((s) => !s);
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentList((s) => [...s, newComment.trim()]);
    setNewComment("");
  };

  return (
    <div className="social-post">
      <div className="post-header">
        <img src="https://via.placeholder.com/48" alt="User" className="profile-pic" />
        <div className="post-meta">
          <span className="username">User Name</span>
          <span className="timestamp">{timestamp}</span>
        </div>
      </div>

      <div className="post-body">
        <p className="post-text">{text}</p>

        {/* Image container: object-fit: contain so image never crops */}
        {image ? (
          <div className="post-image-container">
            <img
              src={image}
              alt="Post"
              className="post-image"
              onError={(e) => {
                // fallback: hide broken images
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="post-actions">
        <button onClick={handleLike}>🔥 Like ({likeCount})</button>
        <button onClick={toggleComments}>💬 {showComments ? "Hide" : "Comments"} ({commentList.length})</button>
      </div>

      {showComments && (
        <div className="comment-section">
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>

          {commentList.length > 0 ? (
            <ul className="comment-list">
              {commentList.map((c, i) => (
                <li key={i} className="comment-item">
                  💬 {c}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-comments">No comments yet</p>
          )}
        </div>
      )}
    </div>
  );
}
// social post
export default SocialPost;
