
function post(obj){
    const xhr = new XMLHttpRequest();
    const URL = "https://desafio-js-kodemia-default-rtdb.firebaseio.com/.json";

    xhr.open("POST", URL, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log("hola");
        }
    };
    xhr.send(JSON.stringify(obj))
}
// post(objeto)
function writeTags(){
    let tags = this.value;
    let arrayTags = tags.split(" ");
    const aviso = document.querySelector(".aviso");
    if(arrayTags.length >= 5){
        this.dataset.valid = false;

        aviso.style.display = "block";
    }else{
        this.dataset.valid = true;
        aviso.style.display = "none";
    }
}

const tags = document.querySelector("#tags");
tags.addEventListener("keyup", writeTags)

function savePost(){
    const titulo = document.querySelector("#titulo");
    console.log(tags.dataset.valid)
    //Titulo
    //Tags
    //img
    //content
    // let objeto = {
    //     titulo,
    //     tags: ["#react", "#tutorial"],
    //     content,
    //     img: imgPost,
    //     date: "01-15-2020",
    //     hour: "10:00:00",
    //     reactions: {
    //         likes: 0,
    //         unicorn: 0,
    //         save: 0,
    //     },
    // };
}

const btnPublish = document.querySelector("#publish");
btnPublish.addEventListener("click", savePost)