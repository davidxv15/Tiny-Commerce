fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const product = products.find(p => p.id === id);

    if (!product) {
      document.body.innerHTML = "<p>Product not found.</p>";
      return;
    }

    // Populate product data
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = product.name;
    document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;

    // ✅ Dynamically insert the button
    const btn = document.createElement("button");
    btn.className = "add-to-cart";
    btn.dataset.id = product.id;
    btn.textContent = "+";
    document.querySelector(".product-detail").appendChild(btn);

    // ✅ Attach event listener right after creating the button
    btn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id: product.id, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✅ Added to cart!");
    });
  })
  .catch(err => {
    console.error("Failed to load product details:", err);
  });