import React, { useState } from "react";

function PostForm({ onAddPost }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [urlInput, setUrlInput] = useState("");

  // 🟢 local image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImage(reader.result);
      setUrlInput("");
    };
    reader.readAsDataURL(file);
  };

  // 🟢 Handle image URL input (accept any URL)
  const handleUseUrl = () => {
    let rawUrl = urlInput.trim();
    if (!rawUrl) {
      alert("Please enter an image URL first.");
      return;
    }

    // Automatically add https:// if missing
    if (!/^https?:\/\//i.test(rawUrl)) {
      rawUrl = "https://" + rawUrl;
    }

    // Always accept and show preview (fallback if blocked)
    setPreview(rawUrl);
    setImage(rawUrl);
  };

  // 🟢 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Post text cannot be empty!");
      return;
    }

    onAddPost({ text, image });
    setText("");
    setImage("");
    setPreview("");
    setUrlInput("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create a Post 🗓️</h2>

      {/* Text input */}
      <textarea
        placeholder="What's on your mind today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      {/* URL input + Use URL button */}
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <input
          type="text"
          placeholder="Paste any image URL (optional)"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{
            flex: 1,
            padding: "0.6rem",
            borderRadius: 8,
            border: "1px solid var(--border)",
          }}
        />
        <button
          type="button"
          onClick={handleUseUrl}
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "0.6rem 0.9rem",
            cursor: "pointer",
          }}
        >
          Use URL
        </button>
      </div>

      {/* Local file upload */}
      <label className="file-label" style={{ width: "100%" }}>
        📸 Choose Image
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>

      {/* Preview or fallback placeholder */}
      <div className="image-preview">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/400x250?text=Preview+Unavailable";
            }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/400x250?text=No+Image+Selected"
            alt="No Preview"
          />
        )}
      </div>

      {/* Post button */}
      <div className="form-buttons">
        <button type="submit" className="post-btn">
          Post ✍️
        </button>
      </div>
    </form>
  );
}

export default PostForm;
