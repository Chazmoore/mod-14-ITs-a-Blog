const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username, 
            password,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/signup');
    } else {
        alert('Something wrong!');
    }
};

const signup = document.querySelector('signup-form')
signup.addEventListener('submit', signupFormHandler);

