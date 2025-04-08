fetch('./data/products.json')
 .then(res => res.json())
 .then(products => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    if (!product) {
        document.body.innerHTML = "<p>No items in cart</p>";
        return;
    }



 });