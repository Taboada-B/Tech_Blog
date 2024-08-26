console.log('at login.js')
  // signup
  const nameInputEl = document.getElementById('name-signup');
  const emailInputEl = document.getElementById('email-signup');
  const passwordInputEl = document.getElementById('password-signup');
  // login
  const passwordLoginEl = document.getElementById('password-login');  
  const loginEmailInputEl = document.getElementById('email-login');


const loginFormHandler = async (event) => {
  event.preventDefault();
  
  const email = loginEmailInputEl.value.toLowerCase().trim();
  const password = passwordLoginEl.value.trim();
  
  
if (email && password) {

    const response = await fetch('/api/user/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      // console.log('would normally redirect to homepage, debugging now ')
      window.location.href = "/"; // Redirect to the homepage route
    } else {
  
      alert("Incorrect email or password, please try again");
    }
  }
  else{
    console.log('error right here! ')
  }
};

// signup

const signupFormHandler = async (event) => {
  
  event.preventDefault();
  // receiving 
  const name = nameInputEl.value.trim();
  const email = emailInputEl.value.toLowerCase().trim();
  const password = passwordInputEl.value.trim();
  

  if (name && email && password) {
   
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('response is okay!')
      alert('You have successfully signed up! Now please log in')
      // window.location.href = "/login"; 
    } else {
      console.log('resonse is not okay')
      alert(response.statusText);
    }
  }
};

document.getElementById("login-form").addEventListener("submit", loginFormHandler);

document.getElementById("signup-form").addEventListener("submit", signupFormHandler);