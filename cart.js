fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.products-in-cart');

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    let total = 0;

    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      const productEl = document.createElement('div');
      productEl.className = 'cart-item';
      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width: 10rem; height: auto;" />
        <h3>${product.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <p><strong>Subtotal: $${itemTotal.toFixed(2)}</strong></p>
        <hr>
      `;
      cartContainer.appendChild(productEl);
    });

    img.addEventListener('click', () => {
      img.style.width = img.style.width === '6rem' ? '12rem' : '6rem';
    });
    

    // Add grand total at the end
    const totalEl = document.createElement('p');
    totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalEl);
  })
  .catch(err => {
    console.error('Error loading cart:', err);
  });
