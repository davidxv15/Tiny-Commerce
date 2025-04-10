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
          <strong>${product.name}</strong> x${item.quantity} — $${itemTotal.toFixed(2)}
        </div>
      `;
    }).join('') + `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  })

// Add this at the bottom of checkout.js
const form = document.getElementById('checkout-form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page reload

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();

  if (!name || !email || !address) {
    alert('Please fill in all fields.');
    return;
  }

  // Simulate order submission
  console.log('Order submitted:', { name, email, address });

  // Clear cart
  localStorage.removeItem('cart');

  // Show confirmation or redirect
  alert('✅ Order confirmed! Thank you for shopping with us.');

  // Optional: redirect to a confirmation page
  // window.location.href = "confirmation.html";
});


  .catch(err => {
    console.error("Failed to load checkout data:", err);
  });
