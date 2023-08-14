// função para fetch do catálogo
  
async function fetchProducts() {
    var apiUrl = 'https://fakestoreapi.com/products';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      populateProductCatalog(data);
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
        productLink.href = product.image;
        productLink.className = 'product-link';
  
        var productCardInner = document.createElement('div');
        productCardInner.className = 'product-card';
  
        var productImage = document.createElement('img');
        productImage.src = product.image;
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
    var apiUrl = 'https://fakestoreapi.com/products/' + productId;

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
    productImage.src = product.image;
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
}


// função para carroussel dos mais vendidos

async function fetchMainProducts() {
    var apiUrl = 'https://fakestoreapi.com/products';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      populateProductMain(data);
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
        productLink.href = product.image;
        productLink.className = 'product-link';
  
        var productCardInner = document.createElement('div');
        productCardInner.className = 'product-card';
  
        var productImage = document.createElement('img');
        productImage.src = product.image;
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






  
  