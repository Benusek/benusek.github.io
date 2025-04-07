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
            for (let i = 0; i < data['Articles'].length; i++) {
                grid.innerHTML += `<div class="col p-2 min-w-200px">
             <div class="card item h-100  border border-2 rounded-3 border-success" id="${data['Articles'][i]['ArticleId']}">
                <img src="../${data['Articles'][i]['Image']}" class="card-img-top object-fit-cover border-bottom border-2 border-success" alt="article" style="height:120px;">
                <div class="card-body">
                    <h5 class="card-title">${data['Articles'][i]['Title']}</h5>
                    <p class="card-text text-truncate d-block" style="">${data['Articles'][i]['Texts'][0]}</p>
                </div>
            </div>
        </div>`
            }




        //Нажатие на один из рецептов
        let articleItem = document.getElementsByClassName('item')
        for (let i = 0; i < articleItem.length; i++) {
            articleItem[i].addEventListener('click', function (e) {
                let id = e.currentTarget.id
                console.log(id)
                let main = document.getElementById('main')
                main.innerHTML = ""
                main.innerHTML = `<div style="min-width:315px">
                        <div class="bg-black opacity-70 z-n1 position-absolute" style="height:400px; width:100%; min-width:315px;">
                        <div style="background-image:url('../${data['Articles'][id - 1]['Image']}');
                        background-position:center; background-repeat:no-repeat; background-size:cover; filter:blur(5px);
                        opacity:0.5;" class="opacity-70 min-w-200px w-100 h-100"></div>
                    </div>
                    <div class="container min-w-200px"> 
                        <div class="d-flex justify-content-center w-100">
                                <div class="row row-cols-xs-1 w-100" style="height:400px; min-width: 300px;">
                                    <div class="col-sm-6 d-flex flex-column justify-content-center text-center text-sm-start w-100">
                                        <span class="text-white display-4">${data['Articles'][id - 1]['Title']}</span>
                                    </div>
                                    <div class="d-flex justify-content-center w-100">
                                        <button type="button" id="exitArticle" class="btn btn-success border border-black border-2 w-50" aria-label="Закрыть" style="height: 40px;">Вернуться</button>
                                    </div>
                                </div>
                        </div>
                        <div class="p-4 bg-success-subtle border-2 py-4 border-success border-start border-end d-flex align-items-center flex-column" id="ArticleBody" style="min-width:250px; min-height: 750px;">
                            
                        </div>
                    </div>
</div>        
                `
                let ArticleBody = document.getElementById("ArticleBody")
                for (let i = 0; i < data['Articles'][id - 1]['Texts'].length; i++) {
                    ArticleBody.innerHTML += `<p class="fs-2">${data['Articles'][id - 1]['Subtitles'][i]}</p>
                    <p class="fs-5">${data['Articles'][id - 1]['Texts'][i]}</p>`
                }


                let exitArticle = document.getElementById("exitArticle")
                exitArticle.addEventListener("click", function (e) {
                    window.location = "fitness.html"
                })
            })
        }
    })