function transformCategoriesHtml(categoryName, categoryDate, categoryDescription, categoryImage){
    document.querySelector("#divCategories").innerHTML += `<div class="col-md-3">
        <div class="category-box">
          <img src="${categoryImage}" alt="Box 1 Image">
          <h5>${categoryDescription}</h5>
          <h2>${categoryName}</h2>
          <a href="indexCatalog.html" class="btn btn-light">Conhecer</a>
        </div>
    </div>`
}

function getCategories(){
    fetch("api/categories.json", {mode:'no-cors'})
    .then((resposta) => console.log(resposta.json()))
    .then((dados) => {
        dados.map(data => transformCategoriesHtml(data.categoryName, data.categoryDescription, data.categoryImage)
        );
    });
}

document.addEventListener('DOMContentLoaded', function (event){
    getCategories();
})