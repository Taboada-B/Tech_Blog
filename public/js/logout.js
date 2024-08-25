console.log('at logout.js')
document.addEventListener('DOMContentLoaded', () => {

  const logout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        
        document.location.replace('/login');
      }
    } catch (error) {
      
      alert(response.statusText);
      document.location.replace('/');
    }
  }
  document.getElementById('btnLogout')
    .addEventListener('click', logout);
});