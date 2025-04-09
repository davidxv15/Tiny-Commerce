fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summary = document.getElementById("checkout-summary");

    if (cart.length === 0) {
      summary.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

  });
