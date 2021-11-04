function cleanInput(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
    })
}
//post
function post(obj){
    const xhr = new XMLHttpRequest();
    const URL = "https://desafio-js-kodemia-default-rtdb.firebaseio.com/.json";
    xhr.open("POST", URL, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log("Post Creado con exito");
            cleanInput();
        }
    };
    xhr.send(JSON.stringify(obj))
}
//Update
function updateUser(userId, data) {
    const xhr = new XMLHttpRequest();
    const URL = `https://desafio-js-kodemia-default-rtdb.firebaseio.com/${postId}/.json`;
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.status);

      } else {
        console.log(xhr.readyState);
      }
    });
    xhr.open("PUT", URL, true);
    xhr.send(JSON.stringify(data));
}


function writeTagsValidation(){
    let tags = this.value;
    let arrayTags = tags.split(" ");
    const aviso = document.querySelector(".aviso-tags");
    const btnPublish = document.querySelector("#publish");
    if(arrayTags.length >= 5){
        this.dataset.valid = false;
        aviso.style.display = "block";
        btnPublish.disabled = true;
    }else{
        this.dataset.valid = true;
        aviso.style.display = "none";
        btnPublish.disabled = false;
    }
}

const tags = document.querySelector("#tags");
tags.addEventListener("keyup", writeTagsValidation)



function savePost(){
    const inputTitulo = document.querySelector("#titulo");
    const inputUpImage = document.querySelector("#upImage");
    const inputContent = document.querySelector("#content");
    const inputTags = document.querySelector("#tags");
    const inputDate = document.querySelector("#date");
    let titulo = inputTitulo.value;
    let tags = inputTags.value;
    let upImage = inputUpImage.value;
    let content = inputContent.value;
    let fecha = inputDate.value;
    
    // console.log(fecha);

    let aviso = document.querySelector(".aviso-post")
    let getTime = new Date();
    let hora = getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getSeconds();
    if(titulo !== "" && inputTags.dataset.valid === "true" && content !== ""){
        aviso.style.display = "none";
        let arrayTags = tags.split(" ");
        let objeto = {
            titulo,
            tags: arrayTags,
            content,
            img: upImage,
            date: fecha,
            hour: hora,
            reactions: {
                likes: 0,
                unicorn: 0,
                save: 0,
            },
        };
        post(objeto);
    }else{ 
        aviso.style.display = "block";
    }
}


const btnPublish = document.querySelector("#publish");
btnPublish.addEventListener("click", savePost)