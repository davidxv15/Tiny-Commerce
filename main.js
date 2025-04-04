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
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>$${product.price.toFixed(2)}</strong></p>
        <button class="add-to-cart">Add to Cart</button>
        </div>
      `;
      
      list.appendChild(card);
    });
  })
  .catch(err => console.error('Failed to load products:', err));
