let currentPage = 1;
const productsPerPage = 9;
let allProducts = [];

// Render the correct set of products per page, checks productsPerPage
function displayPage(products) {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  const list = document.getElementById("product-list");
  list.innerHTML = ""; // Clears previous products

  if (products.length === 0) {
    list.innerHTML = "<p>No matching products found.</p>";
    return;
  }

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

  // Rebind button listeners AFTER injecting HTML
  bindCartButtons();
}

// Attach add-to-cart behavior to each button
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

// Search bar 
function setupSearch() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword)
    );

    currentPage = 1; // RESET pagination 
    localStorage.setItem('productCurrentPage', 1);
    displayPage(filtered);
    setupPagination(filtered);
  });
}

function setCurrentPage(num, products) {
  currentPage = num;
  localStorage.setItem('productCurrentPage', num);
  displayPage(products);
  setupPagination(products);
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// Pagination logic with First/Last
function setupPagination(products) {
  const paginationTop = document.getElementById("pagination-top");
  const paginationBottom = document.getElementById("pagination-bottom");
  paginationTop.innerHTML = "";
  paginationBottom.innerHTML = "";

  const totalPages = Math.ceil(products.length / productsPerPage);

  function createButton(text, disabled, handler) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.disabled = disabled;
    btn.addEventListener("click", handler);
    return btn;
  }

  function addPagination(paginationBar, products) {
    // First Button
    const firstBtn = createButton("◀︎◁First", currentPage === 1, () => {
      if (currentPage !== 1) setCurrentPage(1, products);
    });

    // Previous Button
    const prevBtn = createButton("Previous", currentPage === 1, () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1, products);
    });
    

    // Page Info
    const pageInfo = document.createElement("span");
    pageInfo.innerHTML = `<span class="page-label" style="display: block">Page</span> <span class="page-number">${currentPage}</span> <span class="page-of">of</span> <span class="page-total">${totalPages}</span>`;

    pageInfo.className = "page-info";

    // Next Button
    const nextBtn = createButton("Next", currentPage === totalPages, () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1, products);
    });

    // Last Button
    const lastBtn = createButton("Last▷▶︎", currentPage === totalPages, () => {
      if (currentPage !== totalPages) setCurrentPage(totalPages, products);
    });

    // Append buttons: First, Prev, Info, Next, Last
    paginationBar.appendChild(firstBtn);
    paginationBar.appendChild(prevBtn);
    paginationBar.appendChild(pageInfo);
    paginationBar.appendChild(nextBtn);
    paginationBar.appendChild(lastBtn);
  }

  addPagination(paginationTop, products);
  addPagination(paginationBottom, products);
}

// Fetch product data and initialize view
fetch("./data/products.json")
  .then((res) => res.json())
  .then((products) => {
    //  Will grab admin-added products from localStorage
    const localProducts = JSON.parse(localStorage.getItem('productDB')) || [];
    //  Merge arrays
    allProducts = products.concat(localProducts);

    const savedPage = parseInt(localStorage.getItem('productCurrentPage'));
if (!isNaN(savedPage) && savedPage > 0) {
  currentPage = savedPage;
}


    displayPage(allProducts);        
    setupPagination(allProducts);     
    setupSearch();                   
  })
  .catch((err) => console.error("Failed to load products:", err));

// Highlight active page in navbar
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

// Inject admin link into nav for admins
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.isAdmin) {
    const nav = document.querySelector('.nav');
    if (!nav.querySelector('.admin-link')) {
      const adminLink = document.createElement('a');
      adminLink.href = 'admin.html';
      adminLink.textContent = 'Admin';
      adminLink.className = 'admin-link';
      const logoutLink = nav.querySelector('#logout-link');
      if (logoutLink) {
        nav.insertBefore(adminLink, logoutLink);
      } else {
        nav.appendChild(adminLink);
      }
    }
  }
});
