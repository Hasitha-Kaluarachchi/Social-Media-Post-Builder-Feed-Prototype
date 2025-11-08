import React, { useState } from "react"; // Import React and the useState hook for managing component state
import PostForm from "./components/PostForm"; // Import child components for creating posts and viewing the wall
import PostWall from "./components/PostWall";

import "./App.css"; // Import the main stylesheet for styling

const App = () => {
  const [posts, setPosts] = useState([]); // State to hold all posts (array of post objects)
  const [showWall, setShowWall] = useState(false); // State to control whether the wall or post form is displayed

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Use functional update to avoid stale state issues
    setShowWall(true); // Switch to wall view after adding post
  };

  const handleGoBack = () => {
    setShowWall(false);
  };

  return (
    <div className="app">
      {/* Header section containing navigation buttons */}
      <header className="header">
        <nav className="nav-buttons">
          {/* Button to open post creation form */}
          <button onClick={() => setShowWall(false)}>Create Post</button>
          {/* Button to open post wall (feed) */}
          <button onClick={() => setShowWall(true)}>View Wall</button>
        </nav>
      </header>

      {/* Main section that conditionally renders either PostForm or PostWall */}
      <main className="main">
        {showWall ? (
          <PostWall posts={posts} onGoBack={handleGoBack} /> // Display post wall if showWall is true
        ) : (
          <PostForm onAddPost={handleAddPost} /> // Otherwise display post creation form
        )}
      </main>
    </div>
  );
};

export default App;
