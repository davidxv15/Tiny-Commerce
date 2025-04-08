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

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = product.name;
    document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
  })
  .catch(err => {
    console.error("Failed to load product details:", err);
  });
