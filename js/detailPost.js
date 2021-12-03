let urlFull = window.location.search;
let urlParams = new URLSearchParams(urlFull);
let postId = urlParams.get("id");

function getPostById(id) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      console.log(response)
      printData(response);
    });
    const URL = `https://desafio-kodemia-backend.herokuapp.com/posts/${id}`;
    xhr.open("GET", URL, true);
    xhr.send();
  }
  getPostById(postId);


function printData({id, content, date, titulo, tags, reactions, img}){
    const imgPost = document.querySelector(".card-img-top");
    imgPost.src = img;

    const titlePost = document.querySelector("#title");
    titlePost.textContent = titulo;

    const contentPost = document.querySelector("#content");
    contentPost.textContent = content;

    const showTags = document.querySelector("#showTags");
    tags.forEach(tag => {
        // <a href="#"><span class="badge bg-secondary">#react</span></a>
        const aTag = document.createElement("a");
        aTag.href = "#";
        const spanTag = document.createElement("span");
        spanTag.classList.add("badge", "bg-secondary", "tag");
        spanTag.textContent = `#${tag}`
        aTag.appendChild(spanTag);
        showTags.appendChild(aTag);
    });

    const likes = document.querySelector("#likes");
    likes.textContent = reactions.likes;

    console.log(date)
}