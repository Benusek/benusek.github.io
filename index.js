let productSection = document.getElementById("productSection")
let recipeSection = document.getElementById("recipeSection")
let modeSection = document.getElementById("modeSection")
let articleSection = document.getElementById("articleSection")

let request = fetch("products.json", {
    method: "GET"
})
request.then(response => {
    let JsonObject = response.json()
    console.log(JsonObject)
    return JsonObject
})
    .then(data => {
        productSection.innerHTML += `<div class="p-2 w-100">
                                        <div class="card item h-100 justify-content-center border border-2 rounded-3 border-success" id="${data['Products'][0]['idProduct']}" style="max-width: 540px;"  data-bs-toggle="modal" data-bs-target="#modal">
                                          <div class="d-flex flex-column flex-md-row g-0 justify-content-between align-items-center">
                                            <div class="d-flex align-items-center justify-content-center" style="width: 140px;">
                                              <img src="../${data['Products'][0]['list-image']}" class="img-fluid rounded-start h-75 object-fit-cover" alt="${data['Products'][0]['name']}">
                                            </div>
                                            <div class="" style="width:fit-content;">
                                              <div class="card-body text-center">
                                                  <h5 class="card-title m-0">${data['Products'][0]['name']}</h5>
                                                  <span class="card-text fs-5">Ккал ${data['Products'][0]['calories']}</span>
                                                  <div class="text-center row row-cols-3 justify-content-center">
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text fs-5">Б</span>
                                                        <span class="card-text fs-5">${data['Products'][0]['proteins']}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text fs-5">Ж</span>
                                                        <span class="card-text fs-5">${data['Products'][0]['fats']}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text fs-5">У</span>
                                                        <span class="card-text fs-5">${data['Products'][0]['carb']}</span>
                                                    </div>
                                                  </div>
                                            </div>
                                          </div>
                                        </div>`

        for (let i = 0; i < 3; i++) {
            articleSection.innerHTML += `<div class="col p-2 min-w-200px article">
             <div class="card item h-100  border border-2 rounded-3 border-success" id="${data['Articles'][i]['ArticleId']}">
                <img src="../${data['Articles'][i]['Image']}" class="card-img-top object-fit-cover border-bottom border-2 border-success" alt="article" style="height:120px;">
                <div class="card-body">
                    <h5 class="card-title">${data['Articles'][i]['Title']}</h5>
                    <p class="card-text text-truncate d-block" style="">${data['Articles'][i]['Texts'][0]}</p>
                </div>
            </div>
        </div>`
        }
        let article = document.getElementsByClassName('article')
        for(let i = 0; i < article.length; i++) {
            article[i].addEventListener('click', function (e) {
                window.location = "pages/fitness.html"
            })
        }

        recipeSection.innerHTML = `
        <div class="p-2 w-100">
                <div class="card item border border-2 rounded-3 border-success" id="${data['Recipes'][0]['idRecipe']}">
                <img src="../${data['Recipes'][0]['image']}" class="card-img-top object-fit-cover border-bottom border-2 border-success" alt="recipe" style="height:120px;">
                <div class="card-body">
                   <h5 class="card-title">${data['Recipes'][0]['name']}</h5>
                   <p class="card-text text-truncate d-block fs-5">${data['Recipes'][0]['description']}</p>
                </div>
               </div>
           </div>`

        modeSection.innerHTML = `<div class="card item mb-3 p-0 border border-3 border-success rounded-3" id="0">
  <img src="../${data['DietPlans'][0]['image']}" class="card-img-top object-fit-cover border-bottom border-3 border-success " style="height:230px;">
  <div class="card-body">
    <h5 class="card-title">${data['DietPlans'][0]['name']}</h5>
    <p class="card-text fs-5"><small class="text-muted">${data['DietPlans'][0]['category']}</small></p>
    <p class="card-text fs-5">${data['DietPlans'][0]['description']}</p>
  </div>
</div>`
        productSection.addEventListener('click', function (e){
            window.location = 'pages/products.html'
        })
        recipeSection.addEventListener('click', function (e){
            window.location = 'pages/recipes.html'
        })
        modeSection.addEventListener('click', function (e){
            window.location = 'pages/modes.html'
        })
    })