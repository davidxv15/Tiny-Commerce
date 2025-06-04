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
  const paginationTop = document.getElementById("pagination-top");
  const paginationBottom = document.getElementById("pagination-bottom");
  paginationTop.innerHTML = "";
  paginationBottom.innerHTML = "";

  const totalPages = Math.ceil(products.length / productsPerPage);

  // Previous Button
  function createButton(text, disabled, handler) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.disabled = disabled;
    btn.addEventListener("click", handler);
    return btn;
  }

  const prevBtn = createButton("Previous", currentPage === 1, () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(products);
      setupPagination(products);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.className = "page-info";

  const nextBtn = createButton("Next", currentPage === totalPages, () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(products);
      setupPagination(products);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Add to BOTH paginations
  [paginationTop, paginationBottom].forEach(pagination => {
    pagination.appendChild(prevBtn.cloneNode(true));
    pagination.appendChild(pageInfo.cloneNode(true));
    pagination.appendChild(nextBtn.cloneNode(true));
  });
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

function showToast(message = "Added to cart ✅") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 2000); // Disappear after 2 seconds
}

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.isAdmin) {
    const nav = document.querySelector('.nav');
    // Only add if it's not already present (avoids duplicates on rerenders)
    if (!nav.querySelector('.admin-link')) {
      const adminLink = document.createElement('a');
      adminLink.href = 'admin.html';
      adminLink.textContent = 'Admin';
      adminLink.className = 'admin-link';
      // Insert just before the logout link if present, else at end
      const logoutLink = nav.querySelector('#logout-link');
      if (logoutLink) {
        nav.insertBefore(adminLink, logoutLink);
      } else {
        nav.appendChild(adminLink);
      }
    }
  }
});
