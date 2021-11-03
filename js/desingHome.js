

document.querySelector(".cards-secondary").addEventListener("mouseover", function (event) {
    let card = document.querySelector(".card")
    card.classList.add("bordCard");
});

document.querySelector(".cards-secondary").addEventListener("mouseout", function (event) {
    let card = document.querySelector(".card")
    card.classList.remove("bordCard");
});

