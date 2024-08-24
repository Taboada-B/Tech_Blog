
  // signup
  // const nameInputEl = document.getElementById('name-signup');
  // const emailInputEl = document.getElementById('email-signup');
  // const passwordInputEl = document.getElementById('password-signup');
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

document.getElementById("login-form").addEventListener("submit", loginFormHandler);

// document.getElementById("signup-form").addEventListener("submit", signupFormHandler);