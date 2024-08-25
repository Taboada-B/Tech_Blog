console.log('at logout.js')
document.addEventListener('DOMContentLoaded', () => {

  const logout = async (event) => {
    console.log('clicked logout button')
    event.preventDefault();
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('session logout worked')
        document.location.replace('/login');
      }
    } catch (error) {
      console.log('didnt logout');
      alert(response.statusText);
      document.location.replace('/');
    }
  }
  document.getElementById('btnLogout')
    .addEventListener('click', logout);
});