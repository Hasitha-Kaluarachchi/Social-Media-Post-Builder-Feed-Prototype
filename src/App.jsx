import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostWall from "./components/PostWall";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showWall, setShowWall] = useState(false);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowWall(true);
  };

  const handleGoBack = () => setShowWall(false);

  return (
    <div className="app">
      <header className="header">
        <h1>🏠 Wall Page</h1>
        <nav>
          <button onClick={() => setShowWall(false)}>Create Post</button>
          <button onClick={() => setShowWall(true)}>View Wall</button>
        </nav>
      </header>

      <main className="main">
        {!showWall ? (
          <PostForm onAddPost={handleAddPost} />
        ) : (
          <PostWall posts={posts} onGoBack={handleGoBack} />
        )}
      </main>
    </div>
  );
};

export default App;
