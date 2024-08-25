console.log('at logout.js')
document.addEventListener('DOMContentLoaded', () => {
    
    const logout = async () => {
        console.log('clicked logout button')
        preventDefault();
      try {
        const response = await fetch('/api/user/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            console.log('session logout worked')
        //   document.location.replace('/login');
        }
      } catch (error) {
        console.log('didnt logout');
        alert(response.statusText);
        // document.location.replace('/login');
      }
    }
    document.getElementById('btnLogout')
    .addEventListener('click', logout);
  });