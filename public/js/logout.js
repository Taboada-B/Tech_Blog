// document.addEventListener('DOMContentLoaded', () => {
//     const logout = async () => {
//       try {
//         const response = await fetch('/api/user/logout', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//         });
  
//         if (response.ok) {
//           document.location.replace('/login');
//         }
//       } catch (error) {
//         alert(response.statusText);
//         document.location.replace('/login');
//       }
//     }
//     document.getElementById('btnLogout')
//     .addEventListener('click', logout);
//   });
  