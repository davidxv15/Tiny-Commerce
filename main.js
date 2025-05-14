let currentPage = 1;
const productsPerPage = 9;
let allProducts = [];

//  Render the correct set of products per page
function displayPage(products) {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  const list = document.getElementById("product-list");
  list.innerHTML = ""; //  Clears previous products

  paginatedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="card-content">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" />
        </a>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p id="product-description">${product.description}</p>
        <p id="product-price" class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">+</button>
      </div>
    `;
    list.appendChild(card);
  });

  if (products.length === 0) {
    list.innerHTML = "<p>No matching products found.</p>";
    return;
  }
  

  // Rebind button listeners AFTER injecting HTML
  bindCartButtons();
}

//  Attach add-to-cart behavior to each button
function bindCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showToast();
    });
  });
}

// search bar 
function setupSearch() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword)
    );

    currentPage = 1; // Reset pagination
    displayPage(filtered);
    setupPagination(filtered);
  });
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}


// Handles page navigation and button enable/disable
function setupPagination(products) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(products.length / productsPerPage);

  // ◀Previous Button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(products);
      setupPagination(products);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  pagination.appendChild(prevBtn);

  //  Page Number Info
  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.className = "page-info";
  pagination.appendChild(pageInfo);

  // ▶️ Next Button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(products);
      setupPagination(products);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  pagination.appendChild(nextBtn);
}

//  Fetch product data and initialize view
fetch("./data/products.json")
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;
    displayPage(products);        // Loads page 1
    setupPagination(products);     // Setup prev/next
    setupSearch();                  // enables 
  })
  .catch((err) => console.error("Failed to load products:", err));

//  Highlight active page in navbar
document.querySelectorAll(".nav a").forEach((link) => {
  if (link.href.includes(location.pathname)) {
    link.classList.add("active");
  }
});
