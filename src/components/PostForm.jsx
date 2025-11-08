import React, { useState } from "react";

const PostForm = ({ onAddPost }) => { // PostForm component receives a callback (onAddPost) from the parent (App.js)
  const [text, setText] = useState("");  // State for the text content of the post
  const [imageURL, setImageURL] = useState("");  // State for an image URL entered by the user
  const [localImage, setLocalImage] = useState(null);  // State for a locally uploaded image (stored as base64)

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLocalImage(reader.result); // Save the image preview
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit

    // If there’s no text or image, do nothing
    if (!text.trim() && !imageURL && !localImage) return;

    // Create a new post object with necessary fields
    const newPost = {
      id: Date.now(), // Unique ID based on timestamp
      text, // Post text content
      image: imageURL || localImage, // Prefer URL image, else local image
      likes: 0, // Initialize with 0 likes
      comments: 0, // Initialize with 0 comments
      time: new Date().toLocaleString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }), // Store the current time
    };

    onAddPost(newPost); // Send the new post to parent component (App.js)
    setText("");  // Reset form fields after submission
    setImageURL("");
    setLocalImage(null);
  };

  return (
    <div className="post-form">
      <h2>Create a Post 🧩</h2>

      {/* Text area for post message */}
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Image input options*/}
      <div className="image-inputs">
        {/* Upload from computer */}
        <label className="file-btn">
          📁 Choose Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {/* Or paste a link to an image */}
        <input
          type="text"
          placeholder="Or paste image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>

      {/* Display image preview if user selected or pasted an image */}
      {localImage || imageURL ? (
        <img
          src={imageURL || localImage}
          alt="preview"
          className="preview-image"
        />
      ) : null}

      <button onClick={handleSubmit}>Post 💬</button> {/* Submit post button */}
    </div>
  );
};

export default PostForm;