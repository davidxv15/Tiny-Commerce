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
  .catch(err => {
    console.error("Failed to load checkout data:", err);
  });
