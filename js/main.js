let objeto = {
    titulo: "🔥Build a Stunning Portfolio website with React JS",
    tags: ["#react", "#tutorial"],
    content: `Hi there👋,

    I wanted to build a portfolio which is different and unique with design and little bit animations.
    Here is the Demo Link:`,
    img: "https://res.cloudinary.com/practicaldev/image/fetch/s--Pta6s_6y--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7pkfs5vyft03x5ohb1ww.png",
    date: "01-15-2020",
    reactions: {
        likes: 0,
        unicorn: 0,
        save: 0,
    },
};
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
post(objeto)