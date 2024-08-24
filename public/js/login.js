
  // signup
  const nameInputEl = document.getElementById('name-signup');
  const emailInputEl = document.getElementById('email-signup');
  const passwordInputEl = document.getElementById('password-signup');
  // login
  const passwordLoginEl = document.getElementById('password-login');  
  const loginEmailInputEl = document.getElementById('email-login');
console.log('login page 2')

const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('login page 3')
  const email = loginEmailInputEl.value.toLowerCase().trim();
  const password = passwordLoginEl.value.trim();
  console.log('email: ', email)
  console.log('password: ', password)
  
if (email && password) {
console.log('login page 4')
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('response: ', response)
    if (response.ok) {
      console.log('login page 5')
      window.location.href = "/"; // Redirect to the homepage route
    } else {
      console.log('login page 6')
      alert("Incorrect email or password, please try again");
    }
  }
  else{
    console.log('error right here! login 6')
  }
};

// signup

const signupFormHandler = async (event) => {
  console.log('login page 15')
  event.preventDefault();
  // receiving 
  const name = nameInputEl.value.trim();
  const email = emailInputEl.value.toLowerCase().trim();
  const password = passwordInputEl.value.trim();
  

  if (name && email && password) {
    console.log('login page 16')
    console.log('name: ', name, 'email: ', email, 'password: ', password);
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('response is okay! 1')
      window.location.href = "/login"; 
    } else {
      console.log('resonse is not okay 2')
      alert(response.statusText);
    }
  }
};

document.getElementById("login-form").addEventListener("submit", loginFormHandler);

document.getElementById("signup-form").addEventListener("submit", signupFormHandler);