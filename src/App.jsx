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

  return (
    <div className="app">
      <header className="header">
        <nav>
          <button onClick={() => setShowWall(false)}>Create Post</button>
          <button onClick={() => setShowWall(true)}>View Wall</button>
        </nav>
      </header>

      <main className="main">
        {!showWall ? (
          <PostForm onAddPost={handleAddPost} />
        ) : (
          <PostWall posts={posts} onGoBack={() => setShowWall(false)} />
        )}
      </main>
    </div>
  );
};

export default App;
