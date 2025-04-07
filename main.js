let products = document.getElementsByClassName("dropdown-item")
console.log(products.length)
for (let i = 0; i < products.length; i++) {
    products[i].addEventListener("click", function (e) {
        let productSection = e.currentTarget.id
        console.log("Привет")
        document.cookie = `product=${productSection}; path=/;`
    });
}

let recipe = document.getElementById('recipes');

recipe.addEventListener('click', function(e){
    deleteCookie('productId')
})

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
