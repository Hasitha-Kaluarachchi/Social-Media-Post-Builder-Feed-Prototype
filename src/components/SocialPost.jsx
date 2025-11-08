import React, { useState, useEffect } from "react";

const SocialPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 70) + 1;
    setAvatar(`https://i.pravatar.cc/150?img=${randomId}`);
  }, []);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([comment, ...comments]);
      setComment("");
      setShowAllComments(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddComment();
  };

  const toggleComments = () => setShowAllComments(!showAllComments);

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="social-post">
      <div className="post-header">
        <div className="avatar">
          <img src={avatar} alt="avatar" style={{ width: "100%", borderRadius: "50%" }} />
        </div>
        <div className="user-details">
          <strong>Anonymous User</strong>
          <br />
          <small>{post.time}</small>
        </div>
      </div>

      <p className="post-text">{post.text}</p>

      {post.image && <img src={post.image} alt="post" className="post-image" />}

      <div className="post-actions">
        <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
        <button onClick={toggleComments}>💬 {comments.length}</button>
      </div>

      <div className="comment-section">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAddComment}>➤</button>
      </div>

      {comments.length > 0 && (
        <ul className="comment-list">
          {visibleComments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
          {!showAllComments && comments.length > 3 && (
            <li className="more-comments" onClick={toggleComments}>
              View all {comments.length} comments...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SocialPost;

