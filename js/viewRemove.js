//el boton tiene que tener una propiedad de tipo dataser.id que como valor tendra el id
function deleleUser(postId) {
    const xhr = new XMLHttpRequest();
    const URL = `https://desafio-js-kodemia-default-rtdb.firebaseio.com/${postId}/.json`;
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log(xhr.readyState);
      }
    });
    xhr.open("DELETE", URL, true);
    xhr.send();
  }