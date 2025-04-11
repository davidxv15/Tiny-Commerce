document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Simple hardcoded credentials
    const validUser = {
      username: 'admin',
      password: 'password123'
    };
  
    if (username === validUser.username && password === validUser.password) {
      // Save fake login info to localStorage
      localStorage.setItem('user', JSON.stringify({ username, isAdmin: true }));
  
      // Redirect to home
      window.location.href = 'index.html';
    } else {
      document.getElementById('login-msg').textContent = 'Invalid login.';
    }
  });
  