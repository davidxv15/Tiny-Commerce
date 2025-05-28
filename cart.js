fetch("./data/products.json")
  .then((res) => res.json())
  .then((products) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".products-in-cart");

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is currently empty.</p>";
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
      img.style.width = '15rem';
    
      // Title
      const title = document.createElement('h3');
      title.textContent = product.name;
    
      // Price
      const price = document.createElement('p');
      price.textContent = `$${product.price.toFixed(2)}`;
    
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
    
      // Image column
const imgCol = document.createElement('div');
imgCol.className = 'cart-img';
imgCol.appendChild(img);

// Info column
const infoCol = document.createElement('div');
infoCol.className = 'cart-info';
infoCol.innerHTML = `
  <h3>${product.name}</h3>
  <p>${product.description}</p>
  <p> $${product.price.toFixed(2)}</p>
`;

// Controls column
const controlCol = document.createElement('div');
controlCol.className = 'cart-controls';
controlCol.appendChild(quantityControls);
controlCol.appendChild(subtotal);
controlCol.appendChild(removeBtn);

// Assemble horizontal layout
productEl.appendChild(imgCol);
productEl.appendChild(infoCol);
productEl.appendChild(controlCol);
cartContainer.appendChild(productEl);

      
    });
    const totalEl = document.createElement('div');
totalEl.className = 'cart-total';
totalEl.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
cartContainer.appendChild(totalEl);
    
  })
  .catch((err) => {
    console.error("Error loading cart:", err);
  });
