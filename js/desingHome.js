

document.querySelector(".cards-secondary").addEventListener("click", function (event) {
    let card = document.querySelector(".card")
    addClass(card, "bordCard")
});

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
