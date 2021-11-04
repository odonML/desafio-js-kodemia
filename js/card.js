const mainBody = document.querySelector(".main--body")

const card = document.createElement("article");
card.classList.add("card");

const card_body = document.createElement("div");
card_body.classList.add("card__body");

const body_top = document.createElement("div");
body_top.classList.add("body__top");

const ps_relative = document.createElement("div");
ps_relative.classList.add("ps-relative");

const aImageAutor = document.createElement("a");
const img_autor = document.createElement("img");
img_autor.classList.add("img__autor", "radius-10")
img_autor.src = "https://res.cloudinary.com/practicaldev/image/fetch/s--Qc_QGzy7--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/394/1fb4ce27-fef4-4628-b261-f4c3d9423bbe.png"

const aImageCoautor = document.createElement("a");
const img_subAutor = document.createElement("img");
img_subAutor.classList.add("img__autor", "sub-autor", "radius-50")
img_subAutor.src = "https://res.cloudinary.com/practicaldev/image/fetch/s--5CVl1gkL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/643010/08a70295-50e8-45cf-9d3a-e6c251e10f1b.png"

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
time.textContent = "Nov 2 (15 hours ago)";

//Cuerpo del Card
const body_main = document.createElement("div");
body_main.classList.add("body__main");

/* body_title */
const body_title = document.createElement("div");
body_title.classList.add("body__title");
const cards_secondary = document.createElement("h2");
cards_secondary.classList.add("cards-secondary");
const aCards_secondary = document.createElement("a");
aCards_secondary.textContent = "My first experience in Tailwind CSS 👩🏻‍💻";

/* body_tag */
const body_tag = document.createElement("div");
body_tag.classList.add("body__tag");
const decorate_ancor = document.createElement("a")
decorate_ancor.classList.add("decorate-ancor");

const body_tag_prefix = document.createElement("span")
body_tag_prefix.classList.add("body__tag--prefix")
body_tag_prefix.textContent = "#"

const textTag = document.createElement("text")
textTag.textContent = "showdev"

/* body_bottom */
const body_bottom = document.createElement("div");

//append
mainBody.appendChild(card)
card.appendChild(card_body)
card_body.append(body_top, body_main)
body_top.append(ps_relative, autor)
ps_relative.appendChild(aImageAutor)
aImageAutor.append(img_autor, aImageCoautor)
aImageCoautor.appendChild(img_subAutor)
autor.append(autor_name, aTime)
autor_name.append(inSombra, spanLibre)
inSombra.appendChild(sombra)
spanLibre.append(forSpan, nameCoautor)
aTime.appendChild(time)

body_main.append(body_title, body_tag, body_bottom)
body_title.appendChild(cards_secondary)
cards_secondary.appendChild(aCards_secondary)

body_tag.append(decorate_ancor)
decorate_ancor.append(body_tag_prefix, textTag)

