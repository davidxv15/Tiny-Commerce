const user = JSON.parse(localStorage.getItem('user'));
const msg = document.getElementById('admin-msg');
const content = document.getElementById('admin-content');
const productList = document.getElementById('product-list');

if (!user || !user.isAdmin) {
  msg.textContent = '⛔ Access denied. You must be an admin to view this page.';
  content.style.display = 'none';
} else {
  content.style.display = 'block';
  renderProducts();
}

document.getElementById('logout-link').addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});

document.getElementById('product-form').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('product-name').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);
  const description = document.getElementById('product-description').value.trim();
  const image = document.getElementById('product-image').value.trim();

  if (!name || !price || !description || !image) {
    alert('All fields are required.');
    return;
  }

  const newProduct = {
    id: Date.now(), // simple unique ID
    name,
    price,
    description,
    image,
    inStock: true,
    rating: 4.5 // fake default
  };

  const products = JSON.parse(localStorage.getItem('productDB')) || [];
  products.push(newProduct);
  localStorage.setItem('productDB', JSON.stringify(products));

  alert(' Product added!');
  e.target.reset();
  renderProducts();
});

function renderProducts() {
  const products = JSON.parse(localStorage.getItem('productDB')) || [];
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = '<p>No products yet.</p>';
    return;
  }

  products.forEach(p => {
    const item = document.createElement('div');
    item.className = 'admin-product';
    item.innerHTML = `
      <strong>${p.name}</strong><br>
      $${p.price.toFixed(2)}<br>
      <em>${p.description}</em><br>
      <img src="${p.image}" alt="${p.name}" style="width: 80px;"><hr>
    `;
    productList.appendChild(item);
  });
}
