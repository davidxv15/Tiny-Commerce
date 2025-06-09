fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summary = document.getElementById("checkout-summary");

    if (cart.length === 0) {
      summary.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    let total = 0;
    summary.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return `
      <div class="checkout-item">
      <img src="${product.image}" alt="${product.name}" class="checkout-img" />
      <span class="product-name">${product.name}</span>
      <span class="product-price">x${item.quantity} — $${itemTotal.toFixed(2)}</span>
    </div>
      `;
    }).join('') + `
    <div class="checkout-total">
    <p><strong>Total: $${total.toFixed(2)}</strong></p>
    </div>
    `;
  })
  .catch(err => {
    console.error("Failed to load checkout data:", err);
  });

// Checkout form logic — placed after fetch/catch
const form = document.getElementById('checkout-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();

  if (!name || !email || !address) {
    alert('Please fill in all fields.');
    return;
  }

  console.log('Order submitted:', { name, email, address });

  localStorage.removeItem('cart');

  alert('Order confirmed! Thank you for shopping with us.');

  // Optional redirect:
  // window.location.href = "confirmation.html";
});
