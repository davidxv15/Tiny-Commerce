# TinyCommerce 🛒
A modular mock e-commerce storefront built with vanilla HTML, CSS, and JavaScript. Ideal for strengthening UI fundamentals, cart logic, and client-side architecture.

## How to Use This App?

**Browse Products**
- Products are dynamically loaded from a mock JSON file.
- Click on a product name or image to visit its detail page.
  
**Search & Pagination**
- Use the search bar to filter products by name or description.
- Navigate between product pages using Previous/Next buttons (client-side pagination).
  
**Add to Cart**
- Click the + icon to add an item to your cart.
- Quantity management and total pricing are handled via localStorage.
  
**Manage Cart**
- Go to the Cart page to adjust quantities, view subtotals, or remove items.
- See real-time updates to item totals and the grand total.
  
**Checkout**
- The Checkout page displays a summary of your cart and a basic shipping form.
- Submitting the form simulates a completed order and clears the cart.
  
**Login**
- A basic form to simulate authentication. Username/password is not yet connected to any backend.
  
**Admin Panel**
- A form to create new products and preview a simple list — ideal for learning CRUD structures in future versions.

### Technologies Used
**Frontend**
HTML5: Semantic structure.
CSS3: Modular stylesheets per screen, with custom properties (:root).
Vanilla JavaScript: Dynamic DOM manipulation, fetch requests, localStorage.
Mock Data & Architecture
products.json: Local static file acting as a mock product database.
LocalStorage: Used to store cart contents across sessions.
UX Enhancements
Skeleton Loaders: Simulated loading state before products render.
Toast Notifications: Styled in-app alerts for add-to-cart confirmation.
Responsive Layout: Grid and Flexbox layouts ensure accessibility on all screen sizes.

This app runs client-side only — no server needed.

### Future Features
Authentication Simulation: Protect admin dashboard based on user role.
CRUD Admin System: Create, read, update, and delete product entries.
MongoDB / Express Backend: Migrate from mock data to persistent database.
Stripe Integration: Real payment processing via secure checkout flow.
User Wishlist: Allow customers to favorite or bookmark items.
Filter/Sort System: Enable users to refine search by price, category, popularity.

🚫 Deployment
This is a mock frontend-only application, not currently deployed. All data is local and simulated.
In the React + Vite + TypeScript version, deployment will be handled via Netlify or Vercel with optional backend hosting via Render, Railway, or Heroku.
Let me know if you’d like to embed a visual (/preview.png) or include badges, a license, or contribution guide.
