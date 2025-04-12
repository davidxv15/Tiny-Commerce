const user = JSON.parse(localStorage.getItem('user'));
const msg = document.getElementById('admin-msg');
const content = document.getElementById('admin-content');

if (!user || !user.isAdmin) {
  msg.textContent = '⛔ Access denied. You must be an admin to view this page.';
  content.style.display = 'none';
} else {
  content.style.display = 'block';
}

// Logout logic
document.getElementById('logout-link').addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});
