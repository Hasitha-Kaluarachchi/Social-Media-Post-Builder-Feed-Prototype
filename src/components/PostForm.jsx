import React, { useState } from "react";
import { addPost } from "../api/api";

const PostForm = ({ onAddPost }) => {
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [localImage, setLocalImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLocalImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageURL && !localImage) return;

    const newPost = {
      text,
      image: localImage || imageURL,
      likes: 0,
      comments: [],
      time: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    const createdPost = await addPost(newPost);
    onAddPost(createdPost);

    setText("");
    setImageURL("");
    setLocalImage(null);
  };

  return (
    <div className="post-form">
      <h2>Create a Post 🧩</h2>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="image-inputs">
        <label className="file-btn">
          📁 Choose Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <input
          type="text"
          placeholder="Or paste image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>

      {(localImage || imageURL) && (
        <img
          src={localImage || imageURL}
          alt="preview"
          className="preview-image"
        />
      )}

      <button onClick={handleSubmit}>Post 💬</button>
    </div>
  );
};

export default PostForm;