let currentPage = 1;
const productsPerPage = 12;

function displayPage(products) {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  const list = document.getElementById('product-list');
  list.innerHTML = ""; // clear existing content

  paginatedProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="card-content">
        <img src="${product.image}" alt="${product.name}" />
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p id="product-description">${product.description}</p>
        <p id="product-price" class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">+</button>
      </div>
    `;
    list.appendChild(card);
  });

  // Add to cart functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('✅ Added to cart!');
    });
  });
}

function setupPagination(products) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(products.length / productsPerPage);

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '← Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(products);
      setupPagination(products);
    }
  });
  pagination.appendChild(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next →';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(products);
      setupPagination(products);
    }
  });
  pagination.appendChild(nextBtn);
}

fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    displayPage(products);  // initial render
    setupPagination(products);  // setup controls
  })
  .catch(err => console.error('Failed to load products:', err));

// highlight current page link
document.querySelectorAll('.nav a').forEach(link => {
  if (link.href.includes(location.pathname)) {
    link.classList.add('active');
  }
});
