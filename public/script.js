
const error = document.querySelector(".error");
const theMessage = document.querySelector(".theMessage");

if (theMessage.textContent !== "") {
setTimeout(() => {
theMessage.textContent = "";
}, 3000);
}

if (error.textContent !== "") {

setTimeout(() => {
error.textContent = "";
}, 3000);
}