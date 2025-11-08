const API_BASE = "https://66bfa7c55225580055b28a3c.mockapi.io/api/posts";

export async function getPosts() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to load posts");
    return await res.json();
  } catch {
    return [];
  }
}

export async function addPost(post) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error("Failed to add post");
    return await res.json();
  } catch {
    return post;
  }
}

export async function updatePost(id, updatedData) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update post");
    return await res.json();
  } catch {
    return null;
  }
}
