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

        for (let i = 0; i < data['DietPlans'].length; i++) {
            grid.innerHTML += `<div class="card item mb-3 p-0 border border-3 border-success rounded-3" id="${i}">
  <img src="../${data['DietPlans'][i]['image']}" class="card-img-top object-fit-cover border-bottom border-3 border-success min-w-200px" style="height:230px;">
  <div class="card-body">
    <h5 class="card-title">${data['DietPlans'][i]['name']}</h5>
    <p class="card-text"><small class="text-muted">${data['DietPlans'][i]['category']}</small></p>
    <p class="card-text">${data['DietPlans'][i]['description']}</p>
  </div>
</div>`
        }

        //Нажатие на один из режимов
        let modesItem = document.getElementsByClassName('item')
        for (let i = 0; i < modesItem.length; i++) {
            modesItem[i].addEventListener('click', function (e) {
                let id = e.currentTarget.id
                let main = document.getElementById('main')
                main.innerHTML = ""
                main.innerHTML = `
                    <div class="bg-black opacity-70 z-n1 position-absolute w-100" style="height:400px; min-width:315px">
                        <div style="background-image:url('../${data['DietPlans'][id]['image']}');
                        background-position:center; background-repeat:no-repeat; background-size:cover; filter:blur(5px);
                        opacity:0.5;" class="opacity-70 min-w-200px w-100 h-100"></div>
                    </div>
                    <div class="container"> 
                        <div class="d-flex justify-content-center w-100">
                                <div class="row row-cols-xs-1 w-100" style="height:400px; min-width: 315px;">
                                    <div class="col-sm-12 d-flex flex-column justify-content-center text-center text-sm-start">
                                        <span class="text-white display-3">${data['DietPlans'][id]['name']}</span>
                                        <span class="text-white display-6">Категория: ${data['DietPlans'][id]['category']}</span>
                                    </div>
                                    <div class="col-sm-12 text-center"> 
                                        <span class="text-white fs-4">${data['DietPlans'][id]['description']}</span>
                                    </div>
                                    <div class="d-flex justify-content-center w-100">
                                        <button type="button" id="exitMode" class="btn btn-success border border-black border-2 w-50" aria-label="Закрыть" style="height: 40px;">Вернуться</button>
                                    </div>
                                </div>
                        </div>
                        <div class="bg-success-subtle border-2 py-4 border-success border-start border-end d-flex align-items-center flex-column" style="min-width:250px; min-height: 750px;">
                            <span class="h3 mb-3">Рекомендации</span>
                            <div class="p-3">
                                <ul class="list-group rounded-3" id="recommendations"></ul>
                            </div>
                            
                            <p class="h3 my-3  d-flex justify-content-center">Основное питание</p>
                            <div id="table-body" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100"></div>
                        </div>
                    </div>  
                `
                let recommendations = document.getElementById('recommendations')
                for (let i = 0; i < data['DietPlans'][id]['recommendations'].length; i++) {
                    recommendations.innerHTML += `<li class="list-group-item fs-4 border border-2 border-success">${i + 1}. ${data['DietPlans'][id]['recommendations'][i]}</li>`
                }

                let table = document.getElementById('table-body')
                for(let i = 0; i < data['DietPlans'][id]['sampleMenu'].length; i++) {
                    console.log(data['DietPlans'][id]['sampleMenu'].length)
                    table.innerHTML += `
<div class="p-3 d-flex align-items-center justify-content-center">
<div class="col card h-100 border-success border-2" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${data['DietPlans'][id]['sampleMenu'][i]}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${data['DietPlans'][id]['categoryMenu'][i]}</h6>
    <p class="card-text">Калорийность ${data['DietPlans'][id]['caloriesMenu'][i]} Ккал</p>
    <div class="text-center row row-cols-3">
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">Б</span>
                                                        <span class="card-text">${data['DietPlans'][id]['proteinsMenu'][i]}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">Ж</span>
                                                        <span class="card-text">${data['DietPlans'][id]['fatsMenu'][i]}</span>
                                                    </div>
                                                    <div class="col d-flex flex-column p-2" style="width:fit-content">
                                                        <span class="card-text">У</span>
                                                        <span class="card-text">${data['DietPlans'][id]['carbsMenu'][i]}</span>
                                                    </div>
                                                  </div>
  </div>
</div>
</div>
`
                }

                let exitMode = document.getElementById("exitMode")
                exitMode.addEventListener("click", function (e) {
                    window.location = "modes.html"
                })
            })
        }
    })
