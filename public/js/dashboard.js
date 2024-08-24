document.getElementById('new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to the dashboard
      } else {
        alert('Failed to create post');
      }
    }
  });