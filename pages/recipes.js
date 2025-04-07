let grid = document.getElementById('grid');
let request = fetch("../products.json", {
    method: "GET"
})
request.then(response => {
    let JsonObject = response.json()
    console.log(JsonObject)
    return JsonObject
})
    .then(data => {
        grid.innerHTML = ""
        let product = ""
        let flag = false;
        if (!document.cookie == false) {
            let arr1, arr2
            let str = document.cookie
            arr1 = str.split('; ')
            for (let i = 0; i < arr1.length; i++) {
                arr2 = arr1[i].split('=')
                console.log(arr2)
                if (arr2[0] === 'productId') {
                    console.log(arr2)
                    product = arr2[1]
                    let recipes = []
                    for (let j = 0; j < data['Recipes'].length; j++) {
                        for (let i = 0; i < data['Recipes'][j]['idProducts'].length; i++) {
                            if (product.includes(data['Recipes'][j]['idProducts'][i])) {
                                recipes.push(j)
                            }
                        }
                    }
                    console.log(recipes)

                    findRecipe(recipes, data)
                    flag = true;
                }
            }
        }

        if (!flag) {
            for (let i = 0; i < data['Recipes'].length; i++) {
                grid.innerHTML += `<div class="col p-2 min-w-200px">
             <div class="card item h-100 border border-2 rounded-3 border-success" id="${data['Recipes'][i]['idRecipe']}">
                <img src="../${data['Recipes'][i]['image']}" class="card-img-top object-fit-cover border-bottom border-2 border-success" alt="recipe" style="height:120px;">
                <div class="card-body">
                    <h5 class="card-title">${data['Recipes'][i]['name']}</h5>
                    <p class="card-text text-truncate d-block" style="">${data['Recipes'][i]['description']}</p>
                </div>
            </div>
        </div>`
            }
        }

        let checkboxes = document.getElementsByClassName('checkbox')
        let radios = document.querySelector("#recipeName").querySelectorAll("input, radio");
        let productSections = document.getElementById("productName");
        getAllProducts(productSections, data)

        let activeCheckboxes = []
        console.log(activeCheckboxes)

        let inputProducts = document.getElementById("inputProducts");
        inputProducts.addEventListener("input", function (e) {
            let message = document.getElementById("NotFoundMessage")
            let oneProduct = false;
            productSections.innerHTML = ""
            let activeRadio = ""

            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    activeRadio = radios[i].id
                }
            }
            for (let j = 0; j < data['Products'].length; j++) {
                if (inputProducts.value !== "" && activeRadio !== 'everyone') {
                    if (data['Products'][j]['name'].toLowerCase().startsWith(inputProducts.value.toLowerCase())) {
                        if (data[activeRadio].includes(data['Products'][j]['idProduct']) && !activeRadio.includes('everyone')) {
                            getOneProduct(productSections, data, j)
                            oneProduct = true
                        }
                    }
                } else if (inputProducts.value === "" && activeRadio !== 'everyone') {
                    if (data[activeRadio].includes(data['Products'][j]['idProduct']) && !activeRadio.includes('everyone')) {
                        getOneProduct(productSections, data, j)
                        oneProduct = true
                    }
                } else if (inputProducts.value !== "" && activeRadio === 'everyone') {
                    if (data['Products'][j]['name'].toLowerCase().startsWith(inputProducts.value.toLowerCase())) {
                        getOneProduct(productSections, data, j)
                        oneProduct = true
                    }
                } else if (inputProducts.value === "" && activeRadio === 'everyone') {
                    getOneProduct(productSections, data, j)
                    oneProduct = true
                }
                console.log(oneProduct)

            }
            for (let i = 0; i < checkboxes.length; i++) {
                if (activeCheckboxes.includes(checkboxes[i].id)) {
                    checkboxes[i].checked = true;
                    console.log(checkboxes[i])
                }
            }
            if (!oneProduct) {
                message.innerHTML = `<div class="mt-3"><span class="text-body-secondary">Ничего не найдено</span></div>`
            } else {
                message.innerHTML = ""
            }
            remindCheckboxes(checkboxes, activeCheckboxes)
        })

        remindCheckboxes(checkboxes, activeCheckboxes)
        for (let i = 0; i < radios.length; i++) {
            radios[i].addEventListener('click', function (e) {
                activeCheckboxes = []
                let id = e.currentTarget.id
                productSections.innerHTML = ``
                if (id !== 'everyone') {
                    for (let j = 0; j < data[id].length; j++) {
                        productSections.innerHTML += `<div class="d-flex align-items-center pt-2 justify-content-center">
                            <span class="label text-center">${data['Products'][data[id][j] - 1]["name"]}</span>
                            <input type="checkbox" class="checkbox ms-2 form-check-input" name="${data['Products'][data[id][j] - 1]["idProduct"]}" id="${data['Products'][data[id][j] - 1]["idProduct"]}">
                        </div>`
                    }
                } else {
                    getAllProducts(productSections, data)
                }
                remindCheckboxes(checkboxes, activeCheckboxes)
            })
        }

        let buttonFind = document.getElementById('findRecipes');
        buttonFind.addEventListener("click", function (e) {
            let recipes = []
            let category = ""
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    category = radios[i].id.toString()
                }
            }
            console.log("Length" + activeCheckboxes.length)

            if (category.includes("everyone")) {
                for (let i = 0; i < data['Recipes'].length; i++) {
                    let count = 0;
                    for (let j = 0; j < data['Recipes'][i]['idProducts'].length; j++) {
                        console.log(activeCheckboxes.includes(data['Recipes'][i]['idProducts'][j]))
                        if (activeCheckboxes.includes(data['Recipes'][i]['idProducts'][j])) {
                            count++
                        }

                        if (count === activeCheckboxes.length) {
                            recipes.push(i)
                            break;
                        }
                    }
                }
            } else {
                for (let i = 0; i < data['Recipes'].length; i++) {
                    let count = 0;
                    if (category.includes(data['Recipes'][i]['category'])) {
                        for (let j = 0; j < data['Recipes'][i]['idProducts'].length; j++) {
                            console.log(activeCheckboxes.includes(data['Recipes'][i]['idProducts'][j]))
                            console.log(j)
                            if (activeCheckboxes.includes(data['Recipes'][i]['idProducts'][j])) {
                                count++
                            }

                            if (count === activeCheckboxes.length) {
                                recipes.push(i)
                                break;
                            }
                        }
                    }
                }
            }
            findRecipe(recipes, data)
        })


        //Нажатие на один из рецептов
        addEventForRecipes(data)



        let buttonReset = document.getElementById("resetRecipes")
        buttonReset.addEventListener("click", function (e) {
            activeCheckboxes = []
            inputProducts.value = ""
            let everyone = document.getElementById('everyone');
            let checkbox = document.querySelector('#filter').querySelectorAll('input, checkbox')
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false;
            }
            getAllProducts(productSections, data)
            everyone.checked = true;
        })
    })

function remEt(a, ele) {
    a.forEach((item, index) => {
        if (item === ele) {
            a.splice(index, 1);
        }
    });
    return a;
}

function getOneProduct(productSections, data, j) {
    productSections.innerHTML += `<div class="d-flex align-items-center pt-2 justify-content-center">
                                    <span class="label text-center">${data['Products'][j]["name"]}</span>
                                    <input type="checkbox" class="checkbox form-check-input ms-2" name="${data['Products'][j]["idProduct"]}" id="${data['Products'][j]["idProduct"]}">
                                </div>`
}

function getAllProducts(productSections, data) {
    for (let j = 0; j < data['Products'].length; j++) {
        getOneProduct(productSections, data, j)
    }
}

function findRecipe(recipes, data) {
    let grid = document.getElementById('grid');
    grid.innerHTML = "";

    if (recipes.length !== 0) {
        for (let i = 0; i < recipes.length; i++) {
            console.log(data['Recipes'][recipes[i] * 1])
            grid.innerHTML += `<div class="col p-2 min-w-200px">
                <div class="card item border border-2 rounded-3 border-success h-100" id="${data['Recipes'][recipes[i]]['idRecipe']}">
                    <img src="../${data['Recipes'][recipes[i]]['image']}" class="card-img-top object-fit-cover border-bottom border-2 border-success" alt="recipe" style="height:120px;">
                    <div class="card-body">
                       <h5 class="card-title">${data['Recipes'][recipes[i]]['name']}</h5>
                       <p class="card-text text-truncate d-block">${data['Recipes'][recipes[i]]['description']}</p>
                    </div>
               </div>
           </div>`
        }
    } else {
        grid.innerHTML = `<div class="col-12 w-100 text-center mt-5"><span class="fs-1 text-body-secondary">Ничего не найдено</span></div>`
    }
    console.log(recipes)
    addEventForRecipes(data)
}

function addEventForRecipes(data) {
    let recipesItem = document.getElementsByClassName('item')
    for (let i = 0; i < recipesItem.length; i++) {
        recipesItem[i].addEventListener('click', function (e) {
            let id = e.currentTarget.id
            console.log(id)
            let main = document.getElementById('main')
            main.innerHTML = ""
            main.innerHTML = `<div style="min-width:315px">
                        <div class="bg-black opacity-70 z-n1 position-absolute" style="height:400px; width:100%; min-width:315px;">
                        <div style="background-image:url('../${data['Recipes'][id - 1]['image']}');
                        background-position:center; background-repeat:no-repeat; background-size:cover; filter:blur(5px);
                        opacity:0.5;" class="opacity-70 min-w-200px w-100 h-100"></div>
                    </div>
                    <div class="container min-w-200px"> 
                        <div class="d-flex justify-content-center w-100">
                                <div class="row row-cols-xs-1 w-100" style="height:400px; min-width: 300px;">
                                    <div class="col-sm-6 d-flex flex-column justify-content-center text-center text-sm-start w-75">
                                        <span class="text-white display-1">${data['Recipes'][id - 1]['name']}</span>
                                        <span class="text-white display-6">Каллорийность: ${data['Recipes'][id - 1]['calories']} Ккал</span>
                                    </div>
                                    <div class="col-sm-6 d-flex flex-column justify-content-center text-center text-sm-end w-25">
                                        <span class="text-white fs-4">Б ${data['Recipes'][id - 1]['proteins']}</span>
                                        <span class="text-white fs-4">Ж ${data['Recipes'][id - 1]['fats']}</span>
                                        <span class="text-white fs-4">У ${data['Recipes'][id - 1]['carb']}</span>
                                    </div>
                                    <div class="col-sm-12 text-center"> 
                                        <span class="text-white fs-4">${data['Recipes'][id - 1]['description']}</span>
                                    </div>
                                    <div class="d-flex justify-content-center w-100">
                                        <button type="button" id="exitRecipe" class="btn btn-success border border-black border-2 w-50" aria-label="Закрыть" style="height: 40px;">Вернуться</button>
                                    </div>
                                </div>
                        </div>
                        <div class="bg-success-subtle border-2 py-4 border-success border-start border-end d-flex align-items-center flex-column" style="min-width:250px; min-height: 750px;">
                            <p class="h3 py-2 d-flex justify-content-center">Ингредиенты</p>
                            <div class="w-100 d-flex justify-content-center align-items-center mb-4">
                                <ul id="ingredientsList" class="list-group w-50 bg-light min-w-200px border border-success"></ul>
                            </div>
                            <p class="h3 py-2 d-flex justify-content-center">Рецепт приготовления</p>
                            <div id="stepsList" class="w-50"></div>
                        </div>
                    </div>
</div>
                    
                    
                        
                `
            let ingredients = document.getElementById("ingredientsList")
            console.log(data['Recipes'][id - 1]['idProducts'])
            for (let i = 0; i < data['Recipes'][id - 1]['idProducts'].length; i++) {
                let product = data['Recipes'][id - 1]['idProducts'][i];
                console.log(product)
                ingredients.innerHTML += `<li class="list-group-item d-flex flex-column flex-sm-row justify-content-xs-center align-items-center border border-success">
                    <img src="../${data['Products'][product - 1]['list-image']}" class="w-95px object-fit-cover"> 
                    <div class="d-flex justify-content-around w-100 flex-column flex-md-row justify-content-xs-center">
                        <span class="fs-5 text-center p-1 fw-medium">${data['Products'][product - 1]['name']}</span>
                        <span class="fs-6 text-center p-1 fw-medium">${data['Recipes'][id - 1]['gramm'][i]}</span>
                    </div>
                    
                    </li>`
            }
            let steps = document.getElementById("stepsList")
            let stepNum = data['Recipes'][id - 1]['idSteps'];
            for (let i = 0; i < data['Steps'][stepNum - 1]['Steps'].length; i++) {
                steps.innerHTML += `<div class="w-100 py-2">
                        <p class="h3  pb-2">Шаг ${i + 1}</p>
                        <span class="fs-5">${data['Steps'][stepNum - 1]['Steps'][i]}</span>
                    </div>`
            }
            let exitRecipe = document.getElementById("exitRecipe")
            exitRecipe.addEventListener("click", function (e) {
                window.location = "recipes.html"
            })
        })
    }
}

function remindCheckboxes(checkboxes, activeCheckboxes) {
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', function (e) {
            let id = e.target.id
            console.log(id)
            if (document.getElementById(id).checked) {
                console.log(id)
                activeCheckboxes.push(id.toString())
            } else {
                for (let i = 0; i < activeCheckboxes.length; i++) {
                    if (activeCheckboxes[i].includes(id)) {
                        remEt(activeCheckboxes, id);
                    }
                }
            }
        })
    }
}