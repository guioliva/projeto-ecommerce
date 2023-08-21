// função para fetch do catálogo
async function fetchProducts(categoryName) {
    const apiUrl = 'https://api.escuelajs.co/api/v1/products';
  
    try {
        const response = await fetch(apiUrl);
        let products = await response.json();

        // If categoryName is provided, filter products based on that category
        if (categoryName) {
            products = products.filter(product => product.category.name === categoryName);
        }

        populateProductCatalog(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

  
  function populateProductCatalog(products) {
    var productsContainer = document.getElementById('productsRow');

    var row; // Declaring outside the loop, so we can use it inside and outside
    products.forEach(function(product, index) {
        // Create a new row for every 4 products
        if (index % 4 === 0) {
            row = document.createElement('div');
            row.className = 'row';
            productsContainer.appendChild(row);
        }
  
        var productCard = document.createElement('div');
        productCard.className = 'col-md-3';
  
        var productLink = document.createElement('a');
        productLink.href = `/product/?id=${product.id}`;
        productLink.className = 'product-link';
  
        var productCardInner = document.createElement('div');
        productCardInner.className = 'product-card';
  
        var productImage = document.createElement('img');
        productImage.src = product.images[0];
        productImage.alt = product.title;
  
        var productName = document.createElement('h4');
        productName.textContent = product.title;
  
        var productPrice = document.createElement('p'); // Creating a paragraph for price
        productPrice.className = 'product-price'; 
        productPrice.textContent = "R$" + product.price.toFixed(2); // Assuming price is a number. Using toFixed(2) to format as currency.
        
        productCardInner.appendChild(productImage);
        productCardInner.appendChild(productPrice);
        productCardInner.appendChild(productName);
            // Appending price to the card
  
        productLink.appendChild(productCardInner);
        productCard.appendChild(productLink);
  
        row.appendChild(productCard);
    });
}

// funções para popular página do produto

async function fetchProductsDetail(productId) {
    var apiUrl = 'https://api.escuelajs.co/api/v1/products/' + productId;

    try {
        const response = await fetch(apiUrl);
        const product = await response.json();
        populateProductDetails(product);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}


function populateProductDetails(product) {
    var productContainer = document.getElementById('products-info');

    // Update Image
    var productImage = productContainer.querySelector('.product-detail-image');
    productImage.src = product.images[0];
    productImage.alt = product.title;

    // Update Product Title
    var productName = productContainer.querySelector('.product-detail-title');
    productName.textContent = product.title;

    // Update Product Price
    var productPrice = productContainer.querySelector('.product-detail-price');
    productPrice.textContent = "Preço: $" + product.price.toFixed(2); // Format as currency

    // Update Product Description
    var productDescription = productContainer.querySelector('.product-detail-description');
    productDescription.textContent = "Descrição: " + product.description;

    // Add to Cart Button
    var addToCartBtn = productContainer.querySelector('.add-to-cart-btn');

    // Set the `data-id` attribute to the product's unique ID
    addToCartBtn.setAttribute('data-id', product.id);
    
    if (!addToCartBtn.hasAttribute('data-bound')) {
        bindAddToCartListener(addToCartBtn, product);
        addToCartBtn.setAttribute('data-bound', 'true'); // mark it so we don't bind again
    }
}


// função para carroussel dos mais vendidos

async function fetchMainProducts() {
    var apiUrl = 'https://api.escuelajs.co/api/v1/products/';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const products = data
      populateProductMain(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
}

function populateProductMain(products) {
    var productsContainer = document.getElementById('productDisplay');
    
    var row; 
    let productCount = 0;  // Additional counter to track the number of products processed

    for(let product of products) {
        // Break the loop if 5 products have been processed
        if(productCount >= 4) {
            break;
        }
        
        // Create a new row for every 4 products
        if (productCount % 4 === 0) {
            row = document.createElement('div');
            row.className = 'row';
            productsContainer.appendChild(row);
        }
  
        var productCard = document.createElement('div');
        productCard.className = 'col-md-3';
  
        var productLink = document.createElement('a');
        productLink.href = `/product/?id=${product.id}`;
        productLink.className = 'product-link';
  
        var productCardInner = document.createElement('div');
        productCardInner.className = 'product-card';
  
        var productImage = document.createElement('img');
        productImage.src = product.images[0];
        productImage.alt = product.title;
  
        var productName = document.createElement('h4');
        productName.textContent = product.title;
  
        var productPrice = document.createElement('p'); 
        productPrice.className = 'product-price'; 
        productPrice.textContent = "R$" + product.price.toFixed(2);
        
        productCardInner.appendChild(productImage);
        productCardInner.appendChild(productPrice);
        productCardInner.appendChild(productName);
  
        productLink.appendChild(productCardInner);
        productCard.appendChild(productLink);
  
        row.appendChild(productCard);

        productCount++;
    }
}

// funções do carrinho


// armazenamento local na web
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function bindAddToCartListener(button, product) {
    // função que cria o event listener de click para 
    button.addEventListener('click', function(e) {
        const productId = e.target.getAttribute('data-id');
        // Assuming you have a reference to the products you fetched 
        // or a function to get the product by its ID:
        if (product.id == productId) { // Comparing the product's ID with the button's data-id attribute
            addToCart(product);
        }
    });
}

function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        // If product already exists in cart, increment its quantity by 1 (or however you'd like to handle quantity)
        existingProduct.quantity += 1;
    } else {
        // If product doesn't exist in cart, add it with a quantity of 1
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();

    console.log(cart)

}

function generateCartSummaryHTML(cart) {

    let total = 0;
    let html = '<h4>Resumo da compra</h4><dl>';

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        html += `<dt>${i + 1}. ${product.title}</dt>`;  
        html += `<dd>$${product.price.toFixed(2)}</dd>`;
        total += product.price;
    }

    html += `<dt>Total</dt>`;
    html += `<dd>$${total.toFixed(2)}</dd>`;
    html += '</dl>';

    return html;
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cart.length;  // Assuming 'cart' is your array of products
}















  
  