fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const list = document.getElementById('product-list');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="card-content">
          <img src="${product.image}" alt="${product.name}" />
          <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <p>${product.description}</p>
          <p id="product-price" class="price">$${product.price.toFixed(2)}</p>

          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      list.appendChild(card);
    });

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
  })
  .catch(err => console.error('Failed to load products:', err));
