let request = fetch("../products.json", {
    method: "GET"
})
request.then(response => {
    let JsonObject = response.json()
    console.log(JsonObject)
    return JsonObject
})
    .then(data => {
        let grid = document.getElementById("grid");

        let section = ""
        if (!document.cookie == false) {
            let arr1, arr2
            let str = document.cookie
            if (str.indexOf(';') !== -1) {
                arr1 = str.split('; ')
                for (let i = 0; i < arr1.length; i++) {
                    arr2 = arr1[i].split('=')
                    console.log(arr2)
                    if (arr2[0] === 'product') {
                        console.log(arr2[1])
                        console.log(arr2)
                        section = arr2[1]
                    }
                }
            } else {
                arr1 = str.split('=')
                if (arr1[0] === 'product') {
                    console.log(arr1[1])
                    section = arr1[1]
                }
            }
        } else {
            section = "milks"
        }

        for (let i = 0; i < data['Products'].length; i++) {
            console.log(section)
            if (data['Products'][i]['category'] === section) {
                let add = data['Products'][i]['additionaly']
                if (add === undefined) {
                    add = "";
                }
                grid.innerHTML += `<div class="p-2 min-w-200px">
                                        <div class="card item h-100 justify-content-center border border-2 rounded-3 border-success" id="${data['Products'][i]['idProduct']}" style="max-width: 540px;"  data-bs-toggle="modal" data-bs-target="#modal">
                                          <div class="d-flex flex-column flex-sm-row g-0 justify-content-between align-items-center">
                                            <div class="d-flex align-items-center justify-content-center" style="width: 140px;">
                                              <img src="../${data['Products'][i]['list-image']}" class="img-fluid rounded-start h-75 object-fit-cover" alt="${data['Products'][i]['name']}">
                                            </div>
                                            <div class="" style="width:fit-content;">
                                              <div class="card-body text-center" style="width:160px;">
                                                  <h5 class="card-title m-0">${data['Products'][i]['name']}</h5>
                                                  <p class="card-text"><small class="text-body-secondary">${add}</small></p>
                                                  <span class="card-text">Ккал ${data['Products'][i]['calories']}</span>
                                                  <div class="text-center row row-cols-3 justify-content-center">
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">Б</span>
                                                        <span class="card-text">${data['Products'][i]['proteins']}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">Ж</span>
                                                        <span class="card-text">${data['Products'][i]['fats']}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">У</span>
                                                        <span class="card-text">${data['Products'][i]['carb']}</span>
                                                    </div>
                                                  </div>
                                            </div>
                                          </div>
                                        </div>`
            }
        }

        let productsItem = document.getElementsByClassName("item");
        for (let i = 0; i < productsItem.length; i++) {
            productsItem[i].addEventListener("click", function (e) {
                let id = e.currentTarget.id
                let title = document.getElementById('staticBackdropLabel')
                let modal = document.getElementById('staticBackdropBody')
                modal.innerHTML = `<img src="../${data['Products'][id - 1]['modal-image']}" class="w-100 object-fit-cover" style="height:450px;">
                                        <div class="d-flex flex-column text-center mt-2">
                                                <span class="fs-5">Пищевая ценность</span>
                                                  <span class="card-text align-self-center">Ккал ${data['Products'][i]['calories']}</span>
                                                   
                                                <div class=" row row-cols-3 justify-content-center"> 
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">Б</span>
                                                        <span class="card-text">${data['Products'][i]['proteins']}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">Ж</span>
                                                        <span class="card-text">${data['Products'][i]['fats']}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">У</span>
                                                        <span class="card-text">${data['Products'][i]['carb']}</span>
                                                    </div>
                                                </div>
                                                <span class="card-text"><small class="text-body-secondary">Пищевая ценность на 100 г. Калорийность рассчитана для сырых продуктов.</small></span>
                                        </div>
                                        <div class="d-flex flex-column text-center mt-2">
                                            <span class="fs-5">Описание</span>
                                            <span>${data['Products'][id - 1]['description']}</span>
                                        </div>
                
                                        <div class="d-flex flex-column text-center mt-2">
                                            <span class="fs-5">Польза и вред</span>
                                            <span>${data['Products'][id - 1]['mark']}</span>
                                        </div>`
                title.innerText = data['Products'][id - 1]['name']
                let buttonGoRecipes = document.getElementById('goRecipes');

                buttonGoRecipes.addEventListener("click", function (e) {
                    window.location = "recipes.html"
                    document.cookie = `productId=${id}; path=/;`
                })


            })
        }

    })
