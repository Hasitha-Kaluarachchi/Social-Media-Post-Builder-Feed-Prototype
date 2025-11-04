import React, { useState, useEffect } from "react";
import "./App.css";
import PostForm from "./components/PostForm";
import PostWall from "./components/PostWall";

function App() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("create"); // "create" or "wall"

  // Fetch posts from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => response.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          text: item.title,
          image: "",
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 20),
          timestamp: new Date().toLocaleString(),
        }));
        setPosts(formatted);
      });
  }, []);

  // Add new post
  const addPost = (newPost) => {
    const postWithMeta = {
      ...newPost,
      likes: 0,
      comments: 0,
      timestamp: new Date().toLocaleString(),
    };
    setPosts([postWithMeta, ...posts]);
    setView("wall"); // Switch to wall after posting
  };

  return (
    <div className="app-container">
      <div className="app-box">
        <header className="app-header">
          <h1>🏠 Wall Page</h1>
          <nav>
            <button
              className={view === "create" ? "active" : ""}
              onClick={() => setView("create")}
            >
              Create Post
            </button>
            <button
              className={view === "wall" ? "active" : ""}
              onClick={() => setView("wall")}
            >
              View Wall
            </button>
          </nav>
        </header>

        <div className="content">
          {view === "create" ? (
            <PostForm onAddPost={addPost} />
          ) : (
            <PostWall posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
