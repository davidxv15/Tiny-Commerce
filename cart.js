fetch('./data/products.json')
 .then(res => res.json())
 .then(cart => {
    const cartData = localStorage.getItem('cart');

if (!cartData) {
  console.log('Cart is empty');
} else {
  try {
    const cart = JSON.parse(cartData);
    console.log('Cart loaded:', cart);
  } catch (error) {
    console.error('Failed to parse cart data:', error);
  }
}



 });