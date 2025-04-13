fetch("./data/products.json")
  .then((res) => res.json())
  .then((products) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".products-in-cart");

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
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
    
      // Image
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      img.style.width = '6rem';
    
      // Title
      const title = document.createElement('h3');
      title.textContent = product.name;
    
      // Price
      const price = document.createElement('p');
      price.textContent = `Price: $${product.price.toFixed(2)}`;
    
      // Quantity controls
      const quantityControls = document.createElement('div');
      quantityControls.innerHTML = `
        <button class="qty-btn" data-action="decrease">−</button>
        <span class="qty">${item.quantity}</span>
        <button class="qty-btn" data-action="increase">+</button>
      `;
    
      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'remove-btn';
    
      // Event Listeners
      quantityControls.querySelector('[data-action="increase"]').addEventListener('click', () => {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
      });
    
      quantityControls.querySelector('[data-action="decrease"]').addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(cart.indexOf(item), 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
      });
    
      removeBtn.addEventListener('click', () => {
        const index = cart.findIndex(i => i.id === item.id);
        if (index > -1) cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
      });
    
      // Subtotal
      const subtotal = document.createElement('p');
      subtotal.innerHTML = `<strong>Subtotal: $${itemTotal.toFixed(2)}</strong>`;
    
      const divider = document.createElement('hr');
    
      // ✅ Build card by appending all pieces
      productEl.appendChild(img);
      productEl.appendChild(title);
      productEl.appendChild(price);
      productEl.appendChild(quantityControls);
      productEl.appendChild(subtotal);
      productEl.appendChild(removeBtn);
      productEl.appendChild(divider);
    
      cartContainer.appendChild(productEl);
    });
    
    
  })
  .catch((err) => {
    console.error("Error loading cart:", err);
  });
