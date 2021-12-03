function cleanMainBody() {
  const mainBody = document.querySelector(".main--body")
  while (mainBody.firstChild) {
    mainBody.firstChild.remove();
  }
}


function filterPost(arrayOfPost, value) {
  let postFiltrados = arrayOfPost.filter(post => post.title.includes(value));
  cleanMainBody();
  renderCards(postFiltrados);
}

function filterLatest(arrayOfPost) {
  const filterLatest = arrayOfPost
    .map((post) => {
      post.dates = `${post.date} ${post.hour}`
      return post
    })
  const orderLatest = filterLatest.sort((a, b) => {
    if (a.dates < b.dates) {
      return 1;
    }
    if (a.dates > b.dates) {
      return -1;
    }
    return 0;
  })
  cleanMainBody();
  renderCards(orderLatest)
}

function filterDate(dias) {
  let today = new Date();
  todayFormat = today.toISOString().split('T')[0]
  let daysSorted = [todayFormat];

  for (let i = 0; i < dias - 1; i++) {
    let newDate = new Date(today.setDate(today.getDate() - 1));
    newDate = newDate.toISOString().split('T')[0]
    daysSorted = [...daysSorted, newDate];
  }

  return daysSorted;
}

function filterTop(arrayOfPost, cantidadDias) {

  const filterDias = arrayOfPost.filter((dias) => {
    return filterDate(cantidadDias).includes(dias.formatDate)
  })

  const orderTop = filterDias.sort((a, b) => {
    if (a.reactions.likes < b.reactions.likes) {
      return 1;
    }
    if (a.reactions.likes > b.reactions.likes) {
      return -1;
    }
    return 0;
  })
  cleanMainBody();
  renderCards(orderTop)
}

function search(arrayOfPost) {
  const search = document.querySelector("#inputSearch");
  search.addEventListener("keyup", () => {
    let value = search.value;
    filterPost(arrayOfPost, value);
  });
}


function clickLatest(arrayOfPost) {
  const filter = document.querySelector(".latest");
  filter.addEventListener("click", () => {
    topFilter("subtop")
    clickFilterCss(filter, "items-center")
    filterLatest(arrayOfPost);
  });
}

function clickTopReaction(arrayOfPost) {
  const filter = document.querySelector(".top");
  const filterWeek = document.querySelector(`.week`);
  filter.addEventListener("click", () => {
    topFilter("subtop", "ver")
    clickFilterCss(filter, "items-center")
    filterTop(arrayOfPost, 7)
    clickFilterCss(filterWeek, "subtop")
    TopReaction(arrayOfPost, 7, "week");
    TopReaction(arrayOfPost, 30, "month");
    TopReaction(arrayOfPost, 360, "year");
  });
}

function TopReaction(arrayOfPost, dias, clase) {
  const filter = document.querySelector(`.${clase}`);
  filter.addEventListener("click", () => {
    clickFilterCss(filter, "subtop")
    filterTop(arrayOfPost, dias);
  });
}

function clickFilterCss(filter, clase) {
  const mostrar = document.querySelectorAll(`.${clase} li a`);
  mostrar.forEach((li) => li.classList.remove("filter-select"))
  filter.classList.add("filter-select",)
}


function getPosts() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    console.log(response)
    let arrayOfPost = toArray(response);

    //--JAIRO esto es lo que da error, descomentalo y pruebalo en actualizar pero haz otra rama no lo hagas en develop
    // arrayOfPost.map((data) => {
    //   let todayFormat = data.date.split('T')[0]
    //   data.formatDate = todayFormat;
    // })
    console.log(arrayOfPost);
    renderCards(arrayOfPost);
    search(arrayOfPost);
    clickLatest(arrayOfPost)
    clickTopReaction(arrayOfPost)
    let cardDecoration = document.querySelectorAll(".cards-secondary")
    cardBorder(cardDecoration)
  })
  const URL = "https://desafio-kodemia-backend.herokuapp.com/posts";//URL del backend en Heroku
  xhr.open("GET", URL, true);
  xhr.send();
}


function cardBorder(cardDecoration) {
  cardDecoration.forEach((card) => {
    card.addEventListener("mouseover", function (event) {
      this.parentNode.parentNode.parentNode.parentNode.classList.add("bordCard")
    });
    card.addEventListener("mouseout", function (event) {
      this.parentNode.parentNode.parentNode.parentNode.classList.remove("bordCard")
    }
    );
  })
}

getPosts();

// console.log(getPosts())

function toArray(objPosts) {
  let listPosts = [];
  for (let key in objPosts) {
    let obj = {
      id: key,
      ...objPosts[key],
    }
    listPosts.push(obj);
  }
  return listPosts;
}

function renderCards(arrayPostCards) {
  arrayPostCards.forEach(async (person) => {
    await printCard(person)
  })
}

function removePost() {
  let postId = this.dataset.id;
  deletePost(postId)
}

function deletePost(postId) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log("Eliminado", xhr.responseText);
    cleanMainBody();
    getPosts();
  });
  const URL = `https://desafio-kodemia-backend.herokuapp.com/posts/${postId}`;//URL del backend en Heroku
  xhr.open("DELETE", URL, true);
  xhr.send();
};

function numRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min));
  return num + min;
}

function printCard({ _id, content, date, title, tags, reactions, img }) {
  const mainBody = document.querySelector(".main--body")
  const card = document.createElement("article");
  card.classList.add("card");

  const card_img = document.createElement("figure");
  card_img.classList.add("card__img");

  const imgFirstCard = document.createElement("img");
  imgFirstCard.src = img


  const card_body = document.createElement("div");
  card_body.classList.add("card__body");

  const body_top = document.createElement("div");
  body_top.classList.add("body__top");

  const ps_relative = document.createElement("div");
  ps_relative.classList.add("ps-relative");

  const aImageAutor = document.createElement("a");
  const img_autor = document.createElement("img");
  img_autor.classList.add("img__autor", "radius-10")
  img_autor.src = `https://randomuser.me/api/portraits/thumb/men/${numRandom(10, 100)}.jpg`

  // const aImageCoautor = document.createElement("a");
  // const img_subAutor = document.createElement("img");
  // img_subAutor.classList.add("img__autor", "sub-autor", "radius-50")
  // img_subAutor.src = "https://res.cloudinary.com/practicaldev/image/fetch/s--5CVl1gkL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/643010/08a70295-50e8-45cf-9d3a-e6c251e10f1b.png"

  const autor = document.createElement("div");
  autor.classList.add("autor");

  const autor_name = document.createElement("div");
  autor_name.classList.add("autor__name");

  const inSombra = document.createElement("span");
  inSombra.classList.add("inSombra");
  inSombra.textContent = "Jairo Rocano";

  const spanLibre = document.createElement("span");

  const forSpan = document.createElement("span");
  forSpan.classList.add("for");
  forSpan.textContent = "for ";

  const nameCoautor = document.createElement("a");
  nameCoautor.textContent = "XenoX";

  const sombra = document.createElement("div");
  sombra.classList.add("sombra");

  const aTime = document.createElement("a");
  const time = document.createElement("time");
  time.classList.add("time");
  time.textContent = `${moment(date).format("MMM D")}`;
  // time.textContent = "Nov 2 (15 hours ago)";

  //Cuerpo del Card
  const body_main = document.createElement("div");
  body_main.classList.add("body__main");

  /* body_title */
  const body_title = document.createElement("div");
  body_title.classList.add("body__title");
  const cards_secondary = document.createElement("h2");
  cards_secondary.classList.add("cards-secondary");
  const aCards_secondary = document.createElement("a");
  aCards_secondary.href = `./pages/post.html?id=${_id}`;
  aCards_secondary.textContent = title;

  const body_tag = document.createElement("div");
  body_tag.classList.add("body__tag");

  /* body_tag */
  tags.map((tags) => {
    const decorate_ancor = document.createElement("a")
    //decorate_ancor.classList.add("decorate-ancor");
    const body_tag_prefix = document.createElement("span")
    body_tag_prefix.classList.add("body__tag--prefix")
    body_tag_prefix.textContent = "#"
    const textTag = document.createElement("text")
    textTag.textContent = `${tags}`
    body_tag.append(decorate_ancor)
    decorate_ancor.append(body_tag_prefix, textTag)
  })

  //arrayTags
  /* body_bottom */
  const body_bottom = document.createElement("div");
  body_bottom.classList.add("body__bottom");

  const bottom_details = document.createElement("div");
  bottom_details.classList.add("bottom__details");

  const align_items = document.createElement("a")
  align_items.classList.add("align__items")

  const align_items_padding = document.createElement("div")
  align_items_padding.classList.add("align__items--padding")

  const svgReaction = document.createElement("svg")
  svgReaction.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  svgReaction.setAttribute("width", "24")
  svgReaction.setAttribute("height", "24")

  const path = document.createElement("img")
  path.src = "./img/svg/corazon.svg" //--------------------ODON: me da error esta linea no se porque...

  const textReaction = document.createElement("text")
  textReaction.textContent = `${reactions.likes}`

  const spanReaction = document.createElement("span")
  spanReaction.textContent = "Reactions"

  const bottom_save = document.createElement("div");
  bottom_save.classList.add("bottom__save");

  const small = document.createElement("small")
  small.textContent = `${numRandom(3, 20)} min read`

  const updateLink = document.createElement("a");
  updateLink.href = `./pages/create-post.html?id=${_id}`;
  const buttonUpdate = document.createElement("button")
  buttonUpdate.classList.add("button__save--update", "btn__update");
  buttonUpdate.setAttribute("type", "button")
  buttonUpdate.dataset.id = _id;

  const spanUpdate = document.createElement("span")
  spanUpdate.textContent = "Actualizar"

  const buttonDelete = document.createElement("button")
  buttonDelete.classList.add("button__save--delete", "btn__delete");
  buttonDelete.setAttribute("type", "button")
  buttonDelete.dataset.id = _id;
  buttonDelete.addEventListener("click", removePost);

  const spanDelete = document.createElement("span")
  spanDelete.textContent = "Eliminar"

  //append
  mainBody.appendChild(card)
  card.append(card_img, card_body)
  card_img.append(imgFirstCard)
  card_body.append(body_top, body_main)
  body_top.append(ps_relative, autor)
  ps_relative.appendChild(aImageAutor)
  aImageAutor.append(img_autor)
  // aImageAutor.append(img_autor, aImageCoautor)
  // aImageCoautor.appendChild(img_subAutor)
  autor.append(autor_name, aTime)
  autor_name.append(inSombra, spanLibre)
  inSombra.appendChild(sombra)
  spanLibre.append(forSpan, nameCoautor)
  aTime.appendChild(time)

  body_main.append(body_title, body_tag, body_bottom)
  body_title.appendChild(cards_secondary)
  cards_secondary.appendChild(aCards_secondary)

  body_bottom.append(bottom_details, bottom_save)
  bottom_details.append(align_items, align_items)
  align_items.append(align_items_padding)
  align_items_padding.append(svgReaction, textReaction, spanReaction)

  svgReaction.appendChild(path)

  updateLink.append(buttonUpdate);

  bottom_save.append(small, updateLink, buttonDelete)
  buttonUpdate.append(spanUpdate)
  buttonDelete.append(spanDelete)
}


function topFilter(clase, nameFilter) {
  const subfilter = document.querySelector(`.${clase}`);
  nameFilter === "ver" ? subfilter.classList.remove("hidden") : subfilter.classList.add("hidden");
}


