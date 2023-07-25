const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const usernameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");
  
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Something wrong!');
    }
  };
  
  // Correct the event listener assignment
  const loginForm = document.querySelector('#loginForm');
  loginForm.addEventListener('submit', loginFormHandler);
  