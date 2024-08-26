console.log('at dashboard.js')

const addPost = async (event) => {
    
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Post created successfully!');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document.getElementById('new-post-form').addEventListener('submit', addPost);